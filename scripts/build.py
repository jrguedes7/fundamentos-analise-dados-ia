"""Regenera dados derivados e HTML único a partir das fontes locais."""
import argparse
import hashlib
import csv
import json
from decimal import Decimal
from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]
MAPPING = {
    'id_pedido': 'ID_pedido', 'data': 'Data', 'mes': 'Mês', 'canal': 'Canal',
    'regiao': 'Região', 'categoria': 'Categoria', 'produto': 'Produto',
    'quantidade': 'Quantidade', 'preco_unitario': 'Preço_unitário_R$',
    'receita': 'Receita_após_desconto_R$', 'faturamento_bruto': 'Faturamento_bruto_R$',
    'custo_produtos': 'Custo_produtos_R$', 'lucro_bruto': 'Lucro_bruto_simplificado_R$',
}


def derived_data():
    with (ROOT / 'base_vendas_analise_com_ia.csv').open(encoding='utf-8-sig', newline='') as source:
        rows = list(csv.DictReader(source, delimiter=';'))
    if len(rows) != 475 or len({row['ID_pedido'] for row in rows}) != 475:
        raise ValueError('A base esperada deve conter 475 registros e IDs distintos.')
    records = []
    for row in rows:
        record = {}
        for key, column in MAPPING.items():
            value = row[column]
            record[key] = int(value) if key == 'quantidade' else float(Decimal(value.replace(',', '.'))) if key in list(MAPPING)[8:] else value
        records.append(record)
    revenue = sum(Decimal(row['Receita_após_desconto_R$'].replace(',', '.')) for row in rows)
    print(f'CSV: {len(rows)} registros; receita após descontos: R$ {revenue}.')
    return '/* Gerado por python scripts/build.py a partir do CSV da raiz. */\nwindow.SALES_DATA = ' + json.dumps(records, ensure_ascii=False, separators=(',', ':')) + ';\n'


def versioned_index(data):
    html = (ROOT / 'index.html').read_text(encoding='utf-8')
    def version(match):
        filename = match.group(2)
        content = data.encode('utf-8') if filename == 'js/data.js' else (ROOT / filename).read_text(encoding='utf-8').encode('utf-8')
        digest = hashlib.sha256(content).hexdigest()[:12]
        return f'{match.group(1)}{filename}?v={digest}"'
    return re.sub(r'((?:src|href)=")((?:js/[^"?]+\.js|css/theme\.css))(?:\?v=[^" ]*)?"', version, html)


def single_file(data, html, vendor):
    scripts = []
    def inline_script(match):
        filename = match.group(1)
        source = data if filename == 'js/data.js' else (ROOT / filename).read_text(encoding='utf-8')
        scripts.append('<script>\n' + source.replace('</script', '<\\/script') + '\n</script>')
        return ''
    html = re.sub(r'<script defer src="(js/[^"?]+)(?:\?v=[^"]*)?"></script>', inline_script, html)
    css = (ROOT / 'css/theme.css').read_text(encoding='utf-8')
    html = re.sub(r'<link rel="stylesheet" href="css/theme.css(?:\?v=[^"]*)?">', lambda _: '<style>\n' + css + '\n</style>', html)
    # Scripts inline não respeitam defer: executar só depois do HTML da apresentação.
    bundled = '<script type="text/plain" id="sql-vendor-source">\n' + vendor.replace('</script', '<\\/script') + '\n</script>\n' + '\n'.join(scripts)
    html = html.replace('</body>', bundled + '\n</body>')
    return html


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--check', action='store_true')
    parser.add_argument('--single-file', action='store_true', help='Também exporta a apresentação em um único HTML.')
    args = parser.parse_args()
    data = derived_data()
    index = versioned_index(data)
    vendor = (ROOT / 'vendor/sql.js/sql-wasm-inline.js').read_text(encoding='utf-8')
    local_source = (
        '/* Gerado por scripts/build.py a partir de sql-wasm-inline.js. */\n'
        'document.currentScript.courseSqlSource = ' + json.dumps(vendor) + ';\n'
    )
    outputs = {
        'js/data.js': data,
        'index.html': index,
        'vendor/sql.js/sql-wasm-source.js': local_source,
    }
    if args.single_file:
        outputs['apresentacao_arquivo_unico.html'] = single_file(data, index, vendor)
    for filename, content in outputs.items():
        path = ROOT / filename
        if args.check:
            if not path.is_file() or path.read_text(encoding='utf-8') != content:
                raise SystemExit(f'Desatualizado: {filename}. Execute python scripts/build.py.')
            print('OK', filename)
        else:
            path.write_text(content, encoding='utf-8', newline='\n')
            print('Gerado', filename)


if __name__ == '__main__':
    main()
