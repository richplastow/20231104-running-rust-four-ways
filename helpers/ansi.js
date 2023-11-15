// helpers/ansi.js

/** Makes functions which wrap text in ANSI styling.
 * @param {number} bg  An ANSI 256-color code */
const ansi = (bg) => (text) => `\x1b[31;97;48;5;${bg}m ${text} \x1b[0m `;

/** Wraps text in a red-background ANSI code, followed by a space.
 * @param {string} text */
export const red = ansi(52);

/** Wraps text in a green-background ANSI code, followed by a space.
 * @param {string} text */
export const green = ansi(22);

/** Wraps text in a blue-background ANSI code, followed by a space.
 * @param {string} text */
export const blue = ansi(18);
