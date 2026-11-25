# Manutenção e verificação do projeto

## Ponto de partida
A apresentação atual tem 35 slides, explicação de SQL antes do laboratório, gráficos e verificações de aprendizagem. SQLite usa vendor local com WASM incorporado, executado em Worker com cancelamento, retry e limites de 15 segundos para preparação e 8 segundos por consulta. Esses recursos já existem; não tratá-los como backlog a implementar novamente.

O repositório compartilhado é `https://github.com/jrguedes7/fundamentos-analise-dados-ia`, com branch principal `main`. Antes de publicar, conferir remoto, branch, diff e identidade Git. Preservar as contribuições dos demais integrantes e não incluir credenciais, dados de empregador, caches ou dependências instaladas.

## Fluxo de uma alteração
1. Ler `AGENTS.md`, a skill e as referências relevantes; inspecionar `git status` e o módulo responsável pelo comportamento solicitado.
2. Delimitar os arquivos e fazer uma mudança pequena. Preservar didática, fontes fictícias e identidade visual.
3. Regenerar os derivados afetados e verificar o resultado. Não editar `js/data.js`, roteiro/prompts exportados ou HTML único manualmente.
4. Revisar o diff e relatar o que mudou, o que foi testado de fato e o que continua sem verificação.

## Comandos existentes
Para atualizar dados e versões dos recursos locais:

```powershell
python scripts/build.py
python scripts/build.py --check
```

O build usa o CSV da raiz, exige 475 IDs distintos e gera `js/data.js`. O check compara os derivados; não substitui validação dos indicadores no navegador.

Depois de alterar slides, falas ou prompts em `js/slides.js`/`js/activities.js`, atualizar os materiais:

```powershell
node scripts/export-roteiro.cjs
node scripts/export-roteiro.cjs --check
```

Para exportar e conferir o HTML único opcional:

```powershell
python scripts/build.py --single-file
python scripts/build.py --check --single-file
```

`apresentacao_arquivo_unico.html` é ignorado pelo Git. O check com `--single-file` só faz sentido depois de gerar essa exportação. Ele incorpora estilos, módulos e vendor SQL; Tailwind e fontes continuam externos.

Para apresentar e verificar interações:

```powershell
python -m http.server 5500 --bind 127.0.0.1
```

Abrir `http://localhost:5500`. Para um módulo JS alterado, `node --check js/nome-do-arquivo.js` verifica sintaxe. Node é usado pelos scripts de apoio; não é necessário para executar a apresentação no navegador.

## Verificação proporcional à mudança
- **Conteúdo/falas/prompts:** conferir a sequência, correspondência entre slides e notas, títulos, tempo de três horas e materiais exportados.
- **Dados/SQL/gráficos:** comparar cálculos independentes do CSV com SQLite; valores de referência e casos de borda estão em `DADOS_E_SQL.md`.
- **Interações/layout:** testar em navegador real navegação, typewriter/reduced motion, quizzes, cópia, foco/teclado do editor e seletores, gráficos e roteiro. Conferir 1280×720, 1920×1080 e celular quando afetado.
- **Engine/carregamento:** testar falha/retry, cancelamento de resultado antigo, timeout sem bloquear navegação e nova preparação. Preservar execução fora do thread principal.
- **Exportação:** se for compartilhada, testar a cópia regenerada; não supor que um teste do modular valida automaticamente o HTML único.

## Evidência disponível e limites
O teste de fumaça está em `tests/smoke.cjs`. Siga o README para instalar o Playwright e executar.

A revisão anterior exercitou Edge real, dados/SQL, gráficos, navegação, responsividade, falhas/recuperação, concorrência e HTML único por HTTP e `file://`. Isso é evidência daquela versão; depois de uma mudança, executar os checks pertinentes novamente. O ensaio no projetor e o uso das contas Google da turma exigem verificação no ambiente da aula.

Novas integrações, frameworks, backend, autenticação ou APIs pagas dependem de pedido explícito; não fazem parte da manutenção cotidiana.
