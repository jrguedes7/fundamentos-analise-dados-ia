/* SELECT sobre a base local. SQLite calcula; o navegador desenha o resultado. */
(function () {
  'use strict';
  const LIMIT = 20;
  const QUERY_LIMIT = 5000;
  const COMPLETION_LIMIT = 4;
  const SQL_WORDS = [
    'SELECT', 'DISTINCT', 'FROM', 'WHERE', 'AS', 'AND', 'OR', 'IN', 'LIKE',
    'GROUP BY', 'ORDER BY', 'HAVING', 'ASC', 'DESC', 'LIMIT',
    'COUNT', 'SUM', 'AVG', 'MIN', 'MAX', 'ROUND',
  ];
  const examples = {
    primeiras: 'SELECT produto, quantidade, receita\nFROM vendas\nLIMIT 5;',
    filtro: "SELECT mes, produto, receita\nFROM vendas\nWHERE categoria = 'Informática'\nLIMIT 10;",
    contagem: 'SELECT COUNT(*) AS registros, SUM(quantidade) AS unidades\nFROM vendas;',
    mensal:
      'SELECT mes, ROUND(SUM(receita), 2) AS receita_total\nFROM vendas\nGROUP BY mes\nORDER BY mes;',
    categoria:
      'SELECT categoria, ROUND(SUM(receita), 2) AS receita_total\nFROM vendas\nGROUP BY categoria\nORDER BY receita_total DESC;',
    canal: 'SELECT canal, COUNT(*) AS pedidos\nFROM vendas\nGROUP BY canal\nORDER BY pedidos DESC;',
  };
  let lastResult = null,
    executionGeneration = 0,
    executingGeneration = null;
  const el = (id) => document.getElementById(id);
  function status(text, error = false) {
    el('sql-status').textContent = text;
    el('sql-status').classList.toggle('status-error', error);
  }
  async function initSQL() {
    if (executionGeneration === 0) status('Preparando as consultas…');
    el('retry-sql').hidden = true;
    try {
      await window.CourseSqlEngine.prepare(window.SALES_DATA);
      if (executionGeneration === 0) status('Base pronta · 475 registros.');
    } catch (error) {
      el('retry-sql').hidden = false;
      if (executionGeneration === 0)
        status(error.message || 'Não foi possível preparar as consultas. Tente novamente.', true);
      throw error;
    }
  }
  function cancelPendingQuery() {
    if (executingGeneration === null) return;
    window.CourseSqlEngine.reset();
    executingGeneration = null;
  }
  function emptyChart(message) {
    el('sql-chart').replaceChildren();
    const p = document.createElement('p');
    p.className = 'chart-empty';
    p.textContent = message;
    el('sql-chart').append(p);
    el('sql-chart-label').textContent = '—';
  }
  function clearResult(message) {
    lastResult = null;
    el('sql-results-scroll').removeAttribute('tabindex');
    el('sql-results').querySelector('thead').replaceChildren();
    el('sql-results').querySelector('tbody').replaceChildren();
    el('sql-count').textContent = '—';
    el('sql-display-note').textContent = '';
    for (const id of ['sql-category', 'sql-value', 'sql-unit']) el(id).disabled = true;
    emptyChart(message);
  }
  function drawChart() {
    if (!lastResult) return;
    const { columns, values } = lastResult;
    const valueIdx = el('sql-value').value === '' ? -1 : Number(el('sql-value').value);
    const unit = el('sql-unit').value,
      format = window.CourseViz.formatValue;
    let shares = null,
      denominator = null,
      invalidShare = '';
    if (unit === 'share' && valueIdx >= 0) {
      const numbers = values.map((row) => row[valueIdx]).filter((value) => value !== null);
      denominator = numbers.reduce((sum, value) => sum + value, 0);
      if (numbers.some((value) => value < 0))
        invalidShare =
          'Participação no total requer valores não negativos. Use número ou reais para representar saldos.';
      else if (!Number.isFinite(denominator) || denominator <= 0)
        invalidShare =
          'Não há participação calculável: o total precisa ser positivo, maior que zero.';
      else
        shares = values.map((row) => (row[valueIdx] === null ? null : row[valueIdx] / denominator));
    }
    renderTable(columns, values, valueIdx, unit, shares);
    let note =
      values.length > LIMIT
        ? `Tabela e gráfico mostram as primeiras ${LIMIT} de ${values.length} linhas, na ordem da consulta.`
        : 'Fonte: base fictícia Loja Horizonte. Tabela e gráfico usam as mesmas linhas do resultado.';
    if (shares) {
      const totalUnit = metricKind(columns[valueIdx]) === 'currency' ? 'currency' : 'number';
      note += ` Participação = valor ÷ total de todas as ${values.length} linhas retornadas pelo SELECT (${format(denominator, totalUnit)}).`;
    } else if (unit === 'percent' && valueIdx >= 0)
      note += ' Taxa em fração: 0,25 é exibido como 25%. A taxa deve ser calculada na consulta.';
    el('sql-display-note').textContent = note;
    if (!values.length) {
      emptyChart('Nenhum registro encontrado com esse filtro. Experimente alterar o WHERE.');
      return;
    }
    if (invalidShare) {
      emptyChart(invalidShare);
      return;
    }
    if (valueIdx < 0) {
      emptyChart('A consulta não retornou uma coluna numérica para representar no gráfico.');
      return;
    }
    if (!el('sql-category').value) {
      emptyChart('Para comparar no gráfico, retorne também uma coluna de categoria na consulta.');
      return;
    }
    const labelIdx = Number(el('sql-category').value),
      plotUnit = unit === 'share' ? 'percent' : unit;
    const unitLabel = {
      currency: 'R$',
      count: 'contagem',
      number: 'número',
      percent: 'taxa (%)',
      share: 'participação (%)',
    }[unit];
    const entries = values.slice(0, LIMIT),
      chartValues = shares ? shares.slice(0, LIMIT) : entries.map((row) => row[valueIdx]);
    const title = `${columns[valueIdx]} por ${columns[labelIdx]} · ${unitLabel}`;
    window.CourseViz.plotBars(
      el('sql-chart'),
      entries.map((row) => String(row[labelIdx] ?? 'Sem categoria')),
      chartValues,
      title,
      { unit: plotUnit },
    );
    el('sql-chart-label').textContent = `${columns[valueIdx]} · ${unitLabel}`;
  }
  function renderTable(columns, values, valueIdx, unit, shares) {
    el('sql-results-scroll').tabIndex = 0;
    const table = el('sql-results'),
      head = table.querySelector('thead'),
      body = table.querySelector('tbody'),
      tr = document.createElement('tr');
    head.replaceChildren();
    body.replaceChildren();
    for (const [i, col] of columns.entries()) {
      const th = document.createElement('th');
      th.scope = 'col';
      th.textContent =
        col +
        (i === valueIdx && unit === 'currency'
          ? ' (R$)'
          : i === valueIdx && unit === 'percent'
            ? ' (%)'
            : '');
      tr.append(th);
    }
    if (shares) {
      const th = document.createElement('th');
      th.scope = 'col';
      th.textContent = 'Participação no total (%)';
      tr.append(th);
    }
    head.append(tr);
    for (const [rowIdx, vals] of values.slice(0, LIMIT).entries()) {
      const line = document.createElement('tr');
      for (const [i, value] of vals.entries()) {
        const td = document.createElement('td');
        td.textContent =
          typeof value === 'number'
            ? window.CourseViz.formatValue(
                value,
                i === valueIdx && unit !== 'share' ? unit : 'number',
              )
            : String(value ?? '—');
        line.append(td);
      }
      if (shares) {
        const td = document.createElement('td');
        td.textContent = window.CourseViz.formatValue(shares[rowIdx], 'percent');
        line.append(td);
      }
      body.append(line);
    }
    el('sql-count').textContent = `${values.length} linha(s)`;
  }
  function renderResult(columns, values) {
    clearResult('Nenhum registro encontrado com esse filtro. Experimente alterar o WHERE.');
    lastResult = { columns, values };
    const numeric = columns
      .map((_, i) => i)
      .filter(
        (i) =>
          values.some((r) => typeof r[i] === 'number' && Number.isFinite(r[i])) &&
          values.every((r) => r[i] === null || (typeof r[i] === 'number' && Number.isFinite(r[i]))),
      );
    function choices(id, indices) {
      const select = el(id);
      select.replaceChildren(new Option('Escolha…', ''));
      for (const i of indices) select.add(new Option(columns[i], String(i)));
      select.disabled = !indices.length;
    }
    choices('sql-value', numeric);
    const preferred =
      numeric.find((i) =>
        /receita|lucro|custo|faturamento|pedidos|registros|contagem/i.test(columns[i]),
      ) ?? numeric[numeric.length - 1];
    el('sql-value').value = preferred === undefined ? '' : String(preferred);
    el('sql-unit').disabled = !numeric.length;
    el('sql-category').value = '';
    chooseCategories();
    inferUnit();
    drawChart();
  }
  function chooseCategories() {
    if (!lastResult) return;
    const { columns, values } = lastResult,
      selectedValue = el('sql-value').value,
      select = el('sql-category'),
      previous = select.value;
    const categories = columns
      .map((_, i) => i)
      .filter((i) => String(i) !== selectedValue && values.some((row) => row[i] !== null));
    select.replaceChildren(new Option('Escolha…', ''));
    for (const i of categories) select.add(new Option(columns[i], String(i)));
    select.disabled = !categories.length;
    const preferred =
      categories.find((i) => values.some((row) => typeof row[i] === 'string')) ??
      (values.length > 1 ? categories[0] : undefined);
    select.value = categories.some((i) => String(i) === previous)
      ? previous
      : preferred === undefined
        ? ''
        : String(preferred);
  }
  function metricKind(column) {
    if (/margem|taxa|percent|propor[cç][aã]o|participa[cç][aã]o/i.test(column)) return 'percent';
    if (/pedidos|registros|unidades|quantidade|contagem/i.test(column)) return 'count';
    if (/receita|lucro|custo|faturamento|pre[cç]o/i.test(column)) return 'currency';
    return 'number';
  }
  function inferUnit() {
    const column = lastResult?.columns[Number(el('sql-value').value)] || '',
      kind = metricKind(column);
    const values =
      lastResult?.values
        .map((row) => row[Number(el('sql-value').value)])
        .filter((value) => value !== null) || [];
    for (const option of el('sql-unit').options) {
      option.disabled =
        (option.value === 'currency' && (kind === 'count' || kind === 'percent')) ||
        (option.value === 'count' && (kind === 'currency' || kind === 'percent')) ||
        (option.value === 'percent' &&
          (kind === 'count' ||
            kind === 'currency' ||
            (kind === 'number' && values.some((value) => Math.abs(value) > 1)))) ||
        (option.value === 'share' && kind === 'percent');
    }
    el('sql-unit').value = kind;
  }
  function validateSelect(sql) {
    // Ignora literais e comentários para validar o formato; executa o texto original.
    const cleaned = sql
      .replace(/'(?:''|[^'])*'|"(?:""|[^"])*"|--[^\n]*|\/\*[\s\S]*?\*\//g, ' ')
      .trim();
    if (!/^select\s/i.test(cleaned))
      throw new Error('Nesta atividade, comece com SELECT para consultar os dados.');
    if (cleaned.replace(/;\s*$/, '').includes(';'))
      throw new Error('Execute apenas uma consulta SELECT por vez.');
    if (sql.length > QUERY_LIMIT) throw new Error('Consulta muito longa para esta demonstração.');
    return sql;
  }
  async function run() {
    const button = el('run-sql'),
      generation = ++executionGeneration;
    cancelPendingQuery();
    button.disabled = true;
    status('Executando SELECT…');
    try {
      const query = validateSelect(el('sql-editor').value);
      await initSQL();
      if (generation !== executionGeneration) return;
      executingGeneration = generation;
      const result = await window.CourseSqlEngine.execute(query);
      if (generation !== executionGeneration) return;
      renderResult(result.columns, result.values);
      status(`Consulta executada · ${result.values.length} linha(s) retornada(s).`);
    } catch (error) {
      if (generation !== executionGeneration) return;
      clearResult(
        'A consulta não produziu um resultado válido. Confira a mensagem acima e tente novamente.',
      );
      status(`Erro: ${error.message}`, true);
    } finally {
      if (executingGeneration === generation) executingGeneration = null;
      if (generation === executionGeneration) button.disabled = false;
    }
  }
  function insertSqlText(editor, text, start = editor.selectionStart, end = editor.selectionEnd) {
    editor.setRangeText(text, start, end, 'end');
    editor.dispatchEvent(new Event('input', { bubbles: true }));
    editor.focus();
  }

  function suggestionsAt(editor, table, columns) {
    const caret = editor.selectionStart;
    if (caret !== editor.selectionEnd || editor.value.length > QUERY_LIMIT) return null;
    // Mantém as posições do texto, mas ignora literais, identificadores entre aspas e comentários.
    const before = editor.value.slice(0, caret).replace(
      /'(?:''|[^'])*(?:'|$)|"(?:""|[^"])*(?:"|$)|`(?:``|[^`])*(?:`|$)|\[[^\]]*(?:\]|$)|--[^\n]*|\/\*[\s\S]*?(?:\*\/|$)/g,
      (part) => ' '.repeat(part.length),
    );
    const prefix = before.match(/\w+$/)?.[0];
    if (!prefix || !/^[a-z_]/i.test(prefix)) return null;
    const start = caret - prefix.length;
    const context = before.slice(0, start);
    const tablePosition = /\b(?:FROM|JOIN)\s+$/i.test(context);
    const byPosition = /\b(?:GROUP|ORDER)\s+$/i.test(context);
    if (prefix.length < 2 && !tablePosition && !byPosition) return null;
    const lowerPrefix = prefix.toLowerCase();
    const end = caret + (editor.value.slice(caret).match(/^\w+/)?.[0].length ?? 0);
    const current = editor.value.slice(start, end).toLowerCase();
    let candidates = columns;
    if (tablePosition) candidates = [table];
    else if (byPosition) candidates = ['BY'];
    else if (!/\.\s*$/.test(context)) candidates = [...columns, ...SQL_WORDS];
    const values = candidates
      .filter((candidate) => {
        const lower = candidate.toLowerCase();
        return lower.startsWith(lowerPrefix) && lower !== current;
      })
      .slice(0, COMPLETION_LIMIT)
      .map((candidate) => prefix === lowerPrefix ? candidate.toLowerCase() : candidate);
    return values.length ? { start, end, values } : null;
  }

  function initAutocomplete(editor, table, columns) {
    const list = document.createElement('div');
    list.id = `${editor.id}-suggestions`;
    list.className = 'sql-suggestions';
    list.hidden = true;
    list.setAttribute('role', 'listbox');
    list.setAttribute('aria-label', 'Sugestões SQL');
    const announcement = document.createElement('span');
    announcement.className = 'sql-suggestions-announcement';
    announcement.setAttribute('aria-live', 'polite');
    editor.after(list, announcement);
    // https://www.w3.org/TR/wai-aria-1.2/#aria-autocomplete
    editor.setAttribute('aria-autocomplete', 'list');
    editor.setAttribute('aria-controls', list.id);
    editor.setAttribute('aria-haspopup', 'listbox');

    let completion = null;
    let selected = -1;
    function close() {
      completion = null;
      selected = -1;
      list.hidden = true;
      editor.removeAttribute('aria-activedescendant');
      announcement.textContent = '';
    }
    function update(event) {
      const next = event.isComposing ? null : suggestionsAt(editor, table, columns);
      if (!next) {
        close();
        return;
      }
      editor.removeAttribute('aria-activedescendant');
      selected = -1;
      completion = next;
      list.replaceChildren(...next.values.map((text, index) => {
        const option = document.createElement('div');
        option.id = `${list.id}-${index}`;
        option.dataset.suggestion = String(index);
        option.setAttribute('role', 'option');
        option.setAttribute('aria-selected', 'false');
        option.textContent = text;
        return option;
      }));
      if (list.hidden) {
        announcement.textContent = 'Sugestões de SQL. Use as setas e Enter para inserir.';
        list.hidden = false;
        list.scrollIntoView({ block: 'nearest', inline: 'nearest' });
      }
    }
    function accept(index) {
      if (!completion) return;
      const { start, end, values } = completion;
      insertSqlText(editor, values[index], start, end);
      close();
    }

    editor.addEventListener('input', update);
    editor.addEventListener('blur', close);
    editor.addEventListener('click', close);
    list.addEventListener('mousedown', (event) => event.preventDefault());
    list.addEventListener('click', (event) => {
      const option = event.target.closest('[data-suggestion]');
      if (option) accept(Number(option.dataset.suggestion));
    });
    editor.addEventListener('keydown', (event) => {
      if (!completion || event.isComposing) return;
      if (event.key === 'Escape') {
        event.preventDefault();
        event.stopPropagation();
        close();
        return;
      }
      const vertical = event.key === 'ArrowDown' || event.key === 'ArrowUp';
      const navigates = ['ArrowLeft', 'ArrowRight', 'Home', 'End', 'PageUp', 'PageDown', 'Tab'].includes(event.key);
      if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) {
        if (vertical || navigates || event.key === 'Enter') close();
        return;
      }
      if (vertical) {
        event.preventDefault();
        const last = completion.values.length - 1;
        if (selected >= 0) list.children[selected].setAttribute('aria-selected', 'false');
        selected = event.key === 'ArrowDown'
          ? (selected === last ? 0 : selected + 1)
          : (selected <= 0 ? last : selected - 1);
        const active = list.children[selected];
        active.setAttribute('aria-selected', 'true');
        editor.setAttribute('aria-activedescendant', active.id);
      } else if (event.key === 'Enter' && selected >= 0) {
        event.preventDefault();
        accept(selected);
      } else if (navigates) {
        close();
      }
    });
  }

  function initEditor(editor) {
    const panel = document.querySelector(`[data-sql-schema="${editor.id}"]`);
    const { name, columns } = window.CourseSqlEngine.schema;
    const entries = Object.entries(columns);
    initAutocomplete(editor, name, Object.keys(columns).sort());
    panel.querySelector('summary').insertAdjacentHTML('beforeend', ` <code>${name}</code>`);
    panel.insertAdjacentHTML('beforeend', `
      <div class="sql-schema-body">
        <div class="sql-schema-table">
          <button class="sql-schema-name" type="button" data-sql-name="${name}">
            <code>${name}</code><span>Tabela</span>
          </button>
        </div>
        <ul class="sql-schema-columns" role="list" aria-label="Colunas de ${name}">
          ${entries.map(([column, type]) => `
            <li><button class="sql-schema-name" type="button" data-sql-name="${column}">
              <code>${column}</code><span>${type}</span>
            </button></li>
          `).join('')}
        </ul>
      </div>
    `);
    panel.addEventListener('click', (event) => {
      const item = event.target.closest('[data-sql-name]');
      if (item) insertSqlText(editor, item.dataset.sqlName);
    });
  }

  function init() {
    const editor = el('sql-editor');
    if (!editor) return;
    initEditor(editor);
    editor.value = examples.mensal;
    document.querySelectorAll('[data-query]').forEach((button) =>
      button.addEventListener('click', () => {
        document.querySelectorAll('[data-query]').forEach((b) => b.classList.remove('active'));
        button.classList.add('active');
        el('sql-editor').value = examples[button.dataset.query];
        run();
      }),
    );
    el('run-sql').addEventListener('click', run);
    el('retry-sql').addEventListener('click', () => {
      el('retry-sql').hidden = true;
      run();
    });
    el('sql-category').addEventListener('change', drawChart);
    el('sql-value').addEventListener('change', () => {
      chooseCategories();
      inferUnit();
      drawChart();
    });
    el('sql-unit').addEventListener('change', drawChart);
    el('sql-editor').addEventListener('input', () => {
      executionGeneration++;
      cancelPendingQuery();
      document.querySelectorAll('[data-query]').forEach((b) => b.classList.remove('active'));
      clearResult('Execute a consulta alterada para ver a tabela e o gráfico correspondentes.');
      status('Consulta alterada. Execute SELECT para atualizar o resultado.');
      el('run-sql').disabled = false;
    });
    el('sql-editor').addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        run();
      }
    });
    initSQL()
      .then(() => {
        if (executionGeneration === 0) run();
      })
      .catch(() => {});
  }
  function initExercises() {
    const rows = window.SALES_DATA;
    const totals = new Map([['2026-05', 0], ['2026-06', 0]]);
    for (const row of rows) {
      if (totals.has(row.mes)) totals.set(row.mes, totals.get(row.mes) + Math.round(row.receita * 100));
    }
    const units = rows.reduce((total, row) => total + row.quantidade, 0);
    const matches = {
      contagem: (values) => values.length === 1 && values[0][0] === rows.length && values[0][1] === units,
      meses: (values) => values.length === totals.size &&
        new Set(values.map(([month]) => month)).size === totals.size &&
        values.every(([month, amount]) =>
          typeof amount === 'number' && Math.round(amount * 100) === totals.get(month),
        ),
    };

    document.querySelectorAll('[data-sql-exercise]').forEach((form) => {
      const editor = form.querySelector('textarea');
      const button = form.querySelector('button[type="submit"]');
      const status = form.querySelector('[role="status"]');
      const results = form.querySelector('.exercise-results');
      const { tHead, tBodies } = results.querySelector('table');
      initEditor(editor);
      let revision = 0;
      editor.addEventListener('input', () => {
        revision++;
        results.hidden = true;
        status.textContent = 'Consulta alterada. Execute para conferir.';
      });
      editor.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' && (event.ctrlKey || event.metaKey)) {
          event.preventDefault();
          if (!button.disabled) form.requestSubmit();
        }
      });
      form.addEventListener('submit', async (event) => {
        event.preventDefault();
        if (button.disabled) return;
        const submitted = revision;
        button.disabled = true;
        results.hidden = true;
        status.textContent = 'Executando consulta…';
        try {
          const query = validateSelect(editor.value);
          await window.CourseSqlEngine.prepare(rows);
          if (revision !== submitted) return;
          const { columns, values } = await window.CourseSqlEngine.execute(query);
          if (revision !== submitted) return;
          tHead.replaceChildren();
          tBodies[0].replaceChildren();
          const header = tHead.insertRow();
          for (const column of columns) {
            const cell = document.createElement('th');
            cell.scope = 'col';
            cell.textContent = column;
            header.append(cell);
          }
          for (const row of values.slice(0, LIMIT)) {
            const line = tBodies[0].insertRow();
            for (const value of row) {
              line.insertCell().textContent = typeof value === 'number'
                ? window.CourseViz.formatValue(value)
                : (value ?? 'NULL');
            }
          }
          results.hidden = !columns.length;
          results.tabIndex = 0;
          const correct = columns.length === 2 && matches[form.dataset.sqlExercise](values);
          const feedback = correct
            ? 'Resultado conferido.'
            : 'Revise as linhas e colunas pedidas no enunciado.';
          status.textContent = values.length > LIMIT
            ? feedback + ` Mostrando as primeiras ${LIMIT} de ${values.length} linhas.`
            : feedback + ` ${values.length} linha(s) retornada(s).`;
        } catch (error) {
          if (revision === submitted) status.textContent = `Erro: ${error.message}`;
        } finally {
          button.disabled = false;
        }
      });
    });
  }

  window.SqlLab = { init, initExercises };
})();
