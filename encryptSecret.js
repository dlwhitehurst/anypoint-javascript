// encryptSecret.js

const minimist = require('minimist');
const shell = require('shelljs');

require('console-stamp')(console, { pattern: 'dd/mm/yyyy HH:MM:ss.l' });

const args = minimist(process.argv.slice(2), {
  string: 'value', // --value abc123
  alias: { v: 'value' },
});

function encryptTest(value) {
  shell.exec(`java -jar secure-properties-tool.jar string encrypt AES CBC 1111222233334444 ${value}`);
}

function main() {
  if (!shell.which('java')) {
    shell.echo('Sorry, this script requires an installation of Java.');
    shell.exit(1);
  }
  shell.exec('java -version'); // proves Java available

  encryptTest(args.v);
}

main();
