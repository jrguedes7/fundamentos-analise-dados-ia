# Da pergunta à resposta conferida

Material do participante — Fundamentos de Análise de Dados e Aplicações em IA.

Vamos investigar a Loja Horizonte, uma loja fictícia. A mesma pergunta passará pela IA, pela planilha e, depois, pelo SQL. O objetivo é conseguir explicar como você chegou à conclusão e como conferiu um valor.

A gerência percebeu mudanças nas vendas de maio a outubro de 2026. Nosso trabalho é descobrir o que os registros sustentam e **o que vale investigar primeiro**. Os conceitos e as ferramentas são apoios para resolver esse caso, que será retomado no encerramento.

## 1. Antes de abrir a IA

Escreva três perguntas. Escolha uma e responda:

- O que quero descobrir e para qual decisão?
- Qual medida, período e comparação preciso usar?
- Quais colunas têm essa informação? O que falta na base?

Na primeira rodada, faremos juntos: **qual foi a receita após descontos por mês, de maio a outubro de 2026?** Depois sua dupla vai adaptar esse caminho para outra pergunta. Alterne quem opera o computador e quem confere os dados.

## 2. Abra a base no Google Planilhas

1. Abra uma planilha vazia no Google Planilhas e localize `base_vendas_analise_com_ia.csv`, recebido com o material da aula.
2. O CSV usa **ponto decimal**, como `84.9`. Antes de importar, use **Arquivo → Configurações → Localidade → Estados Unidos** e salve, para interpretar esse formato numérico.
3. Use **Arquivo → Importar → Upload** e selecione o CSV. No tipo de separador, escolha **Personalizado** e informe **`;`**. Mantenha habilitada a conversão de texto em números, datas e fórmulas, se essa opção aparecer.
4. Confira que a importação criou **16 colunas** e **475 registros**, além da linha de cabeçalhos. Renomeie a aba para **Vendas**: a base completa deve ocupar **Vendas!A1:P476**.
5. Encontre `Mês`, `Quantidade` e `Receita_após_desconto_R$`. Confira se os decimais foram reconhecidos como números e podem ser somados. Depois de importar corretamente, você pode trocar a localidade para **Brasil** e formatar os valores em reais; isso muda a exibição, sem corrigir texto importado incorretamente. Confira se Mês distingue as seis competências de maio a outubro de 2026. Receita após descontos é diferente de faturamento bruto e de lucro bruto simplificado.

Se tudo ficar em uma única coluna ou os valores virarem texto, peça apoio para corrigir a importação antes de somar. Os totais de conferência do CSV são **909 unidades** e **R$ 52.841,96 de receita após descontos**.

**O XLSX fica como material de apoio**, com as abas Comece aqui, Dicionário e Atividade. Suas fórmulas de receita usam valores sem arredondamento por registro e produzem total de **R$ 52.841,89**, diferente em **R$ 0,07** do CSV. Não alteraremos os arquivos: nesta prática, NotebookLM, Planilhas e SQL usam os valores do **CSV** para manter a mesma referência. Não compare o resultado da atividade com o total recalculado do XLSX.

## 3. Adicione a fonte ao NotebookLM

No navegador, acesse [NotebookLM](https://notebooklm.google.com), entre na sua conta, crie um notebook e use **Adicionar fontes** para enviar `base_vendas_analise_com_ia.csv`. Aguarde o processamento e abra a fonte: confira nome, cabeçalhos e alguns registros antes de conversar.

Use o **CSV da aula**; se preferir adicionar uma planilha pelo Drive, use a versão Google Planilhas criada a partir desse CSV na etapa 2. Os formatos aceitos estão na [documentação oficial de fontes](https://support.google.com/gemininotebook/answer/16215270?hl=pt-BR).

Esta compatibilidade foi verificada na documentação. O acesso e o envio na conta da turma precisam ser ensaiados; o aplicativo móvel pode ter opções diferentes. Use o navegador. A apresentação não faz upload nem chama a IA por você.

## 4. Envie o prompt e leia criticamente

No slide “Cole o prompt”, clique em **Copiar prompt** e cole na conversa com a fonte selecionada. O arquivo `PROMPTS_DA_ATIVIDADE.txt`, recebido com o material da aula, contém dois prompts: análise guiada e SQL.

Leia o texto antes de enviar. Na rodada autônoma, adapte a pergunta, a medida e o recorte; não substitua apenas o nome da categoria se isso mudar o indicador. Um prompt claro ajuda a orientar a conversa, mas não garante acerto.

Confira a resposta:

- Os nomes das colunas existem na fonte?
- A medida é receita após descontos ou a IA trocou o indicador?
- O cálculo pode ser reproduzido na planilha?
- A resposta distinguiu observação, hipótese e informação ausente?

Se a ferramenta apresentar números, guarde a resposta para comparar. Uma citação identifica uma fonte, mas não demonstra que um total foi somado corretamente. Se o acesso à IA não estiver disponível, siga os passos da planilha e registre essa limitação.

## 5. Calcule a resposta no Planilhas

1. Use o intervalo completo **Vendas!A1:P476**, importado do CSV.
2. Use **Inserir → Tabela dinâmica** e escolha uma nova página.
3. No editor, adicione **Mês** em Linhas e ordene de forma crescente.
4. Em Valores, adicione **Receita_após_desconto_R$** e escolha **SOMA**. Para a pergunta mensal da base completa, não aplique filtro de categoria/canal.
5. Verifique que há seis meses e uma linha de total geral. Contar células não responde à receita em reais.
6. Selecione cabeçalhos e as seis linhas mensais com as receitas; **exclua Total geral** do gráfico.
7. Use **Inserir → Gráfico**, escolha colunas e coloque o título **Receita após descontos por mês (R$)**. Mês fica no eixo horizontal e receita no vertical.

Referências dos menus: [tabela dinâmica](https://support.google.com/docs/answer/1272900?hl=pt-BR) e [gráficos](https://support.google.com/docs/answer/63824?hl=pt-BR). Não é necessário assinar recursos de IA do Planilhas para fazer essa tabela dinâmica.

## 6. Confira antes de concluir

Para conferir um mês, filtre os registros desse mês na fonte, copie as receitas selecionadas para uma aba de conferência sem alterar Vendas e some somente esse recorte. Compare com a célula do mês na tabela dinâmica. Depois some os seis meses e compare com a soma da coluna original. Selecione apenas os valores de dados, sem incluir cabeçalhos nem totais já calculados.

Explique qualquer diferença antes de escolher um resultado: filtro ativo, coluna errada, intervalo incompleto, contagem em vez de soma, números como texto ou arredondamento. Sua tabela, seu gráfico e sua conclusão precisam usar a mesma seleção e a mesma medida.

## 7. Volte aos fundamentos

| Tipo de pergunta | Exemplo | Até onde a base ajuda? |
|---|---|---|
| Descritiva | Qual foi a receita mensal? | Podemos somar e comparar os registros disponíveis. |
| Diagnóstica | Quais categorias contribuíram para a mudança? | Podemos decompor a diferença; isso não prova a causa da mudança. |
| Preditiva | Qual será a receita no mês seguinte? | Precisamos de método e incerteza; seis meses não garantem previsão confiável. |
| Prescritiva | Em qual categoria investir? | Faltam objetivos e restrições, como orçamento, estoque e demanda. |

Não são quatro tarefas obrigatórias nem uma receita linear. São maneiras de pensar e de reconhecer o limite da resposta. A base identifica registros de venda, não clientes distintos; não conclua que uma queda foi causada por perda de clientes sem outra evidência.

## 8. Compare com SQL e faça a rodada autônoma

Depois da explicação de SELECT, use o segundo prompt se quiser ajuda para escrever a consulta. Ele já informa o esquema real de `vendas`. A IA sugere a instrução; você a executa no laboratório. Compare o total mensal com o Planilhas e mantenha iguais o indicador e o recorte.

Na rodada de 30 minutos, escolha outra pergunta, adapte o primeiro prompt e repita: planejar, investigar, representar e conferir. Se usar SQL, adapte também o segundo prompt à nova pergunta, ao indicador e ao recorte. SQL é mais uma forma de expressar a análise, e não uma etapa obrigatória para toda pergunta.

## Como praticaremos nas três horas

- **Eu mostro:** o apresentador demonstra uma pergunta, o indicador e a primeira ação na ferramenta.
- **Nós fazemos:** a turma usa o CSV, envia o prompt e monta a receita mensal no Planilhas; antes de avançar, confere um valor com os auxiliares.
- **A dupla faz:** na rodada de 30 minutos, cada dupla escolhe outra pergunta e entrega sua própria análise.

Essa progressão faz parte dos blocos da oficina de **180 minutos**. A prática guiada acontece antes do SQL e ocupa o lugar de parte da explicação das ferramentas; não é uma atividade extra ao final.

Ao longo da aula haverá quatro pausas: pense por **30 segundos**, discuta por **um minuto** com a pessoa ao lado e justifique a escolha antes de ver a explicação. Elas ajudam a identificar dúvidas enquanto ainda há tempo para retomar o exemplo.

## Como sua investigação será avaliada

| Critério | Pergunta de conferência |
|---|---|
| Pergunta | É específica e a base permite respondê-la? |
| Indicador | O campo, o filtro e a conta estão corretos? Você conferiu um valor? |
| Visualização | O gráfico representa a pergunta, a unidade, o período e as proporções? |
| Interpretação | A conclusão tem evidência e reconhece o que ainda não sabemos? |

Na leitura crítica, compare dois gráficos de maio e junho com os mesmos valores e eixos diferentes. Observe a escala antes de concluir que uma mudança foi grande. O tamanho das barras não prova uma causa, e uma imagem produzida por IA também precisa de conferência.

## Entrega da dupla

- Pergunta e indicador com período e unidade.
- Tabela-resumo e gráfico que respondam à pergunta.
- Resposta da IA, quando usada, e uma observação sobre o que foi conferido ou corrigido.
- Um valor conferido na fonte e como a conferência foi feita.
- Conclusão breve com evidência, uma limitação e uma próxima pergunta.

Ao apresentar à gerência, explique por que escolheu esse indicador, por que confia no resultado e o que recomenda investigar em seguida. Dizer o que ainda não sabemos também faz parte de uma boa análise.

## Exercício em dupla — confira uma queda de receita

1. Abra **Praticar no editor SQL** no slide de comparação de escalas. Escreva uma consulta que traga a receita após descontos de maio e junho de 2026. Use o CSV para conferir.
2. Subtraia a receita de maio da de junho. Depois divida a diferença pela receita de maio e converta o resultado em percentual.
3. Compare os dois gráficos do slide. Explique o efeito do eixo que começa em R$ 6.800.
4. Escreva uma conclusão com o valor em reais e o percentual. Indique quais dados ajudariam a investigar se houve queda no número de clientes.

### Alternativa se a ferramenta de IA estiver indisponível

**Resposta simulada para revisar** — “A receita caiu 8,63% de maio para junho. Portanto, a loja perdeu 8,63% dos clientes.”

Confira o percentual usando o CSV ou o resultado do SQL. Reescreva a conclusão para dizer apenas o que a receita mostra e explique como você testaria a afirmação sobre clientes.
