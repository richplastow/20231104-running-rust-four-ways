// scripts/test-3-web-browser-wasm.js

import { readFileSync } from 'node:fs';
import http from 'node:http';
import { blue, red } from '../helpers/ansi.js';

const indexHtml = `
<!-- /index.html -->
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>test-3-web-browser-wasm</title>
    <script type="module" src="/script.js"></script>
    <style>
      body { background:#111; color:#ccc;
        font: 18px/30px Arial, sans-serif;
        transition: background-color 1s, color 1s; }
      body.fail { background:#211; color:#fcc; }
      body.pass { background:#121; color:#cfc; }
    </style>
  </head>
  <body>
    <h1>test-3-web-browser-wasm</h1>
    <pre></pre>
  </body>
</html>
`;

// Convert the .wasm file to a Data URL string. This will be used to
// test an alternative way of loading WebAssembly into JavaScript.
const wasm = readFileSync(`./dist/3-web-browser-wasm/greet_bg.wasm`);
const encoded = Buffer.from(wasm, 'binary').toString('base64');
const chunks = encoded.split('').reduce((acc, char, i) => i % 1000
  ? (acc[acc.length-1] = acc.at(-1)+char) && acc : [...acc, [char]], []);
const dataUrl = `data:application/wasm;base64,\n${chunks.join('\n')}`;

const scriptJs = `
// /script.js
(async function() {
  const $log = document.querySelector('pre');
  const log = (message) => $log.innerText += \`\${message}\`;
  log("'dist/3-web-browser-wasm/greet_bg.wasm' is ${wasm.length} bytes\\n");

  try {

    // Load the WebAssembly code from file, in the usual way.
    const standard = await import('./greet.js?standard');
    await standard.default('./greet_bg.wasm');
    const result1 = standard.greet('');
    log(\`\\nstandard.greet("") -> "\${result1}" \`);
    const ok1 = result1 === 'Hello from Rust, wasm app!';
    log(ok1 ? '✅' : '❌');
    const result2 = standard.greet('web browser (standard)');
    log(\`\\nstandard.greet("web browser (standard)") -> "\${result2}" \`);
    const ok2 = result2 === 'Hello from Rust, web browser (standard)!';
    log(ok2 ? '✅' : '❌');

    // Use the Data URL version of the WebAssembly code.
    const dataUrl = await import('./greet.js?dataUrl');
    await dataUrl.default(\`
${dataUrl}
    \`);
    const result3 = dataUrl.greet('');
    log(\`\\ndataUrl.greet("") -> "\${result3}" \`);
    const ok3 = result3 === 'Hello from Rust, wasm app!';
    log(ok3 ? '✅' : '❌');
    const result4 = dataUrl.greet('web browser (dataUrl)');
    log(\`\\ndataUrl.greet("web browser (dataUrl)") -> "\${result4}" \`);
    const ok4 = result4 === 'Hello from Rust, web browser (dataUrl)!';
    log(ok4 ? '✅' : '❌');

    document.body.className = ok1 && ok2 && ok3 && ok4 ? 'pass' : 'fail';
    if (ok1 && ok2 && ok3 && ok4)
      log('\\n\\nPass! All four 3-web-browser-wasm tests passed');

  } catch (err) {
    log(\`\\n\\nError!\\n\${err.message}\\n(See browser console)\`);
    document.body.className = 'fail';
    console.error('Error!', err);
  }
})();
`;

const fromDist = (filename) =>
    readFileSync(`./dist/3-web-browser-wasm${filename}`)

const respond = (res, status, mime, content) => {
    res.writeHead(status, { 'Content-Type': mime });
    res.end(content);
}

try {
    http.createServer((req, res) => {
        switch (req.url) {
            case '/':
            case '/index.html':
                respond(res, 200, 'text/html', indexHtml);
                break;
            case '/greet.js?standard':
            case '/greet.js?dataUrl':
                respond(res, 200, 'text/javascript', fromDist('/greet.js'));
                break;
            case '/greet_bg.wasm':
                respond(res, 200, 'application/wasm', fromDist(req.url));
                break;
            case '/script.js':
                respond(res, 200, 'text/javascript', scriptJs);
                break;
            default:
                respond(res, 200, 'text/plain', 'Not Found');
        }
    }).listen(1234);
    console.log(blue('Ready!')
        + '\nOpen http://localhost:1234/ to run web browser wasm tests.'
        + '\nPress ctrl-c to close this server.');
} catch (err) { console.error(red('Error!') + '\n', err); process.exit(1) }
