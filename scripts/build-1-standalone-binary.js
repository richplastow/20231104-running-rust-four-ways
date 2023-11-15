// scripts/build-1-standalone-binary.js

import { execSync } from 'node:child_process';
import { rmSync } from 'node:fs';
import { join } from 'node:path';
import { green, red } from '../helpers/ansi.js';

// Get the distribution-folder path, and the compiled binary filename.
const dir = join('dist', '1-standalone-binary');
const file = process.platform.slice(0, 3) === 'win' ? 'greet.exe' : 'greet';

try {
    // Delete any files generated during a previous build.
    'greet|greet.exe|greet.pdb'.split('|').forEach(prevFile => rmSync(
        join(dir, prevFile),
        { force: true }, // don't stop if the file doesn't exist
    ));

    // Compile the binary, and then show an 'OK!' or 'Error!' message.
    const result = execSync(
        'rustc ' + // the Rust compiler
        'src/main.rs ' + // the main source file
        `-o ${join(dir, file)}` // the compiled binary app
    ).toString();
    console.log(green('OK!') + (result || 'rustc succeeded'));
} catch (err) { console.error(red('Error!') + '\n', err); process.exit(1) }
