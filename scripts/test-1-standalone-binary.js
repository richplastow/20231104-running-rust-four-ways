// scripts/test-1-standalone-binary.js

import { equal } from 'node:assert';
import { execSync } from 'node:child_process';
import { green, red } from '../helpers/ansi.js';

// Get the path to the compiled binary app.
const path = process.platform.slice(0, 3) === 'win'
  ? 'dist\\1-standalone-binary\\greet.exe'
  : './dist/1-standalone-binary/greet'

// Run the tests, and then show a 'Pass!' or 'Fail!' message.
try {
    const result1 = execSync(path).toString();
    equal(result1, 'Hello from Rust, standalone binary app!\n');

    const result2 = execSync(
        `${path} "console arguments user" extra args`
    ).toString();
    equal(result2, 'Hello from Rust, console arguments user!\n');

    console.log(green('Pass!') + 'Both 1-standalone-binary tests passed');
} catch (err) { console.error(red('Fail!') + '\n', err); process.exit(1) }
