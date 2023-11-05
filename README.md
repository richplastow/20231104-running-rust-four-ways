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

## Create the app's source file

Move into your empty example-rust-app directory:  
`cd ~/example-rust-app`

Create a directory called 'src', and create the following file 'src/lib.rs':

```rs
// src/lib.rs

// wasm-pack uses wasm-bindgen to build and generate a JavaScript
// binding file. This line imports the wasm-bindgen crate.
use wasm_bindgen::prelude::*;

// wasm-pack needs exported functions to be prefixed `#[wasm_bindgen]`.
#[wasm_bindgen]
pub fn greet(who: &str) -> String {
  return format!("Hello from Rust, {}!", who)
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
`    "test": "node scripts/run-all-tests.js"`

Create a directory called 'scripts', and create a placeholder file
'scripts/run-all-tests.rs':

```js
// scripts/run-all-tests.rs
console.log('Tests will be run from here');
```

Check that it's working:  
`npm test`  
...you should see `"Tests will be run from here"` logged.

## Build and test the standalone binary

TODO

## Build and test the Node.js 'wrapper' app

TODO

## Build for the web browser, and test

TODO

## Build and test the Node.js WebAssembly app

TODO

## Combine the four build and test processes

TODO
