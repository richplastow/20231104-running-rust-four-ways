# Running Rust Four Ways

__A minimal example Rust app, that can be run in four different ways__

__4th November 2023__

After completing the steps below, you'll be able to run a Rust app:

1. As a standalone binary, compiled for the current machine
2. From a Node.js 'wrapper' app, using `child_process.exec()`
3. In a web browser, using WebAssembly (wasm)
4. In Node.js again, this time using WebAssembly (wasm)

__Confirmed to work on:__

- macOS Monterey 12.6.1
- Windows 11
- TODO Linux

## Set up your machine

### macOS

1. Open the Terminal:  
   From the Finder, command-shift-u, type 'term' to select Terminal, command-o
   to open it
2. Check that Git is installed:  
   `git --version`  
   If you see `command not found: git`,
   install it from [git-scm.com.](https://git-scm.com/download/mac)
3. Check that Node is installed:  
   `node --version`  
   If you see `command not found: node`, instead of installing Node directly,
   [install `nvm`](https://github.com/nvm-sh/nvm#installing-and-updating) and:  
   `nvm install stable`  
   After that, `node --version` should work
4. Check that NPM is installed:  
   `npm --version`  
   This should have been installed at the same time as Node
5. Check that the Rust compiler and associated utilities are installed:  
   `rustup --version`  
   If you see `command not found: rustup`, run the
   [`rustup` installer,](https://www.rust-lang.org/tools/install) and choose:  
   `1) Proceed with installation (default)`
6. Check that the `wasm-pack` is installed:  
   `wasm-pack --version`  
   If you see `command not found: wasm-pack`, run the
   [`wasm-pack` installer](https://rustwasm.github.io/wasm-pack/installer/)
7. Create a directory to build the example Rust app:  
   `mkdir ~/example-rust-app`

### Windows

TODO

### Linux

TODO

## Set up your code editor

### VS Code

Install these helpful extensions for developing Rust apps:

1. [rust-analyzer v0.3.1705
   ](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer)
2. [Even Better TOML v0.19.2
   ](https://marketplace.visualstudio.com/items?itemName=tamasfe.even-better-toml)

TODO more code editors

## Create the app's source files

Move into your empty example-rust-app directory:  
`cd ~/example-rust-app`

Create a directory called 'src', and create the following three Rust files,
'src/greet.rs', 'src/lib.rs' and 'src/main.rs':

```rs
// src/utils.rs

pub fn greet(who: &str) -> String {
    return format!("Hello from Rust, {}!", who)
}
```

```rs
// src/lib.rs

// wasm-pack uses wasm-bindgen to build and generate a JavaScript
// binding file. This line imports the wasm-bindgen crate.
use wasm_bindgen::prelude::*;

mod utils;
use utils::greet;

// wasm-pack needs exported functions to be prefixed `#[wasm_bindgen]`.
#[wasm_bindgen]
pub fn greet(who: &str) -> String {
    return format!("Hello from Rust, {}!", who)
}
```

```rs
// src/main.rs

mod utils;
use utils::greet;

fn main() {
    // Convert command line arguments to a vector.
    let args: Vec<_> = std::env::args().collect();

    // Use default text if no command line arguments exist.
    // Otherwise, use the second string in `args` (the first option).
    let text = if args.len() <= 1 {
        "standalone binary app".to_string()
    } else {
        format!("{}", args[1])
    };

    // Print text to the console.
    println!("{}", greet(&text))
}
```

## Begin setting up the 'packages.json' file

Create the default packages.json file:  
`npm init -y`

In this project, the JavaScript run by Node will be using `import` instead of
the old `require()`, so this property must be added to packages.json:  
`  "type": "module",`

Change the default `"test"` script from:  
`    "test": "echo \"Error: no test specified\" && exit 1"`  
to:  
`    "test": "node scripts/test-all.js"`

Create a directory called 'scripts', and create a placeholder file
'scripts/test-all.rs':

```js
// scripts/test-all.rs
console.log('Tests will be run from here');
```

Check that it's working:  
`npm test`  
...you should see `"Tests will be run from here"`

## Build and test the standalone binary

Create a directory called 'dist'.

Inside that, create a directory called '1-standalone-binary'.

Next, create the JavaScript file 'scripts/build-1-standalone-binary.js', which
will compile the standalone binary app:

```js
// scripts/build-1-standalone-binary.js

import child_process from 'node:child_process';

try {
    const result = child_process.execSync(
        'rustc ' + // the Rust compiler
        'src/main.rs ' + // the main source file
        '-o dist/1-standalone-binary/greet' // the compiled binary app
    ).toString();
    console.log(result || 'rustc succeeded');
} catch (err) { console.error(err.message); process.exit(1) }
```

Create another JavaScript file 'scripts/test-1-standalone-binary.js', which will
run a couple of unit tests on the standalone binary app:

```js
// scripts/test-1-standalone-binary.js

import { equal } from 'node:assert';
import child_process from 'node:child_process';

try {
    const result1 = child_process.execSync(
        './dist/1-standalone-binary/greet' // the compiled binary app
    ).toString();
    equal(result1, 'Hello from Rust, standalone binary app!\n');

    const result2 = child_process.execSync(
        './dist/1-standalone-binary/greet ' +
        '"console arguments user" extra args'
    ).toString();
    equal(result2, 'Hello from Rust, console arguments user!\n');

    console.log('Both 1-standalone-binary tests passed');
} catch (err) { console.error(err); process.exit(1) }
```

Back in 'packages.json', add two new scripts above `"test"`:  
`    "build:1": "node scripts/build-1-standalone-binary.js",`  
`    "test:1": "node scripts/test-1-standalone-binary.js",`

Compile the standalone binary app:  
`npm run build:1`  
...you should see `"rustc succeeded"`

Run the unit tests on it:  
`npm run test:1`  
...you should see `"Both 1-standalone-binary tests passed"`

## Create and test the Node.js 'wrapper' app

Create a second directory inside 'dist', called '2-node-wrapper'.

There's no build step this time, because the Node.js 'wrapper' app just makes
use of the [compiled standalone binary.](#build-and-test-the-standalone-binary)
The Node wrapper app is divided into two Node files:

```js
// dist/2-node-wrapper/cli.js

import { wrapper } from './wrapper.js';

console.log(wrapper(process.argv[2]));
```

```js
// dist/2-node-wrapper/wrapper.js

import child_process from 'node:child_process';

export const wrapper = (text) => {
    try {
        const result = child_process.execSync(
            './dist/1-standalone-binary/greet ' + // the compiled binary app
            `"${text || 'Node.js wrapper app'}"`
        ).toString().trim();
        return result || '[no output]';
    } catch (err) { console.error(err.message); process.exit(1) }
};
```

Create 'scripts/test-2-node-wrapper.js', which will run unit tests on the
wrapper.js module, and also run integration tests on the cli.js app:

```js
// scripts/test-2-node-wrapper.js

import { equal } from 'node:assert';
import child_process from 'node:child_process';

import { wrapper } from '../dist/2-node-wrapper/wrapper.js';

try {
    const result1 = wrapper();
    equal(result1, 'Hello from Rust, Node.js wrapper app!');

    const result2 = wrapper('passed to imported module');
    equal(result2, 'Hello from Rust, passed to imported module!');

    const result3 = child_process.execSync(
        'node ./dist/2-node-wrapper/cli.js'
    ).toString();
    equal(result3, 'Hello from Rust, Node.js wrapper app!\n');

    const result4 = child_process.execSync(
        'node ./dist/2-node-wrapper/cli.js' +
        ' "passed to Node CLI app" extra args'
    ).toString();
    equal(result4, 'Hello from Rust, passed to Node CLI app!\n');

    console.log('All four 2-node-wrapper tests passed');
} catch (err) { console.error(err); process.exit(1) }
```

Back in 'packages.json', add a new script above `"test"`:  
`    "test:2": "node scripts/test-2-node-wrapper.js",`

Run the unit tests:  
`npm run test:2`  
...you should see `"All four 2-node-wrapper/greet.js tests passed"`

## Build for the web browser, and test

Create another directory inside 'dist', called '3-web-browser-wasm'.

The `#[wasm_bindgen]` in 'src/lib.rs' means that a 'Cargo.toml' file must be
created. It has the same content, whether you're targeting `nodejs` or `web`:

```toml
# Cargo.toml

[package]
name = "example-rust-app"
version = "1.0.0"
authors = ["Your Name <your@name.com>"]
edition = "2021"

[lib]
crate-type = ["cdylib"]

[dependencies]
wasm-bindgen = "0.2"
```

The first time `wasm-pack build ...` is run, a 'Cargo.lock' file will be
generated alongside 'Cargo.toml', and `wasm-bindgen` and its sub-dependencies
will be installed in the 'target/' directory.

Next, create the JavaScript file 'scripts/build-3-web-browser-wasm.js', which
will be used to generate a WebAssembly app targeting web browsers:

```js
// scripts/build-3-web-browser-wasm.js

import child_process from 'node:child_process';
import { rmSync } from 'node:fs';

try {
    // Delete any files generated during a previous build.
    '.gitignore|greet_bg.wasm|greet_bg.wasm.d.ts|greet.d.ts|greet.js'
        .split('|').forEach(filename => rmSync(
            `dist/3-web-browser-wasm/${filename}`,
            { force: true }, // don't stop if the file doesn't exist
        ));

    // Generate a WebAssembly app targeting web browsers.
    const result = child_process.execSync(
        'wasm-pack build ' + // generate the .js, .ts and .wasm files
        '--target web ' + // set the target environment
        '--no-pack ' + // do not generate a 'package.json' file
        '--out-dir dist/3-web-browser-wasm/ ' + // the output directory
        '--out-name greet' // basis for naming the generated files
    ).toString();
    console.log(result);

} catch (err) { console.error(err.message); process.exit(1) }
```

Create another JavaScript file 'scripts/test-3-web-browser-wasm.js', which will
start a localhost server on port 1234 for testing the app:

```js
// scripts/test-3-web-browser-wasm.js

import { readFileSync } from 'node:fs';
import http from 'node:http';

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
      log('\\n\\nAll four 3-web-browser-wasm tests passed');

  } catch (err) {
    log(\`\\n\\nError:\\n\${err.message}\\n(See browser console)\`);
    document.body.className = 'fail';
    console.error(err);
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
    console.log('Open http://localhost:1234/ to run web browser wasm tests.');
    console.log('Press ctrl-c to close this server.');
} catch (err) { console.error(err); process.exit(1) }
```

Back in 'packages.json', add two new scripts above `"test"`:  
`    "build:3": "node scripts/build-3-web-browser-wasm.js",`  
`    "test:3": "node scripts/test-3-web-browser-wasm.js",`

Compile the web browser wasm app:  
`npm run build:3`  
...you should see `[INFO]: Your wasm pkg is ready ...`

Start the local server:  
`npm run test:3`  
...you should see:  
`Open http://localhost:1234/ to run web browser wasm tests.`  
`Press ctrl-c to close this server.`

The browser should show the test results, and you should see:  
`All four 3-web-browser-wasm tests passed`

Back on the command line, hold down the 'control' key and press 'c' to stop
running the `test:3` server.

## Build and test the Node.js WebAssembly app

Create the fourth output-directory in 'dist', called '4-node-wasm'.

Then create 'scripts/build-4-node-wasm.js', which will be used to generate
a WebAssembly app targeting Node.js:

```js
// scripts/build-4-node-wasm.js

import child_process from 'node:child_process';
import { renameSync, rmSync } from 'node:fs';

const outDir = 'dist/4-node-wasm/';

try {
    // Delete any files generated during a previous build.
    '.gitignore|greet_bg.wasm|greet.cjs|greet_bg.wasm.d.ts|greet.d.ts'
        .split('|').forEach(filename => rmSync(
            `${outDir}${filename}`,
            { force: true }, // don't stop if the file doesn't exist
        ));

    // Generate a WebAssembly app targeting Node.js.
    const result = child_process.execSync(
        'wasm-pack build ' + // generate the .js, .ts and .wasm files
        '--target nodejs ' + // set the target environment
        '--no-pack ' + // do not generate a 'package.json' file
        `--out-dir ${outDir} ` + // the output directory
        '--out-name greet' // basis for naming the generated files
    ).toString();
    console.log(result);

    // This project has set `"type": "module"` in 'package.json',
    // so rename 'greet.js' (which uses `require()`) to 'greet.cjs'.
    renameSync(`${outDir}greet.js`, `${outDir}greet.cjs`);

} catch (err) { console.error(err.message); process.exit(1) }
```

Create 'scripts/test-4-node-wasm.js', which will run tests on 'greet.cjs'
and 'greet_bg.wasm':

```js
// scripts/test-4-node-wasm.js

import { equal } from 'node:assert';
import dist from '../dist/4-node-wasm/greet.cjs';
const { greet } = dist;

try {
    // Check that WebAssembly is supported in the running version of Node.
    if (typeof WebAssembly !== 'object') throw Error(
      `typeof WebAssembly is '${typeof WebAssembly}' not 'object'`);

    const result1 = greet('');
    equal(result1, 'Hello from Rust, wasm app!');

    const result2 = greet('Node (standard)');
    equal(result2, 'Hello from Rust, Node (standard)!');

    console.log('Both 4-node-wasm tests passed');
} catch (err) { console.error(err); process.exit(1) }
```

Back in 'packages.json', add two new scripts above `"test"`:  
`    "build:4": "node scripts/build-4-node-wasm.js",`  
`    "test:4": "node scripts/test-4-node-wasm.js",`

Compile the standalone binary app:  
`npm run build:4`  
...you should see `[INFO]: Your wasm pkg is ready ...`

Run the unit tests on it:  
`npm run test:4`  
...you should see `"Both 4-node-wasm tests passed"`

## Combine the three build steps into a single 'build-all.js' file

TODO

## Combine the four unit test files into a single 'test-all.js' file

TODO
