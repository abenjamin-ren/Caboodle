/**
 * Interactive prompts using Node.js builtins only (no dependencies).
 */

import { createInterface } from "node:readline";

/**
 * Ask the user a question and return their answer.
 * @param {string} question - The prompt to display
 * @param {string} [defaultValue] - Default value if user presses Enter
 * @returns {Promise<string>}
 */
export function ask(question, defaultValue) {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const prompt = defaultValue ? `${question} [${defaultValue}]: ` : `${question}: `;

  return new Promise((resolve) => {
    rl.question(prompt, (answer) => {
      rl.close();
      resolve(answer.trim() || defaultValue || "");
    });
  });
}

/**
 * Ask a yes/no question.
 * @param {string} question - The prompt to display
 * @param {boolean} [defaultYes=true] - Whether default is yes
 * @returns {Promise<boolean>}
 */
export function confirm(question, defaultYes = true) {
  const suffix = defaultYes ? "[Y/n]" : "[y/N]";
  return ask(`${question} ${suffix}`).then((answer) => {
    if (!answer) return defaultYes;
    return answer.toLowerCase().startsWith("y");
  });
}
