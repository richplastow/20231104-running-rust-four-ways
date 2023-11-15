// dist/2-node-wrapper/wrapper.js

import child_process from 'node:child_process';
import { red } from '../../helpers/ansi.js';

// Get the path to the compiled binary app.
const path = process.platform.slice(0, 3) === 'win'
  ? 'dist\\1-standalone-binary\\greet.exe'
  : './dist/1-standalone-binary/greet'

export const wrapper = (text) => {
    try {
        const result = child_process.execSync(
            `${path} "${text || 'Node.js wrapper app'}"`
        ).toString().trim();
        return result || '[no output]';
    } catch (err) { console.error(red('Error!') + '\n', err); process.exit(1) }
};
