/* SQLite isolado: consultas demoradas não interrompem os controles da apresentação. */
(function () {
  'use strict';
  const INIT_TIMEOUT = 15000,
    QUERY_TIMEOUT = 8000;
  const INIT_TIMEOUT_MESSAGE = 'O mecanismo SQL demorou mais de 15 segundos para carregar. Tente novamente.';
  const RESET_MESSAGE = 'O mecanismo SQL foi reiniciado. A consulta pendente foi cancelada.';
  const schema = Object.freeze({
    name: 'vendas',
    columns: Object.freeze({
      id_pedido: 'TEXT',
      data: 'TEXT',
      mes: 'TEXT',
      canal: 'TEXT',
      regiao: 'TEXT',
      categoria: 'TEXT',
      produto: 'TEXT',
      quantidade: 'INTEGER',
      preco_unitario: 'REAL',
      receita: 'REAL',
      faturamento_bruto: 'REAL',
      custo_produtos: 'REAL',
      lucro_bruto: 'REAL',
    }),
  });
  let worker = null,
    workerUrl = null,
    ready = false,
    readyPromise = null,
    cancelSourceLoad = null,
    nextId = 0;
  const pending = new Map();

  function sqlWorker({ name, columns }) {
    const columnNames = Object.keys(columns);
    let db = null;
    self.onmessage = async ({ data: { id, type, rows, query } }) => {
      try {
        if (type === 'prepare') {
          const SQL = await self.initSqlJs(),
            candidate = new SQL.Database();
          try {
            const definitions = columnNames.map((column) => `${column} ${columns[column]}`);
            const placeholders = columnNames.map(() => '?').join(', ');
            candidate.run(`CREATE TABLE ${name} (${definitions.join(', ')}); BEGIN TRANSACTION;`);
            const statement = candidate.prepare(`INSERT INTO ${name} VALUES (${placeholders})`);
            try {
              for (const row of rows) statement.run(columnNames.map((column) => row[column]));
            } finally {
              statement.free();
            }
            candidate.run('COMMIT; PRAGMA query_only = ON;');
            db = candidate;
          } catch (error) {
            candidate.close();
            throw error;
          }
          self.postMessage({ id, result: null });
        } else {
          if (!db) throw new Error('Prepare a base antes de executar a consulta.');
          const result = db.exec(query)[0] || { columns: [], values: [] };
          self.postMessage({ id, result });
        }
      } catch (error) {
        self.postMessage({ id, error: error.message || 'Não foi possível executar a consulta.' });
      }
    };
  }

  function stop(target, error) {
    if (worker !== target) return;
    cancelSourceLoad?.(error);
    worker?.terminate();
    if (workerUrl) URL.revokeObjectURL(workerUrl);
    worker = workerUrl = null;
    ready = false;
    readyPromise = null;
    for (const request of pending.values()) {
      clearTimeout(request.timer);
      request.reject(error);
    }
    pending.clear();
  }

  function loadLocalSource() {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      const missing = () => new Error(
        'Não foi possível ler o arquivo do SQLite. Abra o index.html na pasta completa do projeto ou use apresentacao_arquivo_unico.html.',
      );
      function finish(error) {
        clearTimeout(timer);
        script.onload = script.onerror = null;
        script.remove();
        cancelSourceLoad = null;
        if (error) reject(error);
        else resolve(script.courseSqlSource);
      }
      const timer = setTimeout(() => finish(new Error(INIT_TIMEOUT_MESSAGE)), INIT_TIMEOUT);
      cancelSourceLoad = finish;
      script.onload = () => finish(script.courseSqlSource ? null : missing());
      script.onerror = () => finish(missing());
      script.src = new URL('vendor/sql.js/sql-wasm-source.js', document.baseURI).href;
      document.head.append(script);
    });
  }

  function librarySource() {
    const embedded = document.getElementById('sql-vendor-source')?.textContent;
    if (embedded) return embedded;
    // Um Worker pode ter o import de arquivos file: bloqueado. O script clássico entrega apenas o texto.
    // https://html.spec.whatwg.org/multipage/dom.html#dom-document-currentscript
    if (location.protocol === 'file:') return loadLocalSource();
    const url = new URL('vendor/sql.js/sql-wasm-inline.js', document.baseURI);
    return `importScripts(${JSON.stringify(url.href)});`;
  }

  function start(library) {
    if (typeof Worker !== 'function')
      throw new Error(
        'Este navegador não permite preparar o laboratório SQL. Use um navegador atual.',
      );
    const bootstrap = `\n(${sqlWorker.toString()})(${JSON.stringify(schema)});`;
    const url = URL.createObjectURL(new Blob([library, bootstrap], { type: 'application/javascript' }));
    let target;
    try {
      target = new Worker(url);
    } catch {
      URL.revokeObjectURL(url);
      throw new Error(
        'Não foi possível iniciar o laboratório SQL. Reabra a apresentação e tente novamente.',
      );
    }
    worker = target;
    workerUrl = url;
    target.onmessage = ({ data }) => {
      if (worker !== target) return;
      const request = pending.get(data.id);
      if (!request) return;
      clearTimeout(request.timer);
      pending.delete(data.id);
      if (data.error) request.reject(new Error(data.error));
      else request.resolve(data.result);
    };
    target.onerror = (event) => {
      event.preventDefault();
      stop(
        target,
        new Error(
          'Não foi possível carregar o mecanismo SQL. Mantenha a pasta vendor junto da apresentação e tente novamente.',
        ),
      );
    };
    return target;
  }

  function request(target, type, payload, timeout, message) {
    return new Promise((resolve, reject) => {
      const id = ++nextId;
      const timer = setTimeout(() => stop(target, new Error(message)), timeout);
      pending.set(id, { resolve, reject, timer });
      try {
        target.postMessage({ id, type, ...payload });
      } catch (error) {
        stop(target, error);
      }
    });
  }

  function prepare(rows) {
    if (ready) return Promise.resolve();
    if (readyPromise) return readyPromise;
    if (!Array.isArray(rows) || rows.length !== 475)
      return Promise.reject(
        new Error(
          'A base do curso não está completa. Reabra a apresentação com os arquivos de dados.',
        ),
      );
    const deadline = performance.now() + INIT_TIMEOUT;
    const preparation = (async () => {
      const library = await librarySource();
      if (readyPromise !== preparation) throw new Error(RESET_MESSAGE);
      const target = start(library);
      const timeLeft = Math.max(0, deadline - performance.now());
      await request(target, 'prepare', { rows }, timeLeft, INIT_TIMEOUT_MESSAGE);
      if (worker !== target) throw new Error(RESET_MESSAGE);
      ready = true;
    })().catch((error) => {
      if (readyPromise === preparation) stop(worker, error);
      throw error;
    });
    readyPromise = preparation;
    return preparation;
  }

  function execute(query) {
    if (!worker || !ready)
      return Promise.reject(
        new Error('Prepare a base antes de executar a consulta. Tente novamente.'),
      );
    return request(
      worker,
      'execute',
      { query },
      QUERY_TIMEOUT,
      'A consulta ultrapassou 8 segundos e foi interrompida. Simplifique o SELECT e tente novamente.',
    );
  }

  function reset() {
    stop(worker, new Error(RESET_MESSAGE));
  }

  window.CourseSqlEngine = { schema, prepare, execute, reset };
})();
