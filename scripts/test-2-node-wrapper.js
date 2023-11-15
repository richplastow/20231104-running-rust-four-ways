// scripts/test-2-node-wrapper.js

import { equal } from 'node:assert';
import child_process from 'node:child_process';
import { green, red } from '../helpers/ansi.js';
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

    console.log(green('Pass!') + 'All four 2-node-wrapper tests passed');
} catch (err) { console.error(red('Fail!') + '\n', err); process.exit(1) }
