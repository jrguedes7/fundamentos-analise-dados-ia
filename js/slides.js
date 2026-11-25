/* Conteúdo e roteiro da aula. Os exemplos numéricos usam SALES_DATA. */
(function () {
  'use strict';
  const escape = (value) =>
    String(value).replace(
      /[&<>"']/g,
      (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c],
    );
  const code = (text) => `<pre class="lesson-code"><code>${escape(text)}</code></pre>`;
  const card = (title, text) =>
    `<section class="retro-card lesson-card"><h3>${title}</h3><p>${text}</p></section>`;
  const grid = (...cards) => `<div class="lesson-grid">${cards.join('')}</div>`;
  const prompt = (text) => `<p class="lesson-question">${text}</p>`;
  const slide = (title, lead, body) =>
    `<div class="slide lesson-slide flex-col h-full px-4"><h2 class="font-editorial lesson-title">${title}</h2><p class="lesson-lead">${lead}</p>${body}</div>`;
  let deckSlides = [
    `<div class="slide flex-col justify-center h-full px-4 md:px-12" id="slide-1">
<div class="max-w-4xl mx-auto text-center">
<h1 class="font-editorial text-3xl md:text-5xl lg:text-6xl text-[#1D3532] leading-tight mb-8">
                        "A principal habilidade de um analista não é apenas responder perguntas, <br/>
<span class="text-[#E07A5F] italic">mas saber formular boas perguntas</span> a partir dos dados."
                    </h1>
<div class="inline-block retro-card p-4 text-sm md:text-base border-dashed bg-[#D8E2DC]/30">
                        Neste curso, não vamos começar aprendendo a pedir respostas à IA.<br/>
                        Vamos começar aprendendo a fazer perguntas que valham a pena responder.
                    </div>
</div>
</div>`,

    `<div class="slide intro-slide flex-col h-full px-4" id="slide-2">
<div class="intro-content">
<h2 class="font-editorial text-3xl md:text-4xl mb-7">FUNDAMENTOS DE ANÁLISE DE DADOS <span class="italic text-[#E07A5F]">E APLICAÇÕES EM IA</span></h2>
<div class="flex flex-col md:flex-row gap-8 w-full">
<!-- Ficha Técnica -->
<div class="retro-card p-6 w-full md:w-1/3 h-fit border-l-8 border-l-[#1D3532]"><p class="font-editorial text-xl leading-relaxed">Alunos do 8º semestre de Engenharia de Computação — Noturno</p></div>
<!-- Intro Text -->
<div class="w-full md:w-2/3 flex flex-col justify-center text-lg md:text-xl leading-relaxed font-editorial border-t md:border-t-0 md:border-l border-[#D8E2DC] pt-6 md:pt-0 md:pl-8">
<p>Boa noite.</p>
<p class="mt-4">O intuito deste curso é mostrar, de maneira prática, como analisar dados com apoio da Inteligência Artificial.</p>
<p class="mt-4">Mas estamos falando de dados e análises para lá e para cá... antes de começar, <strong class="text-[#E07A5F] bg-[#E07A5F]/10 px-1">precisamos entender o básico</strong>, não é?</p>
</div>
</div>
</div>
</div>`,

    `<div class="slide flex-col h-full px-4" id="slide-3">
<h2 class="font-editorial text-4xl md:text-6xl mb-6">AFINAL, O QUE SÃO DADOS?</h2>
<div class="min-h-[80px] text-lg md:text-xl text-[#1D3532] bg-[#D8E2DC]/50 p-4 border-l-4 border-[#1D3532] mb-12 flex items-center">
<span class="typewriter" data-text="Registros de fatos, observações ou medidas. Quando interpretamos esses registros em um contexto, podemos transformá-los em informações úteis."></span>
</div>
<p class="text-sm font-bold mb-4 uppercase">Para a turma: Esses itens contêm dados?</p>
<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
<div class="retro-card p-6 flex flex-col justify-center text-center hover:bg-[#D8E2DC] cursor-help">
<div class="text-3xl mb-2">🖼️</div>
<div class="font-editorial text-xl font-bold">Uma pintura?</div>
</div>
<div class="retro-card p-6 flex flex-col justify-center text-center hover:bg-[#D8E2DC] cursor-help">
<div class="text-3xl mb-2">📖</div>
<div class="font-editorial text-xl font-bold">A Bíblia?</div>
</div>
<div class="retro-card-coral p-6 flex flex-col justify-center text-center hover:bg-[#E07A5F]/10 cursor-help">
<div class="text-3xl mb-2">😂</div>
<div class="font-editorial text-xl font-bold text-[#E07A5F]">Memes em sequência?</div>
</div>
</div>
</div>`,

    `<div class="slide flex-col h-full px-4 justify-center" id="slide-4"><h2 class="font-editorial text-3xl md:text-4xl mb-6">COMO OS DADOS SE ORGANIZAM?</h2>
<div class="text-center max-w-2xl mx-auto mb-10">
<p class="font-editorial text-2xl">Esses exemplos têm diferenças importantes: podemos encontrar dados <span class="bg-[#1D3532] text-white px-2">Estruturados</span>, <span class="bg-[#E07A5F] text-white px-2">Não Estruturados</span> e <span class="underline decoration-wavy decoration-[#D8E2DC]">Semiestruturados</span>.</p>
</div>
<div class="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl mx-auto">
<!-- Estruturados -->
<div class="flex flex-col">
<h3 class="text-lg font-bold uppercase mb-2 flex items-center">
<span class="inline-block w-3 h-3 bg-[#1D3532] mr-2"></span> Estruturados
                        </h3>
<div class="retro-card p-4 bg-white relative">
<!-- Aviso de Foco -->
<div class="absolute -top-3 -right-3 bg-[#E07A5F] text-white text-[10px] px-2 py-1 font-bold shadow-[2px_2px_0_#1D3532] transform rotate-3">
                                NOSSO FOCO HOJE!
                            </div>
<table class="spreadsheet-table"></table>
<p class="text-[11px] mt-4 opacity-70 italic font-editorial border-t border-[#D8E2DC] pt-2">
                                "Não se assustem com o monstrinho ainda. Uma planilha é o melhor ponto de partida para formular perguntas."
                            </p>
</div>
</div>
<!-- Não Estruturados -->
<div class="flex flex-col">
<h3 class="text-lg font-bold uppercase mb-2 flex items-center opacity-50">
<span class="inline-block w-3 h-3 bg-[#1D3532] mr-2"></span> Não Estruturados
                        </h3>
<div class="retro-card p-4 bg-white/50 opacity-60 flex gap-4 h-[140px]">
<div class="border border-dashed border-[#1D3532] w-1/2 flex items-center justify-center bg-gray-100 flex-col">
<span class="text-2xl">🖼️</span>
<span class="text-[9px] mt-1 font-bold">.JPG / IMAGEM</span>
</div>
<div class="border border-dashed border-[#1D3532] w-1/2 p-2 text-[8px] bg-gray-100 overflow-hidden text-left text-fix">
                                "No princípio..." Um texto livre longo que não cabe perfeitamente em linhas e colunas sem ser previamente processado.
                                <span class="block mt-2 font-bold">.TXT / TEXTO LIVRE</span>
</div>
</div>
</div>
</div>
</div>`,

    `<div class="slide flex-col h-full px-4" id="slide-5">
<h2 class="font-editorial text-3xl md:text-4xl mb-6">OS 4 MODELOS DE ANÁLISE DE DADOS</h2>
<p class="text-sm mb-6 max-w-3xl">Eles ajudam a definir que tipo de pergunta queremos responder com os dados e servem para avaliar até mesmo as respostas oferecidas por uma IA.</p>
<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
<!-- Card 1 -->
<div class="retro-card p-5">
<div class="text-[#E07A5F] font-bold text-xs mb-1">01 / PASSADO</div>
<h3 class="font-editorial text-2xl font-bold mb-2">Descritiva</h3>
<p class="bg-[#1D3532] text-white inline-block px-2 py-1 text-xs font-bold mb-3">"O que aconteceu?"</p>
<p class="text-xs">Organiza, resume e descreve características principais dos dados coletados. Sem tentar explicar causas profundas.</p>
</div>
<!-- Card 2 -->
<div class="retro-card p-5">
<div class="text-[#E07A5F] font-bold text-xs mb-1">02 / INVESTIGAÇÃO</div>
<h3 class="font-editorial text-2xl font-bold mb-2">Diagnóstica</h3>
<p class="bg-[#1D3532] text-white inline-block px-2 py-1 text-xs font-bold mb-3">"Por que aconteceu?"</p>
<p class="text-xs">Vai além da descrição. Investiga possíveis explicações e levanta hipóteses. (Atenção: uma hipótese não é uma causa comprovada).</p>
</div>
<!-- Card 3 -->
<div class="retro-card p-5">
<div class="text-[#E07A5F] font-bold text-xs mb-1">03 / FUTURO</div>
<h3 class="font-editorial text-2xl font-bold mb-2">Preditiva</h3>
<p class="bg-[#1D3532] text-white inline-block px-2 py-1 text-xs font-bold mb-3">"O que é provável que aconteça?"</p>
<p class="text-xs">Utiliza dados históricos e métodos para estimar tendências ou comportamentos futuros, sempre lidando com graus de incerteza.</p>
</div>
<!-- Card 4 -->
<div class="retro-card-coral p-5">
<div class="text-[#E07A5F] font-bold text-xs mb-1">04 / AÇÃO</div>
<h3 class="font-editorial text-2xl font-bold text-[#E07A5F] mb-2">Prescritiva</h3>
<p class="bg-[#E07A5F] text-white inline-block px-2 py-1 text-xs font-bold mb-3">"O que devemos fazer?"</p>
<p class="text-xs">Utiliza evidências, objetivos e restrições para comparar alternativas e recomendar ações e tomadas de decisão.</p>
</div>
</div>
</div>`,

    `<div class="slide flex-col h-full px-4 overflow-y-auto" id="slide-6">
<div class="flex items-center justify-between border-b border-[#1D3532] pb-2 mb-6">
<h2 class="font-editorial text-3xl font-bold">APLICAÇÃO PRÁTICA: A ANALOGIA</h2>
<span class="text-xs bg-yellow-200 text-yellow-800 px-2 py-1 font-bold border border-yellow-800 shadow-[2px_2px_0_#854d0e]">! AVISO: Relato não é base estatística</span>
</div>
<p class="text-sm mb-6 bg-[#D8E2DC]/50 p-4 border-l-4 border-[#1D3532] font-editorial italic text-fix">
                    "Eu tinha uma namorada. Nosso relacionamento não estava bem e eu percebia que dava pouca atenção a ela. Depois, descobri que ela se envolveu com outra pessoa. Fiquei muito triste."
                </p>
<div class="space-y-3">
<!-- Linha 1 -->
<div class="flex flex-col md:flex-row border border-[#D8E2DC] bg-white text-fix">
<div class="md:w-1/4 bg-[#1D3532] text-white p-3 flex flex-col justify-center">
<span class="text-xs font-bold text-[#D8E2DC]">01. DESCRITIVA</span>
<span class="font-editorial text-lg">O que aconteceu?</span>
</div>
<div class="md:w-3/4 p-3 text-sm flex flex-col justify-center">
<p>Relacionamento difícil e envolvimento com outra pessoa. (Os fatos conhecidos).</p>
</div>
</div>
<!-- Linha 2 -->
<div class="flex flex-col md:flex-row border border-[#D8E2DC] bg-white text-fix">
<div class="md:w-1/4 bg-[#1D3532] text-white p-3 flex flex-col justify-center">
<span class="text-xs font-bold text-[#D8E2DC]">02. DIAGNÓSTICA</span>
<span class="font-editorial text-lg">Por que aconteceu?</span>
</div>
<div class="md:w-3/4 p-3 text-sm flex flex-col justify-center">
<p>Falta de atenção é uma <strong class="text-[#E07A5F] mx-1">hipótese</strong>. Não podemos concluir causalidade sem mais dados.</p>
</div>
</div>
<!-- Linha 3 -->
<div class="flex flex-col md:flex-row border border-[#D8E2DC] bg-white text-fix">
<div class="md:w-1/4 bg-[#1D3532] text-white p-3 flex flex-col justify-center">
<span class="text-xs font-bold text-[#D8E2DC]">03. PREDITIVA</span>
<span class="font-editorial text-lg">O que pode acontecer?</span>
</div>
<div class="md:w-3/4 p-3 text-sm flex flex-col justify-center">
<p>Posso me afastar de novos relacionamentos ou seguir em frente; (São <strong class="mx-1">possibilidades</strong>, não previsões confiáveis).</p>
</div>
</div>
<!-- Linha 4 -->
<div class="flex flex-col md:flex-row border border-[#E07A5F] bg-white shadow-[4px_4px_0_#E07A5F] text-fix">
<div class="md:w-1/4 bg-[#E07A5F] text-white p-3 flex flex-col justify-center">
<span class="text-xs font-bold text-yellow-200">04. PRESCRITIVA</span>
<span class="font-editorial text-lg">Qual decisão tomar?</span>
</div>
<div class="md:w-3/4 p-3 text-sm flex flex-col justify-center">
<p>Conversar, buscar apoio ou seguir em frente. Alternativas a avaliar conforme os <strong class="mx-1">objetivos e circunstâncias</strong>.</p>
</div>
</div>
</div>
</div>`,

    `<div id="slide-7" class="slide flex-col h-full px-4" aria-label="Laboratório de exploração de dados">
  <div class="flex justify-between items-start gap-3 mb-3">
    <div><h2 class="font-editorial text-3xl md:text-4xl font-bold">DA PLANILHA AO <span class="coral-text italic">INDICADOR</span></h2></div>
    <div class="data-tag">BASE: LOJA HORIZONTE</div>
  </div>
  <p class="text-sm mb-3">Escolha uma categoria e veja como o recorte muda os indicadores. Os valores vêm da base fictícia disponibilizada aos alunos.</p>
  <div class="lab-filter-row">
    <label for="category-filter" class="text-xs uppercase font-bold">Categoria</label>
    <select id="category-filter" class="lab-select" aria-label="Filtrar categoria"><option value="">Todas as categorias</option></select>
    <span class="lab-hint">Teste: o que muda ao filtrar?</span>
  </div>
  <div class="metrics-grid" aria-live="polite">
    <div class="metric"><span>REGISTROS</span><strong id="metric-records">—</strong></div>
    <div class="metric"><span>UNIDADES</span><strong id="metric-units">—</strong></div>
    <div class="metric"><span>RECEITA</span><strong id="metric-revenue">—</strong></div>
    <div class="metric metric-accent"><span>LUCRO BRUTO*</span><strong id="metric-profit">—</strong></div>
  </div>
  <div class="lab-panels">
    <section class="retro-card lab-panel">
      <h3 class="lab-panel-title">Receita por mês <small>R$</small></h3>
      <div id="explore-chart" class="chart-host" role="img" aria-label="Gráfico de receita mensal por categoria"></div>
    </section>
    <section class="retro-card lab-panel">
      <h3 class="lab-panel-title">Amostra dos registros <small id="table-count">—</small></h3>
      <div class="table-scroll"><table aria-label="Amostra dos registros de venda" id="explore-table" class="spreadsheet-table modern-table"><thead><tr><th>Mês</th><th>Categoria</th><th>Produto</th><th>Receita (R$)</th></tr></thead><tbody></tbody></table></div>
    </section>
  </div>
  <p class="footnote">*Lucro bruto simplificado = receita após desconto − custo dos produtos; não contempla demais despesas.</p>
</div>`,

    `<div id="slide-29" class="slide flex-col h-full px-4" aria-label="Laboratório SQL interativo">
  <div class="flex justify-between items-start gap-3 mb-3">
    <div><h2 class="font-editorial text-3xl md:text-4xl font-bold">UMA PERGUNTA. UM <span class="coral-text italic">SELECT.</span></h2></div>
    <div class="data-tag">LABORATÓRIO SQL</div>
  </div>
  <p class="text-sm mb-2">Até agora perguntamos em linguagem natural. Agora descreva a mesma análise em SQL, execute-a e veja o gráfico do resultado.</p>
  <div class="sql-examples" role="group" aria-label="Exemplos de consulta SQL">
    <button type="button" class="sql-example" data-query="primeiras">1 · Ver registros</button><button type="button" class="sql-example" data-query="filtro">2 · Filtrar</button><button type="button" class="sql-example" data-query="contagem">3 · Contar e somar</button><button type="button" class="sql-example active" data-query="mensal">Receita por mês</button>
    <button type="button" class="sql-example" data-query="categoria">Receita por categoria</button>
    <button type="button" class="sql-example" data-query="canal">Pedidos por canal</button>
  </div>
  <label class="sql-label" for="sql-editor">CONSULTA SQL</label>
  <textarea id="sql-editor" class="sql-editor" spellcheck="false" autocomplete="off" autocapitalize="off" aria-label="Editor de consulta SQL"></textarea>
  <div class="sql-actions">
    <button id="run-sql" class="retro-btn execute-btn" type="button">▶ EXECUTAR SELECT</button>
    <button id="retry-sql" class="retro-btn" type="button" hidden>TENTAR NOVAMENTE</button><span id="sql-status" role="status" aria-live="polite">Preparando mecanismo SQL…</span>
  </div>
  ${sqlSchema('sql-editor')}
  <div class="chart-controls"><label>Categoria <select id="sql-category" aria-label="Coluna de categoria" disabled></select></label><label>Indicador <select id="sql-value" aria-label="Coluna numérica do gráfico" disabled></select></label><label>Exibição <select id="sql-unit" aria-label="Unidade do gráfico" disabled><option value="currency">Reais (R$)</option><option value="count">Contagem</option><option value="number">Número</option><option value="share">Participação no total (%)</option><option value="percent">Taxa em fração (%)</option></select></label></div><div class="lab-panels sql-output">
    <section class="retro-card lab-panel">
      <h3 class="lab-panel-title">Resultado da consulta <small id="sql-count">—</small></h3>
      <div class="table-scroll" id="sql-results-scroll" role="region" aria-label="Resultados da consulta"><table aria-label="Resultados da consulta SQL" id="sql-results" class="spreadsheet-table modern-table"><thead></thead><tbody></tbody></table></div>
    </section>
    <section class="retro-card lab-panel">
      <h3 class="lab-panel-title">Visualização <small id="sql-chart-label">—</small></h3>
      <div id="sql-chart" class="chart-host" role="img" aria-label="Gráfico gerado a partir do SELECT"></div>
    </section>
  </div>
  <p id="sql-display-note" class="footnote"></p>
</div>`,
  ];
  let lessonNotes = [];
  /* Continuação do roteiro: pergunta → indicador → dados → ferramenta → validação. */
  (function () {
    'use strict';
    const original = deckSlides;
    const slides = original.slice(0, 6);
    const notes = [
      'Antes de falar de ferramentas, vamos combinar uma coisa: não basta receber uma resposta bonita. Precisamos saber o que perguntar e como conferir. Uma IA pode ajudar, mas a decisão sobre o que investigar começa em vocês. O que tornaria uma pergunta importante para alguém?',
      'Boa noite. Somos estudantes do 8º semestre de Engenharia de Computação. Estudamos no período noturno. Somos quatro apresentadores e quatro auxiliares. A mesma oficina acontece por inteiro em cada turma, com três horas de duração. Hoje vamos formular perguntas, explorar uma base fictícia, usar ferramentas e conferir o que descobrimos.',
      'Afinal, o que são dados? Espere as respostas. Uma pintura, um texto como a Bíblia e uma sequência de memes podem ser analisados? Sim: podemos observar cores, palavras, temas, datas e padrões. Isso não significa que já estejam organizados em uma tabela. O número 100, sozinho, diz pouco. Cem unidades vendidas em junho já trazem contexto. É assim que começamos a transformar registros em informação.',
      'Uma planilha organiza dados em linhas e colunas. Imagens e textos livres exigem outra preparação. Um JSON com campos definidos e estrutura variável é um exemplo de dado semiestruturado. Nenhum formato garante qualidade por si só. Hoje vamos trabalhar com dados estruturados porque conseguimos enxergar o registro, calcular e conferir. Vamos conhecer o monstrinho aos poucos.',
      'Os quatro tipos de análise ajudam a escolher a pergunta. Descritiva: o que aconteceu? Diagnóstica: que explicações precisamos investigar? Preditiva: o que pode acontecer, com qual incerteza? Prescritiva: que ação faz sentido considerando objetivo e restrições? Uma tabela de vendas pode descrever variações; sozinha, ela pode não explicar as causas nem sustentar uma previsão.',
      'Conte a história do relacionamento e espere a turma classificar os tipos de pergunta. Separe fatos, hipóteses, possibilidades e decisões. Falta de atenção pode ser uma hipótese; não é causa comprovada. A história é uma analogia, não uma amostra estatística. Pergunte: onde terminam as observações e começam nossas interpretações? Essa distinção também vale para vendas e para respostas de IA.',
    ];
    const add = (html, note) => {
      slides.push(html);
      notes.push(note);
    };

    add(
      slide(
        'Antes da ferramenta: o que queremos entender?',
        'A Loja Horizonte quer acompanhar a variação da receita e planejar o próximo período.',
        grid(
          card(
            'Situação',
            'A receita muda de um mês para outro. Primeiro precisamos descrever essa mudança.',
          ),
          card(
            'Quem usa a resposta?',
            'A gestão da loja, para orientar a investigação e o planejamento.',
          ),
        ) +
          prompt('Se vocês fossem responsáveis pela loja, o que gostariam de descobrir primeiro?'),
      ),
      'Bom, tudo precisa começar de algum lugar, não é? Imaginem que a gestão da Loja Horizonte pediu ajuda para entender a variação da receita. Antes de abrir uma IA, o que precisamos saber? Quem vai usar a resposta? Para qual decisão? Não vou afirmar que a loja perdeu clientes ou que uma campanha falhou: a base não prova isso. Primeiro vamos descobrir o que aconteceu com a receita. Espere as sugestões e anote uma pergunta da turma.',
    );

    add(
      slide(
        '“Como estão as vendas?” Vamos melhorar isso.',
        'Uma pergunta útil deixa claro o que medir, em qual período e com qual comparação.',
        grid(
          card(
            'Ponto de partida',
            '“Como estão as vendas?” Vendas significa pedidos, unidades ou dinheiro?',
          ),
          card(
            'Pergunta que podemos verificar',
            '“Qual foi a receita após descontos por mês, de maio a outubro de 2026?”',
          ),
        ) +
          prompt(
            'Escrevam três perguntas. A base tem as informações necessárias para respondê-las?',
          ),
      ),
      'Como estão as vendas? Se eu responder que estão boas, vocês conseguem conferir? Boas em relação a quê? Vamos delimitar: receita após descontos, por mês, de maio a outubro de 2026. Agora sabemos o indicador, o período e a comparação. Depois podemos perguntar em qual intervalo houve a maior queda. Peça três perguntas a cada participante, antes de usar IA. Uma pergunta pode ser relevante e ainda exigir dados que não temos. “Por que o cliente desistiu?” exigiria outras fontes.',
    );

    add(
      slide(
        'O que vamos medir para responder?',
        'Indicador é uma medida que ajuda a acompanhar ou avaliar uma situação.',
        grid(
          card('Pergunta', 'Qual foi a receita após descontos em junho?'),
          card(
            'Indicador',
            'Soma da receita dos registros de junho. Unidade: reais. Período: junho de 2026.',
          ),
          card(
            'Campo da base',
            'Receita_após_desconto_R$ fornece os valores. Mês permite selecionar junho.',
          ),
          card(
            'Cuidado com a interpretação',
            'Registros, unidades, faturamento, receita e lucro bruto medem coisas diferentes.',
          ),
        ) +
          prompt(
            'Uma loja pode vender mais unidades e ter menos lucro bruto? O que precisaríamos comparar?',
          ),
      ),
      'Uma pergunta não é uma coluna, e uma coluna não é automaticamente um indicador. O campo traz um valor por registro. O indicador pode somar esses valores para um período. Mais pedidos não garante maior receita: o valor e o desconto podem mudar. A margem agregada é lucro bruto dividido pela receita, e não a soma das margens das linhas. O lucro bruto simplificado também não desconta aluguel, salários e outras despesas. Portanto, não vamos chamá-lo de lucro líquido.',
    );

    const sample = window.SALES_DATA.slice(0, 3)
      .map(
        (r) =>
          `<tr><td>${escape(r.id_pedido)}</td><td>${escape(r.mes)}</td><td>${escape(r.produto)}</td><td>${r.quantidade}</td><td>${r.receita.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td></tr>`,
      )
      .join('');
    add(
      slide(
        'Conhecendo o monstrinho, sem pressa.',
        '475 registros fictícios da Loja Horizonte · maio a outubro de 2026.',
        `<div class="retro-card lesson-card"><div class="table-scroll"><table class="spreadsheet-table"><thead><tr><th>Pedido</th><th>Mês</th><th>Produto</th><th>Unidades</th><th>Receita (R$)</th></tr></thead><tbody>${sample}</tbody></table></div><p class="footnote">Amostra real do CSV fictício do curso. No arquivo completo, há 16 colunas.</p></div>` +
          grid(
            card('Linha', 'Um registro de venda. Confira o identificador antes de contar pedidos.'),
            card(
              'Coluna',
              'Um atributo: data, categoria, quantidade, receita… Cada campo tem um significado.',
            ),
          ),
      ),
      'Use a planilha enviada aos alunos. Não se assustem com o monstrinho: vamos entender uma parte de cada vez. O que representa cada linha? E cada coluna? Temos 475 registros com identificadores distintos nesta base. Quantidade é o número de unidades da linha, não o número de registros. Peça que encontrem data, categoria e receita após descontos. Há campos vazios, valores inesperados ou repetições? Antes de remover uma linha, é preciso entender o que ela representa. As linhas mostradas aqui vêm da própria base fictícia.',
    );

    add(
      original[6],
      'Agora filtrem uma categoria. Antes de mudar, façam uma previsão: quais indicadores devem mudar? Observe registros, unidades, receita e lucro bruto. O gráfico resume toda a seleção por mês; a tabela mostra apenas uma amostra, e isso está indicado. Se eu disser que Informática é a melhor categoria, melhor em quê? Receita? Lucro bruto? Quantidade? Peça uma descrição baseada no que aparece. Se alguém sugerir uma causa, trate como hipótese a investigar.',
    );

    add(
      slide(
        'A pergunta continua sendo nossa.',
        'Primeiro decidimos o que queremos descobrir. Depois aprendemos a expressar essa pergunta na ferramenta.',
        grid(
          card(
            'Planilha',
            'Inspecionar registros, filtrar, somar, montar tabela-resumo e conferir valores.',
          ),
          card(
            'IA',
            'Ajudar a formular perguntas, explicar campos, sugerir consultas e discutir limitações.',
          ),
          card(
            'SQL',
            'Escrever quais informações queremos consultar, de onde elas vêm e quais filtros aplicar.',
          ),
          card(
            'Gráfico',
            'Representar o resultado com indicador, unidade, período e origem claros.',
          ),
        ) +
          prompt(
            'Se uma ferramenta entregar um gráfico bonito, como vocês saberão se ele está correto?',
          ),
      ),
      'Primeiro decidimos o que queremos descobrir. Depois aprendemos a expressar essa pergunta na ferramenta. Retome uma pergunta da turma sobre a Loja Horizonte e peça que expliquem quais informações seriam necessárias para respondê-la. Só depois discutam como a planilha, a IA ou o SQL podem ajudar nesse caminho. Não precisamos dominar várias ferramentas hoje. Uma IA pode explicar um campo e sugerir uma consulta, mas também pode errar ou não conseguir calcular com segurança. Na planilha conseguimos conferir fórmulas e filtros. No laboratório, executamos a consulta e construímos o gráfico a partir do resultado.',
    );

    add(
      slide(
        'Agora é com vocês: abram a base.',
        'Em duplas, uma pessoa opera e a outra confere. Depois, troquem os papéis.',
        grid(
          card(
            '1 · Google Planilhas',
            'Em uma planilha vazia, usem localidade Estados Unidos para ler o ponto decimal. Arquivo → Importar → Upload: enviem o CSV com separador ;. Confiram 16 colunas e 475 registros; renomeiem a aba Vendas.',
          ),
          card(
            '2 · NotebookLM',
            'No navegador, criem um notebook, escolham Adicionar fontes e enviem o CSV. Esperem processar e abram a fonte para conferir cabeçalhos e registros.',
          ),
        ) +
          `<p class="lesson-links"><a href="https://sheets.google.com" target="_blank" rel="noopener noreferrer">ABRIR PLANILHAS ↗</a><a href="https://notebooklm.google.com" target="_blank" rel="noopener noreferrer">ABRIR NOTEBOOKLM ↗</a></p>` +
          prompt('Antes de abrir o chat, escrevam a pergunta que querem investigar.'),
      ),
      'Agora vamos usar as ferramentas de verdade, juntos. Primeiro eu mostro como abrir a base, depois cada dupla repete. O CSV usa ponto decimal, como 84.9. Em uma planilha vazia, definam localidade Estados Unidos em Arquivo, Configurações antes de importar; depois importem o CSV com ponto e vírgula como separador e conversão de textos em números habilitada. Confiram 16 colunas, números reconhecidos e 475 registros mais o cabeçalho. Renomeiem a aba Vendas; o intervalo é A1:P476. Depois da importação numérica correta, podem mudar a localidade para Brasil e formatar os valores em reais. Confiram que Mês identifica as seis competências. Usaremos o CSV em toda a prática, pois o XLSX original contém fórmulas com precisão diferente: sua soma não coincide centavo a centavo com o CSV. O XLSX fica como apoio preservado. No NotebookLM, pelo navegador, criem um notebook e adicionem o mesmo CSV. Não confundam ler a fonte com já ter calculado tudo. Se faltar acesso à IA, sigam pela planilha.',
    );

    add(
      slide(
        'Cole o prompt. Depois, questione a resposta.',
        'Adaptem a pergunta escrita por vocês. Este exemplo mantém a receita mensal como fio da aula.',
        `<label class="sql-label" for="activity-prompt">PROMPT PARA USAR COM A FONTE JÁ ADICIONADA</label><textarea id="activity-prompt" class="activity-prompt" readonly spellcheck="false">${escape(window.CourseActivities.prompts.analise)}</textarea><div class="activity-actions"><button id="copy-activity-prompt" type="button" class="retro-btn">COPIAR PROMPT</button><span id="activity-copy-status" role="status" aria-live="polite">Selecionem e copiem o texto, ou usem o botão.</span></div>` +
          prompt(
            'A resposta citou os campos certos? Ela explicou algo que vocês conseguem conferir?',
          ),
      ),
      'O prompt está na tela para vocês usarem. Copiem o texto e colem na conversa com a fonte selecionada. Antes de enviar, leiam a pergunta: ela é a que a dupla quer investigar? O exemplo é a receita mensal, mas na prática autônoma vocês adaptarão o indicador e o recorte. Um bom prompt ajuda a tornar o pedido claro; ele não garante uma resposta correta. Peçam a explicação, confrontem os campos e anotem uma afirmação que possa ser verificada. Se o NotebookLM devolver totais, não os aceitem apenas pela confiança do texto ou pela presença de uma citação: reproduzam o cálculo na planilha.',
    );

    add(
      slide(
        'Vamos construir a resposta no Google Planilhas.',
        'Usem a aba Vendas criada com o CSV. O guia do aluno detalha os cliques.',
        grid(
          card(
            '1 · Escolher a fonte',
            'Selecionem Vendas!A1:P476. Confiram que há 16 colunas e 475 registros, além do cabeçalho.',
          ),
          card(
            '2 · Resumir',
            'Inserir → Tabela dinâmica → Nova página. Linhas: Mês. Valores: Receita_após_desconto_R$, resumida por SOMA.',
          ),
          card(
            '3 · Representar',
            'Ordenem os meses de forma crescente. Selecionem os seis meses e as receitas, sem Total geral; Inserir → Gráfico → Colunas.',
          ),
          card(
            '4 · Conferir',
            'Confiram um mês na origem e a soma das seis receitas. Título: Receita após descontos por mês (R$).',
          ),
        ) +
          prompt(
            'Se a planilha contar as células em vez de somar reais, que tipo de valor foi importado?',
          ),
      ),
      'Eu faço a primeira etapa no projetor e vocês fazem junto. Selecionem a aba Vendas, intervalo A1:P476. Inserir, Tabela dinâmica, Nova página. Em Linhas, adicionem Mês. Em Valores, adicionem Receita_após_desconto_R$ e escolham SOMA. Confiram o total e os seis meses em ordem crescente. Para o gráfico, selecionem somente as seis linhas mensais e o cabeçalho, sem a linha de total geral: ela não é um sétimo mês. Inserir, Gráfico, e escolham colunas. O título e a unidade precisam identificar receita após descontos em reais. Se aparecer contagem ou zeros inesperados, confiram se os números foram importados como texto. A importação deve respeitar o ponto decimal do CSV; a exibição em reais pode ser configurada depois. Não contornem um erro de importação mudando os dados.',
    );

    add(
      slide(
        'A ferramenta respondeu. Agora é a nossa vez.',
        'Guardem pergunta, tabela, gráfico, um valor conferido e uma limitação.',
        grid(
          card(
            'Descrever e investigar',
            'O gráfico mostra o que aconteceu. Quais categorias ou canais contribuíram para a variação? Isso ajuda a localizar diferenças, sem provar uma causa.',
          ),
          card(
            'Estimar e decidir',
            'Prever o mês seguinte exige método e incerteza. Recomendar investimento exige objetivo, orçamento, estoque e demanda: o que falta na base?',
          ),
        ) +
          prompt(
            '“A receita caiu porque houve menos clientes.” A base identifica clientes ou apenas registros de venda?',
          ),
      ),
      'Este é o momento de voltar aos fundamentos. Qual foi a receita por mês é uma pergunta descritiva. Quais categorias contribuíram para a mudança ajuda a investigar a diferença, mas não comprova por que alguém comprou menos. Não temos identificação de clientes, visitas nem motivos de compra nesta base. Se alguém prevê novembro com certeza, que método e evidências usou? Se recomenda investir em uma categoria, qual objetivo e quais restrições considerou? Os modelos são um mapa de perguntas e limites, não quatro respostas obrigatórias. Peça a cada dupla que explique uma observação e uma dúvida que ainda tem. Agora vamos expressar a mesma pergunta em SQL; mudamos a ferramenta e mantemos o indicador e a conferência.',
    );

    add(
      slide(
        'O que é SQL, afinal?',
        'SQL significa Structured Query Language: linguagem de consulta estruturada.',
        grid(
          card(
            'Uma forma de fazer um pedido',
            'Em vez de clicar em filtros, escrevemos uma instrução que o banco consegue interpretar.',
          ),
          card(
            'A tabela é a nossa fonte',
            'Aqui, a tabela vendas foi criada a partir da base fictícia. Cada coluna tem um nome.',
          ),
        ) +
          code('SELECT produto, receita\nFROM vendas\nLIMIT 5;') +
          prompt(
            'Lendo em português: mostre produto e receita, da tabela vendas, em até cinco linhas.',
          ),
      ),
      'Até agora vocês perguntaram em português e exploraram uma planilha. SQL é outra forma de expressar uma pergunta, com uma estrutura que o mecanismo de banco entende. Ele não é uma IA, e o banco não adivinha o que quisemos dizer. SELECT produto, receita escolhe as informações que queremos ver. FROM vendas aponta a origem. LIMIT 5 limita a saída a cinco linhas para conhecermos a tabela. Este é um exemplo de exploração; para responder à receita mensal, precisaremos resumir os dados.',
    );

    add(
      slide(
        'SELECT é o único comando que existe?',
        'Não. SQL também permite criar estruturas e modificar registros. Nosso foco é consultar.',
        grid(
          card(
            'SELECT · consultar',
            'Retorna dados e cálculos. Pode selecionar colunas, filtrar linhas, contar, somar e agrupar.',
          ),
          card(
            'Outros comandos · conhecer o papel',
            'CREATE cria estruturas; INSERT inclui registros; UPDATE altera; DELETE remove. Não serão executados nesta oficina.',
          ),
        ) +
          prompt(
            'FROM e WHERE são partes da consulta SELECT: origem e condição. Não são três consultas separadas.',
          ),
      ),
      'SELECT é o comando que usaremos para consultar. Isso não significa que SQL só tenha esse comando, nem que toda consulta precise ter a mesma forma. Podemos combinar consultas, juntar tabelas e usar outros recursos, mas isso fica para outro momento. Hoje precisamos entender uma estrutura simples. FROM e WHERE são cláusulas, isto é, partes da instrução. Vamos ler como uma frase, sem decorar uma lista de palavras. Este laboratório aceita uma consulta iniciada por SELECT de cada vez e mantém a base em modo de leitura.',
    );

    add(
      slide(
        'Vamos procurar maçãs na geladeira?',
        'Pensem na geladeira como uma tabela organizada em registros e campos.',
        grid(
          card(
            'SELECT nome, quantidade',
            'O que quero ver na resposta? Nome e quantidade dos itens.',
          ),
          card('FROM geladeira', 'De onde vêm os registros? Da tabela geladeira.'),
          card(
            "WHERE tipo = 'fruta' AND nome = 'maçã'",
            'Quais registros entram? Apenas as frutas cujo nome é maçã.',
          ),
        ) +
          code("SELECT nome, quantidade\nFROM geladeira\nWHERE tipo = 'fruta' AND nome = 'maçã';") +
          `<p class="footnote">Analogia conceitual: geladeira não é uma tabela disponível no laboratório de vendas.</p>`,
      ),
      'Gostei da ideia de buscar maçãs na geladeira. Vamos torná-la mais precisa. Imaginem que cada item tem nome, tipo e quantidade. Quero saber o nome e a quantidade das maçãs: isso fica no SELECT. Vou olhar na geladeira: isso fica no FROM. Quero somente itens do tipo fruta e de nome maçã: essas duas condições ficam no WHERE, ligadas por AND. O SELECT escolhe as colunas da resposta; ele não é apenas o verbo genérico buscar. Sem WHERE, aparecem todos os registros da origem, respeitando as outras partes da consulta. Aqui a geladeira é só uma analogia, não uma nova base de vendas.',
    );

    add(
      slide(
        'Da geladeira para a nossa tabela.',
        '“Quero ver o produto, a quantidade e a receita de algumas vendas.”',
        code('SELECT produto, quantidade, receita\nFROM vendas\nLIMIT 5;') +
          grid(
            card(
              'SELECT · o que retornar',
              'Os nomes separados por vírgulas são colunas da resposta.',
            ),
            card(
              'FROM · de onde',
              'vendas é a tabela. LIMIT 5 ajuda a observar uma pequena amostra.',
            ),
          ) +
          prompt('Antes de executar: quantas colunas esperamos? E no máximo quantas linhas?'),
      ),
      'Vamos traduzir juntos. Quais informações precisamos ver? Produto, quantidade e receita. De onde? Da tabela vendas. Quantas linhas vamos observar agora? Até cinco. São três colunas e no máximo cinco linhas. Não estamos somando nada ainda: a receita continua sendo a de cada registro. O asterisco em SELECT * pede todas as colunas; pode servir para reconhecer uma tabela, mas aqui escolhemos os campos para manter a pergunta clara. Sem ORDER BY, não há garantia de quais cinco registros serão mostrados.',
    );

    add(
      slide(
        'E se eu quiser somente Informática?',
        'Agora a pergunta ganhou uma condição. É aqui que entra WHERE.',
        code(
          "SELECT mes, produto, receita\nFROM vendas\nWHERE categoria = 'Informática'\nLIMIT 10;",
        ) +
          grid(
            card(
              'Filtro de linhas',
              'WHERE mantém somente os registros cuja categoria é Informática.',
            ),
            card(
              'Colunas da resposta',
              'Categoria pode filtrar mesmo sem aparecer no SELECT. Textos usam aspas simples.',
            ),
          ) +
          prompt('O que muda se retirarmos WHERE? E se o texto do filtro não existir na base?'),
      ),
      'O WHERE funciona como o filtro da planilha: ele decide quais linhas entram na análise. Reparem que categoria não está no SELECT e mesmo assim pode ser usada na condição. Se retirarmos o WHERE, outras categorias podem aparecer. Se digitarmos uma categoria que não existe, a saída fica vazia; isso não significa automaticamente erro do banco. AND exige que duas condições sejam verdadeiras. Por exemplo, podemos restringir Informática e um mês específico. Uma consulta pode executar corretamente e ainda estar respondendo à pergunta errada.',
    );

    add(
      slide(
        'Contar registros ou somar unidades?',
        'Cada linha é um registro de venda. O pedido PED-202605-0057, por exemplo, tem três unidades de Hub USB.',
        code(
          'SELECT COUNT(*) AS registros,\n       SUM(quantidade) AS unidades,\n       ROUND(SUM(receita), 2) AS receita_total\nFROM vendas;',
        ) +
          grid(
            card(
              'COUNT(*) → 475 registros',
              'Conta linhas. Nesta base, os identificadores dos registros são distintos.',
            ),
            card(
              'SUM(quantidade) → 909 unidades',
              'Soma as unidades vendidas. Uma linha pode conter mais de uma unidade.',
            ),
          ) +
          `<p class="lesson-aside">AS dá um nome à coluna de resultado. ROUND(..., 2) arredonda a apresentação para duas casas.</p>` +
          sqlExercise('contagem', 'Retorne uma linha com duas colunas: número de registros e total de unidades, nessa ordem.', 'Use COUNT(*) e SUM(quantidade) na tabela vendas.'),
      ),
      'Agora vamos produzir indicadores, em vez de listar vendas. COUNT(*) conta as linhas; SUM soma valores de uma coluna. Por que 475 registros não viram 475 unidades? Porque uma venda pode ter duas, três ou mais unidades. A base soma 909. A soma de receita dá R$ 52.841,96. AS é apenas o nome que vamos dar ao resultado, não altera a conta. ROUND com 2 deixa o resultado em duas casas decimais. Pergunte: se eu colocar um WHERE antes do ponto e vírgula, estaremos calculando o total de toda a loja ou do recorte?',
    );

    add(
      slide(
        'Uma soma para cada mês.',
        '“Qual foi a receita após descontos por mês, de maio a outubro de 2026?”',
        code(
          'SELECT mes, ROUND(SUM(receita), 2) AS receita_total\nFROM vendas\nGROUP BY mes\nORDER BY mes;',
        ) +
          grid(
            card(
              'GROUP BY mes',
              'Separa os registros em grupos de mês. SUM calcula dentro de cada grupo.',
            ),
            card(
              'ORDER BY mes',
              'Organiza a resposta no tempo. Para ranking, podemos ordenar o indicador com DESC.',
            ),
          ) +
          prompt('A base tem seis meses. Quantas linhas esperamos na tabela-resumo?'),
      ),
      'Sem GROUP BY, a soma retorna um total para toda a seleção. Com GROUP BY mes, cada mês vira um grupo e recebe sua própria soma. Esperamos seis linhas, uma por mês. ORDER BY mes coloca os meses na sequência, necessária para ler a evolução no tempo. Se a pergunta fosse um ranking de categorias, poderíamos agrupar por categoria e ordenar por receita_total DESC. ORDER BY ordena; ele não filtra nem altera a soma. WHERE, quando usado, vem antes de GROUP BY e restringe as linhas que serão agrupadas.',
    );

    add(
      slide(
        'O que esperamos encontrar na saída?',
        'Prever o formato da resposta ajuda a perceber erros.',
        grid(
          card(
            'Pergunta e indicador',
            'Receita após descontos por mês. Unidade: reais. Seis meses na base.',
          ),
          card(
            'Tabela esperada',
            'Duas colunas: mes e receita_total. Seis linhas, ordenadas de maio a outubro.',
          ),
          card(
            'Gráfico esperado',
            'Mês no eixo horizontal e receita no eixo vertical. Uma coluna para cada mês.',
          ),
          card(
            'Conferência',
            'Somar as seis receitas mensais e comparar com a soma de receita no CSV.',
          ),
        ) +
          prompt(
            'Se aparecerem 475 linhas ou um gráfico de quantidade, ele responde à pergunta original?',
          ),
      ),
      'Ainda sem executar: descrevam a resposta que faria sentido. Se queremos o total por mês, não esperamos uma linha por venda. A tabela-resumo precisa vir antes do gráfico para que possamos conferir. Uma linha ou colunas podem ajudar a comparar os meses; aqui usaremos colunas. No laboratório, escolham explicitamente a categoria, o indicador e a unidade. Se a consulta trouxer pedidos e receita, são duas medidas diferentes. O gráfico não decide sozinho qual responde à pergunta.',
    );

    add(
      original[7],
      'Vamos testar uma pergunta de cada vez. Comece em Ver registros, passe pelo filtro, conte e some, e só depois agrupe por mês. Antes de clicar em Executar, peça que alguém traduza a consulta em português. Ao digitar parte de um comando ou nome de coluna, o editor mostra sugestões. Clique numa opção ou selecione-a com as setas e pressione Enter. Abra Tabelas e colunas para consultar o esquema completo. Ctrl+Enter executa a consulta. Escolha a coluna de categoria, o indicador e a unidade do gráfico. Uma consulta só numérica, como COUNT(*), pode ser lida na tabela sem precisar de um gráfico. Se houver erro, leia a mensagem, confira os campos e tente novamente. Se a preparação do mecanismo falhar, use Tentar novamente. Todos os cálculos são do SQLite local.',
    );

    add(
      slide(
        'A mesma pergunta por caminhos diferentes.',
        'Em duplas, escolham uma das perguntas que vocês escreveram.',
        grid(
          card(
            '1 · Planejar · 5 min',
            'Definam pergunta, período, indicador e colunas necessárias.',
          ),
          card(
            '2 · Investigar · 15 min',
            'Adaptem o prompt e repitam o caminho com outra pergunta: IA para orientar, planilha para calcular e conferir. Se faltar acesso à IA, registrem isso e prossigam na planilha.',
          ),
          card(
            '3 · Representar · 10 min',
            'Criem um gráfico. Quem quiser pode executar também a consulta SQL e comparar.',
          ),
          card(
            '4 · Conferir · 5 min',
            'Comparem ao menos um valor com a fonte e registrem uma limitação.',
          ),
        ) +
          prompt('Os auxiliares ajudam com o caminho. A pergunta e a interpretação são de vocês.'),
      ),
      'Agora vocês fazem com mais autonomia. Reservem 35 minutos para escolher outra pergunta, adaptar o prompt e repetir o caminho que já praticamos. Uma dupla pode investigar uma categoria ou um canal, desde que saiba definir o indicador e o recorte. Troquem quem opera a ferramenta e quem confere. Guardem a pergunta, a resposta da IA quando disponível, a tabela calculada, o gráfico e um valor confrontado com a origem. Se quiserem comparar com SQL, o segundo prompt do material enviado contém os nomes reais da tabela vendas. Não precisam dominar todas as ferramentas: precisam explicar e conferir o caminho escolhido. Os auxiliares fazem perguntas e ajudam nos obstáculos sem entregar a conclusão.',
    );

    add(
      slide(
        'Um resultado bonito ainda precisa de conferência.',
        'Voltem à pergunta e expliquem de onde veio cada número.',
        grid(
          card(
            'Base completa',
            '475 registros · 909 unidades. Não confundam contagem de linhas com soma de quantidade.',
          ),
          card('Receita após descontos', 'Total: R$ 52.841,96. Junho de 2026: R$ 7.022,65.'),
          card(
            'Interpretação',
            'Uma queda de receita descreve uma mudança. A causa exige outras evidências.',
          ),
          card(
            'Verificação prática',
            'Confiram filtro, fórmula, unidade, período e um valor na planilha original.',
          ),
        ) +
          prompt(
            'O que faria vocês desconfiarem da resposta, mesmo que ela tenha sido gerada por IA?',
          ),
      ),
      'Confiram junho: R$ 7.022,65 de receita após descontos. A soma de todos os meses é R$ 52.841,96, calculada independentemente no CSV. Se os valores não batem, não escolham o que parece mais convincente: investiguem o recorte, o campo e a fórmula. Estão somando faturamento bruto ou receita após desconto? Contando registros ou unidades? O gráfico está mostrando a tabela completa ou uma amostra? Uma queda pode indicar um intervalo a investigar, mas não prova que houve menos clientes ou que o preço causou a mudança.',
    );

    add(
      slide(
        'Qual pergunta vocês conseguem defender agora?',
        'Cada dupla apresenta sua pergunta, o gráfico e uma conclusão verificável.',
        grid(
          card(
            'Expliquem o caminho',
            'Qual foi a pergunta? Por que esse indicador? Quais dados e filtros foram usados?',
          ),
          card(
            'Sustentem a conclusão',
            'Mostrem um número conferido, indiquem uma limitação e proponham uma próxima pergunta.',
          ),
        ) +
          prompt(
            'Ferramentas ajudam a responder. Fazer boas perguntas e validar continua sendo nosso trabalho.',
          ),
      ),
      'Convide as duplas a apresentar em falas curtas. Não avalie apenas se produziram um gráfico: pergunte por que escolheram esse indicador, como calcularam e por que confiam no resultado. A conclusão deve citar um número e seu contexto. Se houver incerteza, é válido dizer o que ainda não sabemos. Retome a frase inicial: a habilidade que treinamos foi transformar uma dúvida em uma pergunta verificável. SQL, planilha e IA são caminhos que podemos usar com esse raciocínio como base.',
    );

    deckSlides = slides;
    lessonNotes = notes;
  })();

  function sqlSchema(editorId) {
    return `<details class="sql-schema" data-sql-schema="${editorId}"><summary>Tabelas e colunas</summary></details>`;
  }

  function sqlExercise(key, question, hint) {
    return `<details class="retro-card sql-exercise">
      <summary>Praticar no editor SQL</summary>
      <form data-sql-exercise="${key}">
        <p id="exercise-${key}-question">${question}</p>
        <div class="exercise-workspace">
          <div class="exercise-input">
            <label for="exercise-${key}">Consulta SQL</label>
            <textarea id="exercise-${key}" class="sql-editor" required spellcheck="false" autocomplete="off" autocapitalize="off" aria-describedby="exercise-${key}-question" placeholder="SELECT …"></textarea>
            <button class="retro-btn" type="submit">Executar SQL</button>
            ${sqlSchema(`exercise-${key}`)}
            <details><summary>Ver dica</summary><p>${hint}</p></details>
          </div>
          <div class="exercise-output">
            <p role="status" class="exercise-status">Execute uma consulta para ver o resultado.</p>
            <div class="table-scroll exercise-results" role="region" aria-label="Resultado do exercício" hidden>
              <table class="spreadsheet-table modern-table" aria-label="Resultado do exercício SQL"><thead></thead><tbody></tbody></table>
            </div>
          </div>
        </div>
      </form>
    </details>`;
  }

  /* Caso e verificações de aprendizagem. */
  {
    const money = (value) => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    const monthly = (month) =>
      window.SALES_DATA.filter((row) => row.mes === month).reduce(
        (sum, row) => sum + Math.round(row.receita * 100),
        0,
      ) / 100;
    const may = monthly('2026-05'),
      june = monthly('2026-06');
    const percent = (((may - june) / may) * 100).toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    const checks = {
      analysis: {
        title: 'Que tipo de pergunta estamos fazendo?',
        question: `A receita foi de ${money(may)} em maio para ${money(june)} em junho. Queremos investigar possíveis explicações para a mudança. Qual é o foco dessa pergunta?`,
        choices: [
          ['descritiva', 'Descritiva'],
          ['diagnostica', 'Diagnóstica'],
          ['preditiva', 'Preditiva'],
          ['prescritiva', 'Prescritiva'],
        ],
        correct: 'diagnostica',
        explanation:
          'O foco é diagnóstico: investigar possíveis explicações. Os totais descrevem a mudança; eles não comprovam sua causa. Podemos começar decompondo a diferença por categoria ou canal e depois procurar outras evidências.',
      },
      indicator: {
        title: 'Qual medida responde à pergunta?',
        question:
          'A gerência quer a receita após descontos em junho. Qual indicador devemos calcular nos registros desse mês?',
        choices: [
          ['registros', 'Contar os registros'],
          ['receita', 'Somar Receita_após_desconto_R$'],
          ['unidades', 'Somar Quantidade'],
          ['margens', 'Somar as margens de cada linha'],
        ],
        correct: 'receita',
        explanation:
          'Precisamos somar a receita após descontos do recorte de junho. Contagem mede registros; quantidade mede unidades. A soma das margens das linhas não é a margem agregada da loja.',
      },
      select: {
        title: 'O que SELECT escolhe nesta consulta?',
        question:
          'Em SELECT produto, receita FROM vendas LIMIT 5;, o que produto e receita determinam?',
        choices: [
          ['colunas', 'As colunas que aparecem na resposta'],
          ['filtro', 'Quais categorias de produto entram'],
          ['tabela', 'A tabela onde buscar os dados'],
        ],
        correct: 'colunas',
        explanation:
          'SELECT escolhe as colunas ou expressões do resultado. FROM aponta a origem; WHERE, quando presente, filtra os registros. LIMIT 5 limita a quantidade de linhas exibidas.',
      },
      chart: {
        title: 'O que os dois gráficos permitem concluir?',
        question:
          'O gráfico B faz a diferença parecer muito maior. Qual afirmação é sustentada pelos valores e pelas escalas?',
        choices: [
          ['escala', `A receita caiu ${percent}%; o eixo truncado amplia a impressão visual.`],
          ['clientes', 'A loja perdeu quase todos os clientes.'],
          ['causa', 'A mudança de canal de venda causou a queda.'],
        ],
        correct: 'escala',
        explanation: `A diferença é de ${money(may - june)}, uma queda de ${percent}% em relação a maio. Os valores são iguais nos dois gráficos, mas B começa em R$ 6.800. Não temos evidência sobre clientes distintos nem sobre a causa da queda. Para comparar magnitudes por comprimento de barras, uma base em zero torna a proporção mais clara.`,
      },
    };
    function checkpoint(key) {
      const item = checks[key];
      return slide(
        item.title,
        item.question,
        `<section class="checkpoint" data-check="${key}" data-correct="${item.correct}" data-explanation="${escape(item.explanation)}" aria-label="Verificação de aprendizagem"><p class="checkpoint-pace"><strong>30 segundos:</strong> pense individualmente. <strong>1 minuto:</strong> discuta com a pessoa ao lado. Depois, escolham e justifiquem.</p><div class="checkpoint-choices" role="group" aria-label="Alternativas">${item.choices.map(([value, label]) => `<button type="button" class="checkpoint-choice" data-choice="${value}" aria-pressed="false">${escape(label)}</button>`).join('')}</div><p class="checkpoint-feedback" data-check-feedback data-state="neutral" role="status" aria-live="polite">A explicação aparece depois da escolha. Ouçam também a justificativa de outra dupla.</p></section>`,
      );
    }
    function comparisonChart(baseline, label) {
      const max = 8000,
        plotHeight = 168,
        bottom = 200;
      const y = (value) => bottom - ((value - baseline) / (max - baseline)) * plotHeight;
      const ticks = [baseline, (baseline + max) / 2, max];
      return `<section class="retro-card scale-panel"><h3>${label}</h3><svg viewBox="0 0 520 264" role="img" aria-label="${label}: receita de maio e junho; eixo começa em ${baseline} reais" data-baseline="${baseline}" data-max="8000" data-plot-height="168"><title>${label} · mesmos valores de maio e junho</title>${ticks.map((value) => `<line x1="76" x2="500" y1="${y(value)}" y2="${y(value)}" stroke="#D8E2DC"/><text x="69" y="${y(value) + 4}" text-anchor="end" font-size="13" fill="#3D7A6E">${value.toLocaleString('pt-BR')}</text>`).join('')}${[
        [may, 'Maio', 145],
        [june, 'Junho', 335],
      ]
        .map(
          ([value, month, x]) =>
            `<rect data-value="${value}" x="${x}" y="${y(value)}" width="75" height="${bottom - y(value)}" fill="${month === 'Maio' ? '#3D7A6E' : '#E07A5F'}"><title>${month}: ${money(value)}</title></rect><text x="${x + 37.5}" y="${y(value) - 8}" text-anchor="middle" font-size="14" fill="#1D3532">${money(value)}</text><text x="${x + 37.5}" y="223" text-anchor="middle" font-size="14" fill="#1D3532">${month}</text>`,
        )
        .join(
          '',
        )}<line x1="76" x2="500" y1="200" y2="200" stroke="#1D3532"/><text x="260" y="251" text-anchor="middle" font-size="13" fill="#1D3532">Receita após descontos (R$) · base ${baseline.toLocaleString('pt-BR')}</text></svg></section>`;
    }

    const source = deckSlides,
      sourceNotes = lessonNotes,
      slides = [],
      notes = [];
    const add = (html, note) => {
      slides.push(html);
      notes.push(note);
    };
    const caseSlide = slide(
      'O que aconteceu na Loja Horizonte?',
      'Uma loja percebeu mudanças no desempenho das vendas em seis meses, de maio a outubro de 2026. A gerência quer entender o que aconteceu e decidir o que investigar primeiro.',
      `${grid(card('Nosso trabalho', 'Transformar a dúvida em perguntas, escolher indicadores e produzir uma resposta conferível.'), card('Nossa entrega', 'Um achado sustentado pelos registros, um valor conferido e uma próxima pergunta para a gerência.'))}${prompt('Que pergunta vocês fariam antes de recomendar qualquer mudança na loja?')}`,
    ).replace('<div ', '<div data-investigation-case ');
    const rubric = slide(
      'Conseguimos defender o raciocínio?',
      'A aparência do gráfico é apenas uma parte da comunicação. A dupla precisa explicar suas escolhas.',
      `<div class="retro-card lesson-card rubric-scroll"><table class="spreadsheet-table rubric-table" data-evaluation-rubric><thead><tr><th>Critério</th><th>O que precisamos observar</th><th>Evidência da dupla</th></tr></thead><tbody><tr><th>Pergunta</th><td>É específica e pode ser respondida pelos dados?</td><td>Medida, período, grupo e comparação definidos.</td></tr><tr><th>Indicador</th><td>Foi escolhido e calculado corretamente?</td><td>Campo, filtro, fórmula e um valor conferido.</td></tr><tr><th>Visualização</th><td>Representa a pergunta e o indicador?</td><td>Gráfico coerente, unidade, período e escala legíveis.</td></tr><tr><th>Interpretação</th><td>A conclusão é sustentada pelos resultados?</td><td>Um achado com número, uma limitação e a próxima investigação.</td></tr></tbody></table></div>${prompt('Se outra dupla contestar sua conclusão, qual evidência vocês mostrariam?')}`,
    );

    source.forEach((raw, index) => {
      let html = raw,
        note = sourceNotes[index];
      if (html.includes('AFINAL, O QUE SÃO DADOS?')) {
        html = html.replace(
          'Para a turma: Esses itens contêm dados?',
          'Um pedido da loja é um registro. Estes itens também contêm dados?',
        );
        note +=
          ' Retome o caso: uma receita em um registro é um dado; comparar as receitas mensais produz informação para a gerência. Peça um exemplo de cada um antes de avançar.';
      }
      if (html.includes('COMO OS DADOS SE ORGANIZAM?')) {
        const rows = window.SALES_DATA.slice(0, 3)
          .map(
            (row) =>
              `<tr><td>${escape(row.mes)}</td><td>${escape(row.produto)}</td><td>${money(row.receita)}</td></tr>`,
          )
          .join('');
        html = html.replace(
          /<table class="spreadsheet-table">[\s\S]*?<\/table>/,
          `<table class="spreadsheet-table"><thead><tr><th>Mês</th><th>Produto</th><th>Receita</th></tr></thead><tbody>${rows}</tbody></table>`,
        );
        note +=
          ' A tabela ilustrada usa três registros do CSV da Loja Horizonte. Conecte linhas, colunas e a pergunta da gerência à organização dos dados.';
      }
      if (html.includes('OS 4 MODELOS DE ANÁLISE DE DADOS'))
        note +=
          ' Volte à loja: qual foi a receita mensal? Que diferenças merecem investigação? O que precisaríamos para prever novembro? O que falta para recomendar uma decisão? Não exija quatro análises completas; use os modelos para reconhecer perguntas e limites.';
      if (html.includes('“Como estão as vendas?” Vamos melhorar isso.')) {
        html = html.replace(
          'Escrevam três perguntas. A base tem as informações necessárias para respondê-las?',
          'Eu reformulo uma pergunta. Nós melhoramos outra juntos. Depois, cada pessoa escreve três perguntas.',
        );
        note +=
          ' Faça a progressão explicitamente: demonstre a reformulação de “como estão as vendas?”. Depois peça que a turma melhore “qual é a melhor categoria?”, definindo melhor em qual indicador e período. Só então peça as três perguntas individuais. Os auxiliares conferem se elas cabem nas colunas disponíveis.';
      }
      if (html.includes('Qual pergunta vocês conseguem defender agora?')) {
        html = html
          .replace(
            'Qual pergunta vocês conseguem defender agora?',
            'O que recomendamos investigar primeiro?',
          )
          .replace(
            'Cada dupla apresenta sua pergunta, o gráfico e uma conclusão verificável.',
            'Entreguem à gerência um achado, sua evidência e a próxima investigação.',
          );
        note +=
          ' Feche o caso que abriu a aula: qual questão a gerência deve investigar primeiro, por quê e quais dados adicionais seriam necessários? O objetivo é investigar com evidência e avaliar a confiança da resposta, e não apenas gerar um gráfico com IA.';
      }
      if (html.includes('A mesma pergunta por caminhos diferentes.')) {
        html = html
          .replace('PRÁTICA · 35 MINUTOS', 'PRÁTICA · 30 MINUTOS')
          .replace('2 · Investigar · 15 min', '2 · Investigar · 10 min');
        note = note.replace('35 minutos', '30 minutos');
        add(
          rubric,
          'Apresente os critérios antes da atividade autônoma. Não pontue a decoração do gráfico: peça que a dupla explique a pergunta, o cálculo, a representação e a interpretação. Os auxiliares usam os quatro critérios durante a circulação. Se um critério ainda não tiver evidência, a dupla revisa essa parte antes de apresentar.',
        );
      }
      add(html, note);
      if (index === 1)
        add(
          caseSlide,
          'Apresente o problema antes dos conceitos. Não anuncie uma causa nem uma decisão pronta. Diga: a gerência da Loja Horizonte percebeu mudanças ao longo de seis meses e pediu ajuda para decidir o que investigar primeiro. Ouça duas ou três perguntas iniciais e anote-as para retomar no encerramento. Cada conceito e ferramenta da oficina deve nos ajudar a avançar nesta mesma investigação.',
        );
      const checkKey = html.includes('OS 4 MODELOS DE ANÁLISE DE DADOS')
        ? 'analysis'
        : html.includes('O que vamos medir para responder?')
          ? 'indicator'
          : html.includes('Da geladeira para a nossa tabela.')
            ? 'select'
            : null;
      if (checkKey)
        add(
          checkpoint(checkKey),
          `Faça uma pausa de 30 segundos para pensar individualmente e um minuto de discussão em dupla. Peça a justificativa antes de selecionar uma alternativa. O foco é identificar dificuldades durante a aula, não classificar as pessoas. ${checks[checkKey].explanation} Se houver muita dúvida, retome o exemplo e só depois avance.`,
        );
      if (html.includes('id="sql-editor"')) {
        add(
          slide(
            'Mesmos dados. Duas impressões visuais.',
            'Compare receitas de maio e junho de 2026. Observe onde começa o eixo vertical de cada gráfico.',
            `<div class="scale-demo" data-scale-demo>${comparisonChart(0, 'Gráfico A · eixo a partir de zero')}${comparisonChart(6800, 'Gráfico B · eixo começa em 6.800')}</div><p class="footnote">Fonte: soma de receita do CSV fictício da Loja Horizonte. Os valores são iguais nos dois gráficos; somente a escala vertical mudou.</p>${prompt('Em dupla: confira os totais no CSV ou no SQL, calcule a variação e explique o efeito da escala. Que dados ajudariam a investigar a causa?')}` + sqlExercise('meses', 'Retorne duas colunas, mês e receita após descontos, para maio e junho de 2026.', 'Filtre mes com IN e use SUM(receita) com GROUP BY mes.'),
          ),
          `Peça que a turma compare as duas representações antes de interpretar. Ambas mostram maio ${money(may)} e junho ${money(june)}, calculados da mesma coluna de receita do CSV. O gráfico B começa em R$6.800 e amplia a diferença visual. Não esconda essa origem: o exercício é ler o eixo e perceber que a mesma informação pode produzir impressões diferentes. Pergunte qual versão ajuda a comparar magnitudes e o que não podemos inferir sobre clientes ou causas. Reserve cinco minutos deste bloco para as duplas conferirem os totais no CSV ou na consulta Receita por mês. Peça a diferença em reais e a variação relativa a maio. Esperado: queda de R$ 663,59 (8,63%). Para investigar a hipótese de queda no número de clientes, peça identificadores anonimizados que permitam contar clientes distintos por mês. Retome a discussão no quiz seguinte.`,
        );
        add(
          checkpoint('chart'),
          `Repita 30 segundos de reflexão e um minuto de conversa. ${checks.chart.explanation} Relacione à IA: receber uma figura convincente não dispensa examinar a medida, os eixos e a origem dos números.`,
        );
      }
    });
    window.DECK_SLIDES = slides.map((html, i) =>
      html.replace(/\s+id="slide-\d+"/g, '').replace('<div ', `<div id="slide-${i + 1}" `),
    );
    window.LESSON_NOTES = notes;
  }
})();
