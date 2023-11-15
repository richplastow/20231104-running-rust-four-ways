// scripts/build-all.js

import { green } from '../helpers/ansi.js';

console.log('Running "./build-1-standalone-binary.js"...');
await import('./build-1-standalone-binary.js');
console.log('\nRunning "./build-3-web-browser-wasm.js"...');
await import('./build-3-web-browser-wasm.js');
console.log('Running "./build-4-node-wasm.js"...');
await import('./build-4-node-wasm.js');
console.log(green('Done!') + 'All three builds succeeded');
