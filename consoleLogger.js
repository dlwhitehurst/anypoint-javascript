// consoleLogger.js
const { Console } = require('console'); // import for class Console
require('console-stamp')(console, {
  pattern: 'dd/mm/yyyy HH:MM:ss.l',
  colors: {
    stamp: 'yellow',
    label: 'white',
    metadata: 'green',
  },
});

const minimist = require('minimist');

const args = minimist(process.argv.slice(2), {
  string: 'artifact', // --artifact emp-xapi
  alias: { a: 'artifact' },
});

const fs = require('fs');

const output = fs.createWriteStream(`./${args.a}-stdout.log`);
const errorOutput = fs.createWriteStream(`./${args.a}-stderr.log`);
const logger = new Console(output, errorOutput);

require('console-stamp')(logger, { stdout: output, stderr: errorOutput, pattern: 'dd/mm/yyyy HH:MM:ss.l' });

function main() {
  let retVal = -1;

  console.info('Hello, David L. Whitehurst');
  logger.info('Hello, David L. Whitehurst');
  logger.error('Just testing this error');

  retVal = 0;
  return retVal;
}


module.exports = {
  main,
};

main();
