# Guia de manutenção e colaboração

Estado de referência: 16/11/2026. Este guia orienta integrantes da equipe e assistentes de IA a modificar a apresentação existente.

## Por onde começar

1. Leia [AGENTS.md](../AGENTS.md) e a [skill do curso](../.agents/skills/fundamentos-dados-ia/SKILL.md).
2. Consulte as referências da skill para a área afetada: metodologia, arquitetura ou dados/SQL.
3. Leia o [README](../README.md), o [roteiro](../ROTEIRO_DA_AULA.md) e o arquivo que será modificado. Confira `git status` antes de editar.
4. Faça uma mudança pequena, confira seu efeito e descreva o que foi alterado e testado.

O código atual e as fontes da raiz prevalecem sobre os planos históricos desta pasta. Não execute como pendência uma correção que já está implementada.

## Estado atual

- Apresentação em HTML, CSS e JavaScript, com 35 slides e roteiro de 180 minutos.
- O caso fictício da Loja Horizonte conecta problema, perguntas, indicadores, dados, ferramentas e validação.
- Há exploração por categoria, quatro verificações de aprendizagem, prompt copiável, laboratório SQL e comparação de escalas.
- O SQL roda localmente em um Worker com SQLite. A IA pode sugerir consultas; a execução e o gráfico são feitos pela aplicação.
- A base dos cálculos é o CSV da raiz: 475 registros, 909 unidades e receita após descontos de R$ 52.841,96.
- Não há backend, autenticação nem API de IA integrada. NotebookLM e Google Planilhas são usados manualmente pelos participantes.

## Onde alterar

| Área | Arquivo principal |
|---|---|
| Textos, exemplos, slides e falas | `js/slides.js` |
| Prompts e feedback das atividades | `js/activities.js` |
| Navegação, notas e tela cheia | `js/app.js` |
| Animação typewriter | `js/animations.js` |
| Exploração, indicadores e gráficos SVG | `js/visuals.js` |
| Editor, resultado, eixos e unidades SQL | `js/sql-lab.js` |
| Preparação da base, Worker e limites de execução | `js/sql-engine.js` |
| Aparência e responsividade | `css/theme.css` |
| Entrada e ordem dos scripts | `index.html` |
| Geração de dados, versões dos recursos e HTML único | `scripts/build.py` |
| Exportação de falas e prompts | `scripts/export-roteiro.cjs` |

`js/data.js` é gerado do CSV. O HTML único também é gerado e fica fora do Git. Não edite esses arquivos diretamente. Preserve a biblioteca e a licença em `vendor/`; ela é minificada pelo fornecedor.

## Executar e conferir

Para abrir a apresentação, basta Python e um navegador atual. Node.js é necessário para exportar o roteiro e os prompts. Para executar o teste de fumaça em `tests/smoke.cjs`, siga as instruções do README principal.

```powershell
python -m http.server 5500 --bind 127.0.0.1
```

Abra `http://localhost:5500`. Tailwind e Google Fonts usam internet. O mecanismo SQL fica na pasta `vendor/`.

Após modificar conteúdo, JavaScript, CSS ou dados derivados:

```powershell
python scripts/build.py
node scripts/export-roteiro.cjs
python scripts/build.py --check
git diff --check
```

Se também gerar o HTML único, use `python scripts/build.py --single-file` e confira com `python scripts/build.py --check --single-file`.

Os comandos de geração não substituem teste no navegador. Conforme a mudança, verifique navegação, foco e teclado do editor, quizzes, cópia do prompt, gráficos e layouts 1280×720, 1920×1080 e celular. Não deixe testes, capturas, dependências ou temporários na entrega; use a pasta temporária do sistema para verificações pontuais.

No laboratório, `SELECT COUNT(*) AS registros FROM vendas;` deve retornar 475. Confira também totais e agrupamentos contra o CSV. Os valores de referência e os cenários já exercitados estão no [relatório de validação](validacao-aula.md). Indique quais verificações você executou e quais ficaram pendentes.

## Cuidados nas modificações

- Preserve a identidade Retro-Tech & Matcha e a linguagem conversacional para iniciantes.
- Mantenha a pergunta antes da ferramenta e explique SQL antes do laboratório.
- Use os mesmos registros, filtros e indicadores na consulta, na tabela, no gráfico e na conclusão.
- Diferencie receita, lucro bruto simplificado, contagem, taxa e participação no total.
- Preserve CSV e XLSX originais. A prática usa os valores prontos do CSV; o XLSX tem uma diferença de R$ 0,07 por precisão das fórmulas.
- Não introduza dados reais, credenciais, serviços pagos ou backend sem pedido explícito.
- Não recrie módulos removidos nem uma suite de testes citada apenas em registros históricos.

## Pedido sugerido para uma IA

```text
Leia AGENTS.md, a skill do curso e docs/README.md. Inspecione o estado atual
e os arquivos relacionados antes de editar.

Mudança desejada: [descreva o comportamento ou conteúdo a alterar].

Preserve o caso da Loja Horizonte, o tema e os arquivos originais da base.
Faça a menor mudança que resolva o pedido, atualize os derivados necessários
e confira o resultado. Informe arquivos alterados, verificações executadas
e limitações. Não afirme ter testado navegador ou contas externas sem fazê-lo.
Commit e push somente quando fizerem parte do pedido.
```

Para colaboração em equipe, trabalhe em uma branch e abra um pull request com o motivo da mudança e as verificações realizadas. Se não tiver permissão de escrita, crie um fork e envie o pull request a partir dele. Confirme o remoto e a autoria dos commits antes de enviar; a configuração local de uma pessoa não acompanha o clone.

## Documentos desta pasta

- [Validação da aula](validacao-aula.md): referência atual dos números, cenários testados e limites.
- [Plano inicial da aula](plano-aula.md), [ferramentas](plano-ferramentas.md) e [investigação](plano-investigacao.md): registros históricos de decisões, com referências a estruturas que já mudaram.
