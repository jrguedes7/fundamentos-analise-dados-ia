const assert = require('node:assert/strict');
const { readFile } = require('node:fs/promises');
const { createServer } = require('node:http');
const path = require('node:path');
const { pathToFileURL } = require('node:url');
const { chromium } = require('playwright');

const root = path.resolve(__dirname, '..');
const types = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript' };
const server = createServer(async (request, response) => {
  const pathname = new URL(request.url, 'http://localhost').pathname;
  const file = path.resolve(root, '.' + (pathname === '/' ? '/index.html' : pathname));
  const type = types[path.extname(file)];
  try {
    if (!file.startsWith(root + path.sep) || !type) throw new Error('Arquivo indisponível');
    const contents = await readFile(file);
    response.writeHead(200, { 'Content-Type': type + '; charset=utf-8' }).end(contents);
  } catch {
    response.writeHead(404).end();
  }
});

async function verifyLocalSql(browser) {
  const page = await browser.newPage();
  try {
    await page.goto(pathToFileURL(path.join(root, 'index.html')).href);
    const exercise = page.locator('[data-sql-exercise="contagem"]');
    await exercise.evaluate((form) => {
      const slide = form.closest('.slide');
      window.CourseDeck.showSlide(Number(slide.id.slice('slide-'.length)) - 1);
    });
    await exercise.locator('..').locator('summary').first().click();
    const editor = exercise.locator('textarea');
    await editor.fill('SELECT COUNT(*), SUM(quantidade) FROM v');
    await exercise.getByRole('option', { name: 'vendas', exact: true }).click();
    assert.equal(await editor.inputValue(), 'SELECT COUNT(*), SUM(quantidade) FROM vendas');
    await exercise.getByRole('button', { name: 'Executar SQL' }).click();
    await exercise
      .getByRole('status')
      .filter({ hasText: /Resultado conferido/ })
      .waitFor();
    assert.deepEqual(await exercise.locator('tbody td').allTextContents(), ['475', '909']);

    await page.locator('#sql-editor').evaluate((editor) => {
      const slide = editor.closest('.slide');
      window.CourseDeck.showSlide(Number(slide.id.slice('slide-'.length)) - 1);
    });
    await page.getByText('Consulta executada · 6 linha(s) retornada(s).', { exact: true }).waitFor();
    const june = page.locator('#sql-results tbody tr').filter({ hasText: '2026-06' });
    assert.match(await june.textContent(), /7\.022,65/);
    console.log('OK: index.html aberto como arquivo local com SQL no exercício e no laboratório.');
  } finally {
    await page.close();
  }
}

async function smoke() {
  await new Promise((resolve, reject) => {
    server.once('error', reject);
    server.listen(0, '127.0.0.1', resolve);
  });
  const channel = process.env.PLAYWRIGHT_CHANNEL;
  const browser = await chromium.launch(channel ? { channel } : {});
  try {
    const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
    const errors = [];
    let sqlLoads = 0;
    page.on('request', (request) => {
      if (request.url().includes('/vendor/sql.js/')) sqlLoads++;
    });
    page.on('pageerror', (error) => errors.push(error.message));
    await page.goto('http://127.0.0.1:' + server.address().port);
    assert.equal(sqlLoads, 0, 'SQLite deve carregar sob demanda');
    const counter = page.locator('#slide-counter');
    for (let index = 1; index <= 35; index++) {
      assert.equal(await counter.textContent(), String(index).padStart(2, '0') + ' / 35');
      assert.equal(await page.locator('.slide.active').count(), 1);
      if (index < 35) await page.keyboard.press('ArrowRight');
    }
    await page.getByRole('button', { name: /roteiro/i }).click();
    assert.match(await page.locator('#notes-text').textContent(), /\S/);
    await page.locator('#close-notes').click();
    assert.equal(await page.locator('#presenter-notes').isVisible(), false);

    await page.keyboard.press('Home');
    const editor = page.locator('#sql-editor');
    for (let index = 1; index < 35 && !(await editor.isVisible()); index++) {
      await page.keyboard.press('ArrowRight');
    }
    await editor.focus();
    const sqlSlide = await counter.textContent();
    await page.keyboard.press('ArrowRight');
    assert.equal(await counter.textContent(), sqlSlide);
    const queries = [
      ['SELECT COUNT(*) AS registros, SUM(quantidade) AS unidades FROM vendas;', ['475', '909']],
      ['SELECT ROUND(SUM(receita), 2) AS receita_total FROM vendas;', ['R$ 52.841,96']],
    ];
    for (const [query, expected] of queries) {
      await editor.fill(query);
      await editor.press('Control+Enter');
      await page.getByText('Consulta executada · 1 linha(s) retornada(s).', { exact: true }).waitFor();
      const values = await page.locator('#sql-results tbody td').allTextContents();
      assert.deepEqual(values.map((value) => value.replace(/\s+/g, ' ')), expected);
    }
    await page.locator('#sql-results-scroll').focus();
    await page.keyboard.press('ArrowRight');
    assert.equal(await counter.textContent(), sqlSlide);
    await editor.fill('SELECT coluna_inexistente FROM vendas;');
    await editor.press('Control+Enter');
    await page.getByRole('status').filter({ hasText: /Erro:.*coluna_inexistente/ }).waitFor();
    assert.equal(await page.locator('#sql-results tbody td').count(), 0);
    await page.getByRole('button', { name: /contar e somar/i }).click();
    await page.getByText('Consulta executada · 1 linha(s) retornada(s).', { exact: true }).waitFor();
    assert.deepEqual(await page.locator('#sql-results tbody td').allTextContents(), ['475', '909']);
    const suggestions = page.locator('#sql-editor-suggestions');
    await editor.fill('');
    await editor.pressSequentially('sel');
    await suggestions.getByRole('option', { name: 'select', exact: true }).waitFor();
    assert.equal(await editor.inputValue(), 'sel');
    await editor.press('Enter');
    assert.equal(await editor.inputValue(), 'sel\n');
    assert.equal(await suggestions.isVisible(), false);
    await editor.fill('SELECT reX FROM vendas;');
    await editor.evaluate((input) => {
      input.setSelectionRange(9, 9);
      input.dispatchEvent(new Event('input', { bubbles: true }));
    });
    await suggestions.getByRole('option', { name: 'receita', exact: true }).waitFor();
    await editor.press('ArrowDown');
    assert.equal(await suggestions.getByRole('option', { selected: true }).textContent(), 'receita');
    await editor.press('Enter');
    assert.equal(await editor.inputValue(), 'SELECT receita FROM vendas;');
    await editor.fill('SELECT * FROM v');
    await suggestions.getByRole('option', { name: 'vendas', exact: true }).waitFor();
    await editor.press('Escape');
    assert.equal(await suggestions.isVisible(), false);
    assert.equal(await editor.inputValue(), 'SELECT * FROM v');
    for (const content of ["SELECT 're", "SELECT 1 -- re", "SELECT /* re"]) {
      await editor.fill(content);
      assert.equal(await suggestions.isVisible(), false);
    }
    await editor.fill('SELECT 1 AS re');
    await editor.press('ArrowDown');
    await editor.press('Control+Enter');
    await page.getByText('Consulta executada · 1 linha(s) retornada(s).', { exact: true }).waitFor();
    assert.equal(await editor.inputValue(), 'SELECT 1 AS re');
    assert.equal(await suggestions.isVisible(), false);
    const schema = page.locator('[data-sql-schema="sql-editor"]');
    await schema.locator('summary').click();
    const columns = await schema.locator('li button').evaluateAll((buttons) =>
      buttons.map((button) => [button.dataset.sqlName, button.querySelector('span').textContent]),
    );
    const fromSqlite = await page.evaluate(() => window.CourseSqlEngine.execute(
      "SELECT name, type FROM pragma_table_info('vendas') ORDER BY cid",
    ));
    assert.equal(columns.length, 13);
    assert.deepEqual(columns, fromSqlite.values);
    await editor.fill('SELECT campo FROM vendas LIMIT 1;');
    await editor.evaluate((input) => {
      const start = input.value.indexOf('campo');
      input.setSelectionRange(start, start + 'campo'.length);
    });
    const revenueColumn = schema.getByRole('button', { name: /receita\s+REAL/ });
    await revenueColumn.press('ArrowRight');
    assert.equal(await counter.textContent(), sqlSlide);
    await revenueColumn.press('Enter');
    assert.equal(await editor.inputValue(), 'SELECT receita FROM vendas LIMIT 1;');
    assert.equal(await editor.evaluate((input) => input === document.activeElement), true);
    await schema.locator('summary').click();
    await page.locator('#btn-next').focus();
    await page.keyboard.press('ArrowRight');
    assert.equal(await page.locator('[data-scale-demo]').isVisible(), true);
    for (const [width, height] of [[1280, 720], [1920, 1080], [390, 844]]) {
      await page.setViewportSize({ width, height });
      const overflow = await page.evaluate(() =>
        document.documentElement.scrollWidth > window.innerWidth,
      );
      assert.equal(overflow, false, `Rolagem horizontal em ${width}×${height}`);
    }
    const query = "SELECT mes, SUM(receita) FROM vendas WHERE mes IN ('2026-05', '2026-06') GROUP BY mes ORDER BY mes DESC;";
    const monthExercise = page.locator('[data-sql-exercise="meses"]');
    await monthExercise.locator('..').locator('summary').first().click();
    await monthExercise.locator('textarea').fill('SELECT mes, SUM(re');
    const monthlySuggestions = monthExercise.getByRole('listbox', { name: 'Sugestões SQL' });
    assert.equal(await monthlySuggestions.evaluate((list) =>
      list.getBoundingClientRect().bottom <= list.closest('.slide').getBoundingClientRect().bottom + 1,
    ), true);
    await monthlySuggestions.getByRole('option', { name: 'receita', exact: true }).click();
    assert.equal(await monthExercise.locator('textarea').inputValue(), 'SELECT mes, SUM(receita');
    await monthExercise.locator('textarea').fill(query);
    await monthExercise.getByRole('button', { name: 'Executar SQL' }).click();
    await monthExercise.getByRole('status').filter({ hasText: /Resultado conferido/ }).waitFor();
    assert.deepEqual(await monthExercise.locator('tbody td').allTextContents(),
      ['2026-06', '7.022,65', '2026-05', '7.686,24']);
    const editorWidth = await monthExercise.locator('textarea').evaluate(
      (element) => element.getBoundingClientRect().width,
    );
    assert.ok(editorWidth > 260, 'Editor deve ocupar a largura disponível no celular');
    await page.locator('#btn-prev').click();
    await page.locator('#btn-next').click();
    assert.equal(await monthExercise.locator('textarea').inputValue(), query);
    const countExercise = page.locator('[data-sql-exercise="contagem"]');
    for (let index = 0; index < 35 && !(await countExercise.locator('..').isVisible()); index++) {
      await page.locator('#btn-prev').click();
    }
    await countExercise.locator('..').locator('summary').first().click();
    const mobileSchema = countExercise.locator('[data-sql-schema]');
    await mobileSchema.locator('summary').click();
    assert.equal(await mobileSchema.getByRole('listitem').count(), 13);
    assert.equal(await mobileSchema.evaluate((panel) => panel.scrollWidth <= panel.clientWidth), true);
    await mobileSchema.locator('summary').click();
    await countExercise.locator('textarea').fill('SELECT 1, 2;');
    await countExercise.getByRole('button', { name: 'Executar SQL' }).click();
    await countExercise.getByRole('status').filter({ hasText: /Revise/ }).waitFor();
    await countExercise.locator('textarea').fill('SELECT COUNT(id_pedido), SUM(quantidade) FROM vendas');
    await countExercise.locator('textarea').press('Control+Enter');
    await countExercise.getByRole('status').filter({ hasText: /Resultado conferido/ }).waitFor();
    assert.deepEqual(errors, []);
    console.log('OK: 35 slides, roteiro, consultas, autocomplete, esquema SQL e dois exercícios interativos.');
    await verifyLocalSql(browser);
  } finally {
    await browser.close();
  }
}

smoke().catch((error) => {
  console.error(error);
  process.exitCode = 1;
}).finally(() => server.close());
