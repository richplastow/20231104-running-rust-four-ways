// scripts/test-all.js

import { green } from '../helpers/ansi.js';

console.log('Running "./test-1-standalone-binary.js"...');
await import('./test-1-standalone-binary.js');
console.log('\nRunning "./test-2-node-wrapper.js"...');
await import('./test-2-node-wrapper.js');
console.log('\nRunning "./test-4-node-wasm.js"...');
await import('./test-4-node-wasm.js');
console.log(`
\n${green('Done!')}All three command-line tests passed.
\nRunning "./test-3-web-browser-wasm.js"...\n`);
import('./test-3-web-browser-wasm.js');
