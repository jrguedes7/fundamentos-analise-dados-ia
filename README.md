# Fundamentos de Análise de Dados e Aplicações em IA

Apresentação web de 35 slides para uma oficina de três horas, ministrada por alunos do 8º semestre de Engenharia de Computação — Noturno. O caso fictício da Loja Horizonte conduz fundamentos, perguntas, indicadores, ferramentas, SQL, gráficos e validação.

## Executar

Na pasta do projeto:

```powershell
python -m http.server 5500 --bind 127.0.0.1
```

Abra http://localhost:5500. Para abrir a apresentação com duplo clique, use o `index.html` na pasta completa do projeto. O SQLite funciona nos dois modos e é distribuído com WASM incorporado em `vendor/sql.js/`. Tailwind e Google Fonts usam a internet.

Setas, PageUp/PageDown e Home/End navegam; F alterna tela cheia. **Roteiro (N)** abre as falas sugeridas na mesma tela. No editor SQL, as setas continuam editando e Ctrl+Enter executa.

## Organização

```text
index.html                  Entrada da apresentação
css/theme.css               Identidade Retro-Tech & Matcha e responsividade
js/slides.js                Conteúdo, notas e montagem dos 35 slides
js/activities.js            Prompts, cópia e feedback das verificações
js/app.js                   Navegação, roteiro e tela cheia
js/animations.js            Typewriter e redução de movimento
js/visuals.js               Indicadores e gráficos
js/sql-engine.js            SQLite em Worker, preparação e tempo máximo
js/sql-lab.js               SQLite e resultados de SELECT
js/data.js                  Dados derivados do CSV
scripts/build.py            Atualização de dados e versões dos recursos
scripts/export-roteiro.cjs   Exportação das falas e prompts
vendor/sql.js/              Mecanismo SQL e licença MIT
```

As instruções para ferramentas de IA ficam em [AGENTS.md](AGENTS.md) e [.agents/](.agents/skills/fundamentos-dados-ia/SKILL.md). Para colaborar, comece pelo [guia de manutenção](docs/README.md), que distingue o estado atual dos planos históricos. A pasta não possui dependências Node para executar a apresentação.

O código editável segue a configuração de formatação em `.prettierrc.json`. `.prettierignore` preserva a biblioteca em `vendor/`, os dados gerados e o HTML exportado. O arquivo `vendor/sql.js/sql-wasm-inline.js` é uma distribuição minificada do fornecedor; para manutenção da aplicação, edite os arquivos próprios em `js/`. O HTML dos slides usa blocos multilinha para facilitar a leitura.

## Material da aula

Envie aos alunos a base CSV e, conforme a atividade, `GUIA_DA_ATIVIDADE.md` e `PROMPTS_DA_ATIVIDADE.txt`. O XLSX é material de apoio. A apresentação não tem links de download. `ROTEIRO_DA_AULA.md` contém as falas, o tempo dos blocos e os critérios de avaliação.

O CSV da raiz é a referência dos exemplos e cálculos: 475 registros, 16 colunas, 909 unidades e receita após descontos de **R$ 52.841,96**, de maio a outubro de 2026. Ele usa UTF-8 com BOM, separador `;` e ponto decimal. O guia explica a importação no Google Planilhas.

O XLSX original contém fórmulas com maior precisão e soma **R$ 52.841,89** de receita. Os dois arquivos originais foram preservados; use o CSV para comparar os resultados entre ferramentas. `receita` no SQLite corresponde à receita após descontos e `lucro_bruto` ao lucro bruto simplificado, não ao lucro líquido.

Os cálculos somam os valores monetários já registrados por linha no CSV. Recalcular descontos com outra regra de arredondamento pode mudar centavos e não reproduz necessariamente essa fonte.

SQLite executa as consultas no navegador e é carregado ao abrir o laboratório ou executar uma consulta em um exercício. Os slides de contagem e de comparação de escalas têm editor próprio, com dica, tabela e conferência do resultado. O gráfico SQL permite escolher categoria, indicador e unidade; tabela e gráfico mostram as mesmas primeiras 20 linhas, com aviso quando houver mais. A exploração resume toda a seleção e mostra uma amostra dos registros. Não há backend, autenticação ou API de IA integrada.

O mecanismo SQL roda em um Worker, separado dos controles da apresentação. Consultas que ultrapassam oito segundos são interrompidas; a próxima execução prepara a base novamente. O carregamento tem limite de 15 segundos e permite nova tentativa após falha. Editar a consulta invalida o resultado anterior e cancela uma execução pendente.

Na exibição SQL, **Número** e **Reais** mudam a formatação dos mesmos valores, incluindo o eixo e a tabela; a altura relativa das barras permanece igual. Contagens reconhecidas, como pedidos e unidades, não aceitam formato monetário. **Participação no total (%)** divide cada valor pela soma de todas as linhas retornadas pela consulta, antes do limite visual de 20, e acrescenta uma coluna à tabela sem substituir os resultados originais. **Taxa em fração (%)** formata uma taxa já calculada no SELECT (0,25 → 25%). Participação não é calculada quando há valores negativos ou total zero.

O eixo de categorias aceita texto ou números, sem repetir a coluna escolhida como indicador. Dois totais numa única linha ficam na tabela até que uma categoria seja escolhida. Números gerais preservam até seis casas na tabela e nos tooltips; os eixos usam rótulos mais curtos. Frações pequenas usam notação científica para evitar exibir zero indevidamente. Moeda mantém duas casas. A unidade inicial é sugerida pelo nome da coluna; confira se o alias descreve corretamente o indicador.

## Atualizar e exportar

Após alterar o CSV ou o código:

```powershell
python scripts/build.py
node scripts/export-roteiro.cjs
python scripts/build.py --check
node scripts/export-roteiro.cjs --check
```

O build gera `js/data.js` a partir do CSV, versiona os recursos locais e gera `vendor/sql.js/sql-wasm-source.js` para a abertura com duplo clique. Faça alterações nos arquivos de origem. As amostras e a comparação de escalas são calculadas da mesma base ao montar os slides.

Para exportar uma cópia opcional em HTML único:

```powershell
python scripts/build.py --single-file
```

O arquivo `apresentacao_arquivo_unico.html` é gerado localmente e ignorado pelo Git. Ele incorpora código, estilos e SQLite; as fontes e o Tailwind continuam externos.

## Teste de fumaça

Com Node.js disponível, instale o Playwright apenas para testar:

```powershell
npm install --no-save --package-lock=false playwright
npx playwright install chromium
node tests/smoke.cjs
```

O teste inicia um servidor local e verifica os 35 slides, o roteiro, o teclado e consultas SQL de referência. Também abre o `index.html` diretamente como arquivo para testar o SQL no exercício e no laboratório. Para usar o Edge instalado, defina `$env:PLAYWRIGHT_CHANNEL = 'msedge'` antes de rodar o teste. Para a verificação presencial, use o [checklist de ensaio](docs/ensaio-aula.md).

## Verificação da versão

Na revisão, foram verificados no Edge via localhost: navegação dos 35 slides, layouts 1280×720, 1920×1080 e celular, typewriter, foco no editor, cópia do prompt, quizzes, gráficos, estados de erro e recuperação do SQLite. COUNT(*) retornou 475 e os agregados coincidiram com o CSV. Foram exercitados categorias numéricas, taxas, frações pequenas, edição e execução concorrente, timeout sem interromper a navegação e recuperação após falha no carregamento. A exportação HTML também foi executada por HTTP e como arquivo local. Os testes e capturas dessa auditoria ficaram na pasta temporária do sistema, fora da entrega.

O ensaio no projetor e a prática nas contas Google da turma continuam necessários. Os passos e as referências das ferramentas estão no guia do aluno.
