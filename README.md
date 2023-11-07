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
...you should see `"Tests will be run from here"` logged.

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
        './dist/1-standalone-binary/greet' +
        ' "console arguments user" extra args'
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
...you should see `"rustc succeeded"` logged.

Run the unit tests on it:  
`npm run test:1`  
...you should see `"Both 1-standalone-binary/greet tests passed"` logged.

## Create and test the Node.js 'wrapper' app

Create a second directory inside 'dist', called '2-node-wrapper'.

There's no build step this time, because the Node.js 'wrapper' app just makes
use of the [compiled standalone binary](#build-and-test-the-standalone-binary)
app. This app is divided into two Node files:

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
            './dist/1-standalone-binary/greet' + // the compiled binary app
            ` "${text || 'Node.js wrapper app'}"`
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
...you should see `"All four 2-node-wrapper/greet.js tests passed"` logged.

## Build for the web browser, and test

TODO

## Build and test the Node.js WebAssembly app

TODO

## Combine the three build steps into a single 'build-all.js' file

TODO

## Combine the four unit test files into a single 'test-all.js' file

TODO
