// scripts/test-4-node-wasm.js

import { equal } from 'node:assert';
import dist from '../dist/4-node-wasm/greet.cjs';
import { green, red } from '../helpers/ansi.js';
const { greet } = dist;

try {
    // Check that WebAssembly is supported in the current version of Node.
    if (typeof WebAssembly !== 'object') throw Error(
      `typeof WebAssembly is '${typeof WebAssembly}' not 'object'`);

    const result1 = greet('');
    equal(result1, 'Hello from Rust, wasm app!');

    const result2 = greet('Node.js WebAssembly app');
    equal(result2, 'Hello from Rust, Node.js WebAssembly app!');

    console.log(green('Pass!') + 'Both 4-node-wasm tests passed');
} catch (err) { console.error(red('Fail!') + '\n', err); process.exit(1) }
