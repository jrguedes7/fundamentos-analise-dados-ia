# sql.js 1.16.0

Distribuição oficial: https://cdn.jsdelivr.net/npm/sql.js@1.16.0/dist/sql-wasm-inline.js

Código-fonte: https://github.com/sql-js/sql.js

Documentação: https://sql.js.org/documentation/

O WASM está incorporado no JavaScript. Não há requisição separada de `.wasm` nem configuração `locateFile`. A cópia local evita depender da CDN ao iniciar o laboratório. Licença MIT no arquivo LICENSE desta pasta. Não editar o arquivo distribuído.

Ao abrir o `index.html` como arquivo local, o navegador carrega `sql-wasm-source.js` sob demanda. O build gera esse arquivo a partir da distribuição oficial. Ele entrega o código como texto para execução no Worker.
