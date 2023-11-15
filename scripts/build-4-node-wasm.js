// scripts/build-4-node-wasm.js

import child_process from 'node:child_process';
import { renameSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { green, red } from '../helpers/ansi.js';

const outDir = join('dist', '4-node-wasm');

try {
    // Delete any files generated during a previous build.
    '.gitignore|greet_bg.wasm|greet.cjs|greet_bg.wasm.d.ts|greet.d.ts'
        .split('|').forEach(filename => rmSync(
            join(outDir, filename),
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
    console.log(green('OK!') + '\n', result);

    // This project has set `"type": "module"` in 'package.json',
    // so rename 'greet.js' (which uses `require()`) to 'greet.cjs'.
    renameSync(join(outDir, 'greet.js'), join(outDir, 'greet.cjs'));

} catch (err) { console.error(red('Error!') + '\n', err); process.exit(1) }
