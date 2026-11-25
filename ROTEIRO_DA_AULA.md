# Roteiro da aula — Fundamentos de Análise de Dados e Aplicações em IA

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

## 1. "A principal habilidade de um analista não é apenas responder perguntas, mas saber formular boas perguntas a partir dos dados."

Antes de falar de ferramentas, vamos combinar uma coisa: não basta receber uma resposta bonita. Precisamos saber o que perguntar e como conferir. Uma IA pode ajudar, mas a decisão sobre o que investigar começa em vocês. O que tornaria uma pergunta importante para alguém?

## 2. FUNDAMENTOS DE ANÁLISE DE DADOS E APLICAÇÕES EM IA

Boa noite. Somos estudantes do 8º semestre de Engenharia de Computação. Estudamos no período noturno. Somos quatro apresentadores e quatro auxiliares. A mesma oficina acontece por inteiro em cada turma, com três horas de duração. Hoje vamos formular perguntas, explorar uma base fictícia, usar ferramentas e conferir o que descobrimos.

## 3. O que aconteceu na Loja Horizonte?

Apresente o problema antes dos conceitos. Não anuncie uma causa nem uma decisão pronta. Diga: a gerência da Loja Horizonte percebeu mudanças ao longo de seis meses e pediu ajuda para decidir o que investigar primeiro. Ouça duas ou três perguntas iniciais e anote-as para retomar no encerramento. Cada conceito e ferramenta da oficina deve nos ajudar a avançar nesta mesma investigação.

## 4. AFINAL, O QUE SÃO DADOS?

Afinal, o que são dados? Espere as respostas. Uma pintura, um texto como a Bíblia e uma sequência de memes podem ser analisados? Sim: podemos observar cores, palavras, temas, datas e padrões. Isso não significa que já estejam organizados em uma tabela. O número 100, sozinho, diz pouco. Cem unidades vendidas em junho já trazem contexto. É assim que começamos a transformar registros em informação. Retome o caso: uma receita em um registro é um dado; comparar as receitas mensais produz informação para a gerência. Peça um exemplo de cada um antes de avançar.

## 5. COMO OS DADOS SE ORGANIZAM?

Uma planilha organiza dados em linhas e colunas. Imagens e textos livres exigem outra preparação. Um JSON com campos definidos e estrutura variável é um exemplo de dado semiestruturado. Nenhum formato garante qualidade por si só. Hoje vamos trabalhar com dados estruturados porque conseguimos enxergar o registro, calcular e conferir. Vamos conhecer o monstrinho aos poucos. A tabela ilustrada usa três registros do CSV da Loja Horizonte. Conecte linhas, colunas e a pergunta da gerência à organização dos dados.

## 6. OS 4 MODELOS DE ANÁLISE DE DADOS

Os quatro tipos de análise ajudam a escolher a pergunta. Descritiva: o que aconteceu? Diagnóstica: que explicações precisamos investigar? Preditiva: o que pode acontecer, com qual incerteza? Prescritiva: que ação faz sentido considerando objetivo e restrições? Uma tabela de vendas pode descrever variações; sozinha, ela pode não explicar as causas nem sustentar uma previsão. Volte à loja: qual foi a receita mensal? Que diferenças merecem investigação? O que precisaríamos para prever novembro? O que falta para recomendar uma decisão? Não exija quatro análises completas; use os modelos para reconhecer perguntas e limites.

## 7. Que tipo de pergunta estamos fazendo?

Faça uma pausa de 30 segundos para pensar individualmente e um minuto de discussão em dupla. Peça a justificativa antes de selecionar uma alternativa. O foco é identificar dificuldades durante a aula, não classificar as pessoas. O foco é diagnóstico: investigar possíveis explicações. Os totais descrevem a mudança; eles não comprovam sua causa. Podemos começar decompondo a diferença por categoria ou canal e depois procurar outras evidências. Se houver muita dúvida, retome o exemplo e só depois avance.

## 8. APLICAÇÃO PRÁTICA: A ANALOGIA

Conte a história do relacionamento e espere a turma classificar os tipos de pergunta. Separe fatos, hipóteses, possibilidades e decisões. Falta de atenção pode ser uma hipótese; não é causa comprovada. A história é uma analogia, não uma amostra estatística. Pergunte: onde terminam as observações e começam nossas interpretações? Essa distinção também vale para vendas e para respostas de IA.

## 9. Antes da ferramenta: o que queremos entender?

Bom, tudo precisa começar de algum lugar, não é? Imaginem que a gestão da Loja Horizonte pediu ajuda para entender a variação da receita. Antes de abrir uma IA, o que precisamos saber? Quem vai usar a resposta? Para qual decisão? Não vou afirmar que a loja perdeu clientes ou que uma campanha falhou: a base não prova isso. Primeiro vamos descobrir o que aconteceu com a receita. Espere as sugestões e anote uma pergunta da turma.

## 10. “Como estão as vendas?” Vamos melhorar isso.

Como estão as vendas? Se eu responder que estão boas, vocês conseguem conferir? Boas em relação a quê? Vamos delimitar: receita após descontos, por mês, de maio a outubro de 2026. Agora sabemos o indicador, o período e a comparação. Depois podemos perguntar em qual intervalo houve a maior queda. Peça três perguntas a cada participante, antes de usar IA. Uma pergunta pode ser relevante e ainda exigir dados que não temos. “Por que o cliente desistiu?” exigiria outras fontes. Faça a progressão explicitamente: demonstre a reformulação de “como estão as vendas?”. Depois peça que a turma melhore “qual é a melhor categoria?”, definindo melhor em qual indicador e período. Só então peça as três perguntas individuais. Os auxiliares conferem se elas cabem nas colunas disponíveis.

## 11. O que vamos medir para responder?

Uma pergunta não é uma coluna, e uma coluna não é automaticamente um indicador. O campo traz um valor por registro. O indicador pode somar esses valores para um período. Mais pedidos não garante maior receita: o valor e o desconto podem mudar. A margem agregada é lucro bruto dividido pela receita, e não a soma das margens das linhas. O lucro bruto simplificado também não desconta aluguel, salários e outras despesas. Portanto, não vamos chamá-lo de lucro líquido.

## 12. Qual medida responde à pergunta?

Faça uma pausa de 30 segundos para pensar individualmente e um minuto de discussão em dupla. Peça a justificativa antes de selecionar uma alternativa. O foco é identificar dificuldades durante a aula, não classificar as pessoas. Precisamos somar a receita após descontos do recorte de junho. Contagem mede registros; quantidade mede unidades. A soma das margens das linhas não é a margem agregada da loja. Se houver muita dúvida, retome o exemplo e só depois avance.

## 13. Conhecendo o monstrinho, sem pressa.

Use a planilha enviada aos alunos. Não se assustem com o monstrinho: vamos entender uma parte de cada vez. O que representa cada linha? E cada coluna? Temos 475 registros com identificadores distintos nesta base. Quantidade é o número de unidades da linha, não o número de registros. Peça que encontrem data, categoria e receita após descontos. Há campos vazios, valores inesperados ou repetições? Antes de remover uma linha, é preciso entender o que ela representa. As linhas mostradas aqui vêm da própria base fictícia.

## 14. DA PLANILHA AO INDICADOR

Agora filtrem uma categoria. Antes de mudar, façam uma previsão: quais indicadores devem mudar? Observe registros, unidades, receita e lucro bruto. O gráfico resume toda a seleção por mês; a tabela mostra apenas uma amostra, e isso está indicado. Se eu disser que Informática é a melhor categoria, melhor em quê? Receita? Lucro bruto? Quantidade? Peça uma descrição baseada no que aparece. Se alguém sugerir uma causa, trate como hipótese a investigar.

## 15. A pergunta continua sendo nossa.

Primeiro decidimos o que queremos descobrir. Depois aprendemos a expressar essa pergunta na ferramenta. Retome uma pergunta da turma sobre a Loja Horizonte e peça que expliquem quais informações seriam necessárias para respondê-la. Só depois discutam como a planilha, a IA ou o SQL podem ajudar nesse caminho. Não precisamos dominar várias ferramentas hoje. Uma IA pode explicar um campo e sugerir uma consulta, mas também pode errar ou não conseguir calcular com segurança. Na planilha conseguimos conferir fórmulas e filtros. No laboratório, executamos a consulta e construímos o gráfico a partir do resultado.

## 16. Agora é com vocês: abram a base.

Agora vamos usar as ferramentas de verdade, juntos. Primeiro eu mostro como abrir a base, depois cada dupla repete. O CSV usa ponto decimal, como 84.9. Em uma planilha vazia, definam localidade Estados Unidos em Arquivo, Configurações antes de importar; depois importem o CSV com ponto e vírgula como separador e conversão de textos em números habilitada. Confiram 16 colunas, números reconhecidos e 475 registros mais o cabeçalho. Renomeiem a aba Vendas; o intervalo é A1:P476. Depois da importação numérica correta, podem mudar a localidade para Brasil e formatar os valores em reais. Confiram que Mês identifica as seis competências. Usaremos o CSV em toda a prática, pois o XLSX original contém fórmulas com precisão diferente: sua soma não coincide centavo a centavo com o CSV. O XLSX fica como apoio preservado. No NotebookLM, pelo navegador, criem um notebook e adicionem o mesmo CSV. Não confundam ler a fonte com já ter calculado tudo. Se faltar acesso à IA, sigam pela planilha.

## 17. Cole o prompt. Depois, questione a resposta.

O prompt está na tela para vocês usarem. Copiem o texto e colem na conversa com a fonte selecionada. Antes de enviar, leiam a pergunta: ela é a que a dupla quer investigar? O exemplo é a receita mensal, mas na prática autônoma vocês adaptarão o indicador e o recorte. Um bom prompt ajuda a tornar o pedido claro; ele não garante uma resposta correta. Peçam a explicação, confrontem os campos e anotem uma afirmação que possa ser verificada. Se o NotebookLM devolver totais, não os aceitem apenas pela confiança do texto ou pela presença de uma citação: reproduzam o cálculo na planilha.

## 18. Vamos construir a resposta no Google Planilhas.

Eu faço a primeira etapa no projetor e vocês fazem junto. Selecionem a aba Vendas, intervalo A1:P476. Inserir, Tabela dinâmica, Nova página. Em Linhas, adicionem Mês. Em Valores, adicionem Receita_após_desconto_R$ e escolham SOMA. Confiram o total e os seis meses em ordem crescente. Para o gráfico, selecionem somente as seis linhas mensais e o cabeçalho, sem a linha de total geral: ela não é um sétimo mês. Inserir, Gráfico, e escolham colunas. O título e a unidade precisam identificar receita após descontos em reais. Se aparecer contagem ou zeros inesperados, confiram se os números foram importados como texto. A importação deve respeitar o ponto decimal do CSV; a exibição em reais pode ser configurada depois. Não contornem um erro de importação mudando os dados.

## 19. A ferramenta respondeu. Agora é a nossa vez.

Este é o momento de voltar aos fundamentos. Qual foi a receita por mês é uma pergunta descritiva. Quais categorias contribuíram para a mudança ajuda a investigar a diferença, mas não comprova por que alguém comprou menos. Não temos identificação de clientes, visitas nem motivos de compra nesta base. Se alguém prevê novembro com certeza, que método e evidências usou? Se recomenda investir em uma categoria, qual objetivo e quais restrições considerou? Os modelos são um mapa de perguntas e limites, não quatro respostas obrigatórias. Peça a cada dupla que explique uma observação e uma dúvida que ainda tem. Agora vamos expressar a mesma pergunta em SQL; mudamos a ferramenta e mantemos o indicador e a conferência.

## 20. O que é SQL, afinal?

Até agora vocês perguntaram em português e exploraram uma planilha. SQL é outra forma de expressar uma pergunta, com uma estrutura que o mecanismo de banco entende. Ele não é uma IA, e o banco não adivinha o que quisemos dizer. SELECT produto, receita escolhe as informações que queremos ver. FROM vendas aponta a origem. LIMIT 5 limita a saída a cinco linhas para conhecermos a tabela. Este é um exemplo de exploração; para responder à receita mensal, precisaremos resumir os dados.

```sql
SELECT produto, receita
FROM vendas
LIMIT 5;
```

## 21. SELECT é o único comando que existe?

SELECT é o comando que usaremos para consultar. Isso não significa que SQL só tenha esse comando, nem que toda consulta precise ter a mesma forma. Podemos combinar consultas, juntar tabelas e usar outros recursos, mas isso fica para outro momento. Hoje precisamos entender uma estrutura simples. FROM e WHERE são cláusulas, isto é, partes da instrução. Vamos ler como uma frase, sem decorar uma lista de palavras. Este laboratório aceita uma consulta iniciada por SELECT de cada vez e mantém a base em modo de leitura.

## 22. Vamos procurar maçãs na geladeira?

Gostei da ideia de buscar maçãs na geladeira. Vamos torná-la mais precisa. Imaginem que cada item tem nome, tipo e quantidade. Quero saber o nome e a quantidade das maçãs: isso fica no SELECT. Vou olhar na geladeira: isso fica no FROM. Quero somente itens do tipo fruta e de nome maçã: essas duas condições ficam no WHERE, ligadas por AND. O SELECT escolhe as colunas da resposta; ele não é apenas o verbo genérico buscar. Sem WHERE, aparecem todos os registros da origem, respeitando as outras partes da consulta. Aqui a geladeira é só uma analogia, não uma nova base de vendas.

```sql
SELECT nome, quantidade
FROM geladeira
WHERE tipo = 'fruta' AND nome = 'maçã';
```

## 23. Da geladeira para a nossa tabela.

Vamos traduzir juntos. Quais informações precisamos ver? Produto, quantidade e receita. De onde? Da tabela vendas. Quantas linhas vamos observar agora? Até cinco. São três colunas e no máximo cinco linhas. Não estamos somando nada ainda: a receita continua sendo a de cada registro. O asterisco em SELECT * pede todas as colunas; pode servir para reconhecer uma tabela, mas aqui escolhemos os campos para manter a pergunta clara. Sem ORDER BY, não há garantia de quais cinco registros serão mostrados.

```sql
SELECT produto, quantidade, receita
FROM vendas
LIMIT 5;
```

## 24. O que SELECT escolhe nesta consulta?

Faça uma pausa de 30 segundos para pensar individualmente e um minuto de discussão em dupla. Peça a justificativa antes de selecionar uma alternativa. O foco é identificar dificuldades durante a aula, não classificar as pessoas. SELECT escolhe as colunas ou expressões do resultado. FROM aponta a origem; WHERE, quando presente, filtra os registros. LIMIT 5 limita a quantidade de linhas exibidas. Se houver muita dúvida, retome o exemplo e só depois avance.

## 25. E se eu quiser somente Informática?

O WHERE funciona como o filtro da planilha: ele decide quais linhas entram na análise. Reparem que categoria não está no SELECT e mesmo assim pode ser usada na condição. Se retirarmos o WHERE, outras categorias podem aparecer. Se digitarmos uma categoria que não existe, a saída fica vazia; isso não significa automaticamente erro do banco. AND exige que duas condições sejam verdadeiras. Por exemplo, podemos restringir Informática e um mês específico. Uma consulta pode executar corretamente e ainda estar respondendo à pergunta errada.

```sql
SELECT mes, produto, receita
FROM vendas
WHERE categoria = 'Informática'
LIMIT 10;
```

## 26. Contar registros ou somar unidades?

Agora vamos produzir indicadores, em vez de listar vendas. COUNT(*) conta as linhas; SUM soma valores de uma coluna. Por que 475 registros não viram 475 unidades? Porque uma venda pode ter duas, três ou mais unidades. A base soma 909. A soma de receita dá R$ 52.841,96. AS é apenas o nome que vamos dar ao resultado, não altera a conta. ROUND com 2 deixa o resultado em duas casas decimais. Pergunte: se eu colocar um WHERE antes do ponto e vírgula, estaremos calculando o total de toda a loja ou do recorte?

```sql
SELECT COUNT(*) AS registros,
       SUM(quantidade) AS unidades,
       ROUND(SUM(receita), 2) AS receita_total
FROM vendas;
```

## 27. Uma soma para cada mês.

Sem GROUP BY, a soma retorna um total para toda a seleção. Com GROUP BY mes, cada mês vira um grupo e recebe sua própria soma. Esperamos seis linhas, uma por mês. ORDER BY mes coloca os meses na sequência, necessária para ler a evolução no tempo. Se a pergunta fosse um ranking de categorias, poderíamos agrupar por categoria e ordenar por receita_total DESC. ORDER BY ordena; ele não filtra nem altera a soma. WHERE, quando usado, vem antes de GROUP BY e restringe as linhas que serão agrupadas.

```sql
SELECT mes, ROUND(SUM(receita), 2) AS receita_total
FROM vendas
GROUP BY mes
ORDER BY mes;
```

## 28. O que esperamos encontrar na saída?

Ainda sem executar: descrevam a resposta que faria sentido. Se queremos o total por mês, não esperamos uma linha por venda. A tabela-resumo precisa vir antes do gráfico para que possamos conferir. Uma linha ou colunas podem ajudar a comparar os meses; aqui usaremos colunas. No laboratório, escolham explicitamente a categoria, o indicador e a unidade. Se a consulta trouxer pedidos e receita, são duas medidas diferentes. O gráfico não decide sozinho qual responde à pergunta.

## 29. UMA PERGUNTA. UM SELECT.

Vamos testar uma pergunta de cada vez. Comece em Ver registros, passe pelo filtro, conte e some, e só depois agrupe por mês. Antes de clicar em Executar, peça que alguém traduza a consulta em português. Ao digitar parte de um comando ou nome de coluna, o editor mostra sugestões. Clique numa opção ou selecione-a com as setas e pressione Enter. Abra Tabelas e colunas para consultar o esquema completo. Ctrl+Enter executa a consulta. Escolha a coluna de categoria, o indicador e a unidade do gráfico. Uma consulta só numérica, como COUNT(*), pode ser lida na tabela sem precisar de um gráfico. Se houver erro, leia a mensagem, confira os campos e tente novamente. Se a preparação do mecanismo falhar, use Tentar novamente. Todos os cálculos são do SQLite local.

## 30. Mesmos dados. Duas impressões visuais.

Peça que a turma compare as duas representações antes de interpretar. Ambas mostram maio R$ 7.686,24 e junho R$ 7.022,65, calculados da mesma coluna de receita do CSV. O gráfico B começa em R$6.800 e amplia a diferença visual. Não esconda essa origem: o exercício é ler o eixo e perceber que a mesma informação pode produzir impressões diferentes. Pergunte qual versão ajuda a comparar magnitudes e o que não podemos inferir sobre clientes ou causas. Reserve cinco minutos deste bloco para as duplas conferirem os totais no CSV ou na consulta Receita por mês. Peça a diferença em reais e a variação relativa a maio. Esperado: queda de R$ 663,59 (8,63%). Para investigar a hipótese de queda no número de clientes, peça identificadores anonimizados que permitam contar clientes distintos por mês. Retome a discussão no quiz seguinte.

## 31. O que os dois gráficos permitem concluir?

Repita 30 segundos de reflexão e um minuto de conversa. A diferença é de R$ 663,59, uma queda de 8,63% em relação a maio. Os valores são iguais nos dois gráficos, mas B começa em R$ 6.800. Não temos evidência sobre clientes distintos nem sobre a causa da queda. Para comparar magnitudes por comprimento de barras, uma base em zero torna a proporção mais clara. Relacione à IA: receber uma figura convincente não dispensa examinar a medida, os eixos e a origem dos números.

## 32. Conseguimos defender o raciocínio?

Apresente os critérios antes da atividade autônoma. Não pontue a decoração do gráfico: peça que a dupla explique a pergunta, o cálculo, a representação e a interpretação. Os auxiliares usam os quatro critérios durante a circulação. Se um critério ainda não tiver evidência, a dupla revisa essa parte antes de apresentar.

## 33. A mesma pergunta por caminhos diferentes.

Agora vocês fazem com mais autonomia. Reservem 30 minutos para escolher outra pergunta, adaptar o prompt e repetir o caminho que já praticamos. Uma dupla pode investigar uma categoria ou um canal, desde que saiba definir o indicador e o recorte. Troquem quem opera a ferramenta e quem confere. Guardem a pergunta, a resposta da IA quando disponível, a tabela calculada, o gráfico e um valor confrontado com a origem. Se quiserem comparar com SQL, o segundo prompt do material enviado contém os nomes reais da tabela vendas. Não precisam dominar todas as ferramentas: precisam explicar e conferir o caminho escolhido. Os auxiliares fazem perguntas e ajudam nos obstáculos sem entregar a conclusão.

## 34. Um resultado bonito ainda precisa de conferência.

Confiram junho: R$ 7.022,65 de receita após descontos. A soma de todos os meses é R$ 52.841,96, calculada independentemente no CSV. Se os valores não batem, não escolham o que parece mais convincente: investiguem o recorte, o campo e a fórmula. Estão somando faturamento bruto ou receita após desconto? Contando registros ou unidades? O gráfico está mostrando a tabela completa ou uma amostra? Uma queda pode indicar um intervalo a investigar, mas não prova que houve menos clientes ou que o preço causou a mudança.

## 35. O que recomendamos investigar primeiro?

Convide as duplas a apresentar em falas curtas. Não avalie apenas se produziram um gráfico: pergunte por que escolheram esse indicador, como calcularam e por que confiam no resultado. A conclusão deve citar um número e seu contexto. Se houver incerteza, é válido dizer o que ainda não sabemos. Retome a frase inicial: a habilidade que treinamos foi transformar uma dúvida em uma pergunta verificável. SQL, planilha e IA são caminhos que podemos usar com esse raciocínio como base. Feche o caso que abriu a aula: qual questão a gerência deve investigar primeiro, por quê e quais dados adicionais seriam necessários? O objetivo é investigar com evidência e avaliar a confiança da resposta, e não apenas gerar um gráfico com IA.

## Referências técnicas

- SQLite, SELECT e suas cláusulas: https://www.sqlite.org/lang_select.html
- sql.js, distribuição com WASM incorporado: https://sql.js.org/documentation/
- Fonte dos números: base_vendas_analise_com_ia.csv, na raiz. Valores fictícios.
- Fontes aceitas no NotebookLM, verificadas em 15/11/2026: https://support.google.com/gemininotebook/answer/16215270?hl=pt-BR
- Planos gratuitos: https://support.google.com/gemininotebook/answer/16213268?hl=pt-BR
- Prática guiada e autonomia gradual: https://education.nsw.gov.au/teaching-and-learning/curriculum/explicit-teaching/explicit-teaching-strategies/gradual-release-of-responsibility.html

Regenerar este documento: node scripts/export-roteiro.cjs.
