# Instruções do Codex — Fundamentos de Análise de Dados e Aplicações em IA

## Fonte de contexto
Ao atuar neste repositório, use a skill `.agents/skills/fundamentos-dados-ia/SKILL.md` e consulte suas referências antes de implementar mudanças que afetem conteúdo, didática, SQL, dados, layout ou interatividade. A skill detalha o estado atual e os critérios de aceitação.
O guia de colaboração dos integrantes fica em `docs/README.md`.

## Estado atual
- Apresentação de 35 slides, com fundamentos, caso Loja Horizonte, verificações de aprendizagem, prática e explicação de SQL antes do laboratório.
- SQLite local em `js/sql-engine.js`, isolado em Web Worker. O WASM está incorporado em `vendor/sql.js/sql-wasm-inline.js`; não há carregamento de SQLite por CDN nem arquivo `.wasm` separado.
- Preparação limitada a 15 segundos e consultas a 8 segundos, com cancelamento e nova tentativa. A interface fica em `js/sql-lab.js`.
- Repositório compartilhado: `jrguedes7/fundamentos-analise-dados-ia`, branch principal `main`. Confira remoto e identidade Git antes de publicar alterações; não reutilize a conta do trabalho.

## Limites
- Preservar a identidade Retro-Tech & Matcha, o conteúdo já existente e o tom acessível.
- Não introduzir backend, banco remoto, APIs de IA pagas, chaves ou autenticação sem pedido explícito.
- Internet estará disponível na aula; funcionamento offline não é prioridade. A robustez do carregamento do WASM continua obrigatória.
- O CSV da raiz é a referência numérica: 475 registros, 909 unidades e receita após descontos de R$ 52.841,96. O XLSX original é apoio e tem precisão diferente. Preserve ambos; não inventar dados nem usar dados reais de clientes/empregador.
- A apresentação executa SQL de forma determinística; não afirmar que a IA realizou consultas ou cálculos que foram executados pelo SQLite.
- Implementar mudanças pequenas, verificáveis e com descrição dos arquivos alterados.
- Editar os módulos de origem; regenerar `js/data.js`, versões do `index.html`, roteiro/prompts e HTML único conforme os arquivos afetados. Não editar derivados manualmente. Os comandos estão em `references/PLANO_DE_TRABALHO.md` da skill.

## Verificação
- Executar `python scripts/build.py --check`; quando houver HTML único regenerado, acrescentar `--single-file`.
- Mudanças em SQL, dados ou gráficos exigem consultas em navegador real via `http://localhost`, comparadas com cálculos independentes do CSV.
- Mudanças em interações/layout exigem navegação, typewriter, editor SQL (foco e teclado), gráficos, títulos e 16:9 em 1280×720 e 1920×1080; conferir celular quando afetado.
- O teste de fumaça Playwright fica em `tests/smoke.cjs`. Consulte o README para executar. Use `node scripts/export-roteiro.cjs --check` para conferir roteiro e prompts.
- Sempre indicar o que foi testado de fato e o que está pendente.
