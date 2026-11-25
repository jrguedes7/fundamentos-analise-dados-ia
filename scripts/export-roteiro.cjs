/* Exporta as mesmas falas que aparecem no botão Roteiro. Sem dependências. */
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const check = process.argv.includes('--check');
const context = { window: {} };
vm.createContext(context);
for (const filename of ['js/data.js', 'js/activities.js', 'js/slides.js'])
  vm.runInContext(fs.readFileSync(path.join(root, filename), 'utf8'), context);
const w = context.window;
const plain = (html) =>
  html
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
let doc = `# Roteiro da aula — Fundamentos de Análise de Dados e Aplicações em IA

Oficina completa de 180 minutos para cada turma. Público: universitários iniciantes. Quatro apresentadores e quatro auxiliares. Falas sugeridas, para adaptar à participação da turma; não precisam ser lidas integralmente. O PDF e o HTML fornecidos orientaram a ampliação da narrativa.

As mesmas falas estão na apresentação, em **Roteiro (N)**. As notas aparecem na própria tela projetada: feche-as antes de voltar à conversa com a turma. Não há segunda tela privada.

## Distribuição sugerida dos 180 minutos

| Bloco | Slides | Tempo |
|---|---|---|
| Abertura do caso, dados e informação | 1–5 | 15 min |
| Modelos, verificação e analogia | 6–8 | 20 min |
| Problema, perguntas, indicadores e verificação | 9–12 | 20 min |
| Base e exploração | 13–14 | 15 min |
| Ferramentas e prática guiada NotebookLM → Sheets | 15–19 | 30 min |
| SQL progressivo, verificação e laboratório | 20–29 | 30 min |
| Leitura crítica de gráficos e critérios | 30–32 | 10 min |
| Investigação autônoma em duplas | 33 | 30 min |
| Defesa da conclusão e próxima investigação | 34–35 | 10 min |
| **Total** | | **180 min** |

O tempo é flexível dentro dos blocos. Para turma grande, selecione algumas duplas para fala e recolha as demais conclusões por escrito. Se o acesso à IA não estiver disponível, use a resposta simulada do guia do aluno e confira a conclusão com a planilha ou o laboratório local. Não existe API de IA integrada ao site. GUIA_DA_ATIVIDADE.md é o material do aluno; PROMPTS_DA_ATIVIDADE.txt contém o texto para copiar.

## Como conduzir

Espere as respostas das provocações antes de explicar. Peça que a turma justifique o indicador e preveja o formato da saída antes de executar. Corrija uma etapa de cada vez. Não trate hipóteses como causas comprovadas, projeções como certezas ou lucro bruto como lucro líquido.

Use prática com apoio progressivamente menor: primeiro mostre e explique seu raciocínio; em seguida, façam a mesma pergunta juntos; por fim, as duplas adaptam para outra pergunta e defendem a conclusão. Isso combina uma situação-problema com demonstração, prática guiada e prática autônoma, em vez de deixar iniciantes descobrirem todos os cliques sozinhos.

Na prática guiada de ferramentas, distribua aproximadamente 5 minutos para abrir e importar, 5 para o prompt, 12 para tabela e gráfico e 8 para conferência e conversa. Prepare o acesso e os arquivos antes da aula. Uma pessoa opera e a outra confere; depois trocam.

Os quatro tipos são um mapa de perguntas, não uma sequência obrigatória de quatro análises. A turma começa descrevendo a receita, investiga a contribuição de categorias/canais, reconhece a incerteza de previsões e identifica os dados/restrições que faltam para recomendar uma ação. Volte a esse mapa na discussão do resultado.

Abra com o problema da Loja Horizonte antes dos fundamentos. Anote as perguntas iniciais e retome-as no encerramento. Cada conceito responde a uma necessidade da investigação: reconhecer registros, definir medida, executar uma consulta ou avaliar uma conclusão.

Nas quatro verificações, dê 30 segundos para reflexão individual e um minuto para discussão em dupla; só depois escolha uma alternativa e leia o feedback. Essas pausas cabem nos blocos da tabela, substituindo parte da exposição. Se houver dificuldade, retome o exemplo antes de avançar. As escolhas ficam locais na página; não há cadastro, nota automática ou envio de respostas.

Na comparação de escalas, os dois gráficos usam os mesmos totais reais do CSV fictício: maio R$7.686,24 e junho R$7.022,65. Um eixo começa em zero; o outro, em R$6.800. A diferença não demonstra perda de clientes nem causa. A turma deve observar os eixos e conferir o cálculo.

## Critérios para a entrega

| Critério | Evidência esperada |
|---|---|
| Pergunta | Medida, período, grupo e comparação definidos, com resposta possível na base. |
| Indicador | Campo, filtro e cálculo corretos; ao menos um valor conferido. |
| Visualização | Gráfico coerente com a pergunta, unidade, período e escala legíveis. |
| Interpretação | Achado sustentado por número, limitação e próxima investigação. |

Use os critérios para orientar revisões durante a atividade. O objetivo é investigar um problema, produzir evidências e avaliar a confiança da resposta.

Na analogia da geladeira, SELECT escolhe as colunas do resultado, FROM identifica a origem e WHERE restringe os registros. É uma explicação conceitual; a tabela geladeira não existe no laboratório.

`;
w.DECK_SLIDES.forEach((slide, i) => {
  const heading = plain(slide.match(/<h[12][^>]*>([\s\S]*?)<\/h[12]>/)?.[1] || 'Laboratório');
  doc += `## ${i + 1}. ${heading}\n\n${w.LESSON_NOTES[i]}\n\n`;
  const codes = [...slide.matchAll(/<pre[^>]*><code>([\s\S]*?)<\/code><\/pre>/g)];
  for (const code of codes)
    doc +=
      '```sql\n' +
      code[1]
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&amp;/g, '&') +
      '\n```\n\n';
});
doc += `## Referências técnicas

- SQLite, SELECT e suas cláusulas: https://www.sqlite.org/lang_select.html
- sql.js, distribuição com WASM incorporado: https://sql.js.org/documentation/
- Fonte dos números: base_vendas_analise_com_ia.csv, na raiz. Valores fictícios.
- Fontes aceitas no NotebookLM, verificadas em 15/11/2026: https://support.google.com/gemininotebook/answer/16215270?hl=pt-BR
- Planos gratuitos: https://support.google.com/gemininotebook/answer/16213268?hl=pt-BR
- Prática guiada e autonomia gradual: https://education.nsw.gov.au/teaching-and-learning/curriculum/explicit-teaching/explicit-teaching-strategies/gradual-release-of-responsibility.html

Regenerar este documento: node scripts/export-roteiro.cjs.
`;
const prompts =
  'PROMPT 1 — EXPLORAR A BASE E PLANEJAR A ANÁLISE\n\n' +
    w.CourseActivities.prompts.analise +
    '\n\nPROMPT 2 — EXPRESSAR A MESMA PERGUNTA EM SQL\n\n' +
    w.CourseActivities.prompts.sql +
    '\n';
const outputs = { 'ROTEIRO_DA_AULA.md': doc, 'PROMPTS_DA_ATIVIDADE.txt': prompts };
for (const [name, contents] of Object.entries(outputs)) {
  const filename = path.join(root, name);
  if (!check) {
    fs.writeFileSync(filename, contents);
  } else if (!fs.existsSync(filename) || fs.readFileSync(filename, 'utf8').replace(/\r\n/g, '\n') !== contents) {
    console.error(`Desatualizado: ${name}. Execute node scripts/export-roteiro.cjs.`);
    process.exitCode = 1;
  } else {
    console.log(`OK ${name}`);
  }
}
if (!check) console.log(`Roteiro exportado: ${w.DECK_SLIDES.length} slides e ${w.LESSON_NOTES.length} falas.`);
