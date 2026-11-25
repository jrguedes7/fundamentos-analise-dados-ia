---
name: fundamentos-dados-ia
description: "Desenvolver, corrigir e ampliar a apresentação web interativa do curso Fundamentos de Análise de Dados e Aplicações em IA, usando estética Retro-Tech & Matcha, didática para iniciantes, planilha fictícia, gráficos e laboratório SQL SELECT."
---

# Skill: Fundamentos de Análise de Dados e Aplicações em IA

## Quando aplicar
Use esta skill para qualquer solicitação envolvendo o curso: revisão de roteiro, criação de slides, interações didáticas, gráficos, tratamento da planilha, SQL/SQLite WASM, layout, refatorações, testes e preparação para apresentação.

## Orientação principal
Este é **um curso introdutório para universitários sem pré-requisitos de programação**, não um treinamento avançado de IA ou de bancos de dados. A competência prioritária é **formular boas perguntas e validar respostas baseadas em dados**. A tecnologia serve à pergunta, e não o contrário.

Leia as referências conforme a tarefa:
- `references/PROJETO_E_METODOLOGIA.md`: público, duração, pedagogia, objetivos, temas e organização dos apresentadores.
- `references/DESIGN_E_ARQUITETURA.md`: paleta, acessibilidade, motion, arquivos, arquitetura atual e diretrizes de expansão.
- `references/DADOS_E_SQL.md`: base canônica, campos, modelagem SQLite e desafios `SELECT`.
- `references/PLANO_DE_TRABALHO.md`: fluxo de manutenção, comandos existentes, verificações e entrega.

## Estado atual (não confundir com funcionalidades planejadas)
- O projeto possui **35 slides**, com caso da Loja Horizonte, conceitos, verificações de aprendizagem, prática guiada, introdução progressiva de SQL antes do editor e conclusão conferível.
- HTML/CSS/JS puro em `index.html`, `css/theme.css` e `js/*.js`. Não há backend, API de IA, autenticação ou instalação Node necessária para apresentar.
- `js/sql-engine.js` executa SQLite em memória dentro de Web Worker, usando o WASM incorporado na biblioteca local de `vendor/sql.js/`. A preparação tem limite de 15 segundos e cada consulta, 8 segundos. Falhas permitem nova tentativa; editar a consulta cancela execução pendente e invalida resultados antigos.
- O CSV da raiz alimenta `js/data.js` pelo build. O XLSX original é apoio preservado e tem diferença de centavos por precisão das fórmulas. Não há pasta `data/` no estado atual.
- `scripts/build.py` atualiza dados e versões dos recursos, e pode gerar HTML único. `scripts/export-roteiro.cjs` exporta falas e prompts dos módulos.
- O teste de fumaça do navegador está em `tests/smoke.cjs`. A auditoria anterior mais ampla usou arquivos temporários.

## Processo obrigatório em cada alteração
1. Inspecione o projeto existente e confirme o estado de `git status`, arquivos, dependências e dados. Não recomece a implementação do zero.
2. Resuma brevemente o comportamento atual e indique os arquivos que pretende alterar.
3. Faça a menor mudança que atenda ao pedido e preserve o que funciona. Não transforme melhorias opcionais em pendências obrigatórias.
4. Preserve a semântica dos exemplos, os arquivos CSV/XLSX e os slides originais. Distingua alteração de conteúdo aprovado de sugestão nova.
5. Regenere os derivados afetados e execute os checks disponíveis na referência de trabalho. Mudanças de interação, SQL ou layout exigem navegador real; para dados e SQL, compare com cálculos independentes do CSV.
6. Entregue resumo de alterações, testes efetivos, limitações e instruções de execução. Não declare erros corrigidos sem teste.

## Regras pedagógicas
- Explicar conceitos em linguagem simples, com pergunta para a turma, exemplo e aplicação.
- Progressão: **caso/problema → fundamentos → pergunta analítica → indicador → base → ferramentas/representação → validação → conclusão e próxima pergunta**.
- Os quatro tipos de análise: descritiva, diagnóstica, preditiva e prescritiva. Ensinar que hipótese não é causa provada; projeção simples não é previsão robusta; recomendação depende de objetivos e restrições.
- Manter distinção explícita entre ferramentas: IA pode ajudar a formular consultas, mas SQLite executa `SELECT` e o navegador desenha o gráfico; não alegar que a IA executou algo sem ter executado.
- Antes do slide SQL interativo: abordar o que é SQL, o que é uma tabela, papel de `SELECT`, `FROM`, `WHERE`, `GROUP BY`, `SUM` e `ORDER BY` em exemplos simples. Mostrar de maneira crescente, sem transformar a oficina em curso de bancos de dados.
- Pergunta em linguagem natural → tradução para SQL (com ou sem apoio de IA) → execução real → tabela → gráfico → verificação.
- Encerramento do aluno: formular pergunta, escolher indicador, produzir gráfico, explicar conclusão e validar um valor.

## Regras técnicas
- Preferir HTML/CSS/JS já existentes; TypeScript, ferramentas de build ou framework só se houver benefício explícito e baixo custo de manutenção.
- Preservar o tema Retro-Tech & Matcha e a navegação por teclado; não trocar por apresentação em vídeo ou PowerPoint.
- A aplicação usa internet no local do curso; não investir em modo offline sem solicitação. Ainda assim, o SQL deve carregar e funcionar com estabilidade.
- Executar SQL localmente no navegador, sem SGBD remoto e sem transmitir registros fictícios a serviços externos.
- Usar `base_vendas_analise_com_ia.csv` como referência numérica e preservar o `.xlsx` original de apoio. Não editar `js/data.js` manualmente nem substituir as fontes para ajustar exemplos.
- As consultas fornecidas devem ser compatíveis com **SQLite** e com o esquema real; documentar diferenças de PostgreSQL/SQL padrão quando necessário.
- Não construir gráficos sobre dados inventados. Não assumir lucro líquido a partir do campo de lucro bruto simplificado.
- Novas telas interativas devem ter estado de carregamento, estado vazio, erro legível e uma saída verificável.
- Manter os dados locais fictícios e o código seguro: sem segredos, credenciais, eval ou execução de SQL que altere dados.

## Laboratório SQL: manutenção
O laboratório usa a distribuição local com WASM incorporado; a falha antiga de fetch não é uma pendência atual. Se houver nova falha, investigue a implementação atual; não restaure o loader antigo de CDN.

- Preserve a separação entre interface (`js/sql-lab.js`) e engine (`js/sql-engine.js`). Não mova `db.exec()` para o thread dos controles.
- Preserve uma consulta iniciada por `SELECT`, `PRAGMA query_only`, cancelamento, timeouts e retry. Resultado de execução antiga não pode sobrescrever consulta nova.
- Por HTTP, o Worker importa a biblioteca local por URL absoluta. Na abertura direta de `index.html`, `sql-wasm-source.js` entrega o código como texto. O HTML único já incorpora o texto. Nos três modos, a biblioteca executa dentro do Worker.
- Valide `COUNT(*) = 475`, agregado mensal, erro de sintaxe, retorno vazio e recuperação. Para alterações de carregamento/execução, valide também timeout sem travar navegação e nova tentativa.

## Critérios mínimos para considerar a tarefa concluída
- O usuário consegue abrir a apresentação no navegador e navegar por todos os slides.
- A sequência conceitual é ensinada antes do laboratório SQL.
- As consultas `SELECT` de exemplo retornam resultados numéricos compatíveis com o CSV.
- Gráficos possuem rótulos, unidade, origem e não confundem receita com lucro.
- A interação funciona no projetor em 16:9 e não captura as setas quando a pessoa está digitando no editor SQL.
- Erros de conexão e consultas inválidas geram mensagens que orientam o aluno, sem travar a apresentação.

## Arquivos prioritários
- `index.html`: HTML principal e dependências.
- `css/theme.css`: tokens visuais, proporção 16:9, responsividade.
- `js/slides.js`: textos e conteúdos dos slides.
- `js/app.js`: navegação, contador e fullscreen.
- `js/animations.js`: máquina de escrever.
- `js/visuals.js`: indicadores e gráficos SVG.
- `js/sql-engine.js`: Worker, base SQLite, cancelamento, timeouts e recursos.
- `js/sql-lab.js`: editor, exemplos, validação, tabela/gráfico e estados da interface.
- `js/activities.js`: prompts, cópia e feedback das verificações de aprendizagem.
- `js/data.js`: cópia convertida e incorporada da base.
- `base_vendas_analise_com_ia.csv` / `.xlsx`: fontes na raiz.
- `scripts/build.py` e `scripts/export-roteiro.cjs`: geração dos derivados.
- `apresentacao_arquivo_unico.html`: exportação local opcional, ignorada pelo Git; regenerar antes de compartilhar.

## Comportamentos a evitar
- Não inventar recursos de IA ao vivo onde não há integração real.
- Não usar `SELECT *` como demonstração final de análise sem justificar o uso.
- Não adicionar cinco ferramentas no curso de três horas.
- Não modificar dados para forçar gráficos interessantes.
- Não incluir novas fases gigantes sem caber nas três horas.
