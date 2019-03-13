// run.js

const fs = require('fs');
const minimist = require('minimist');
const shell = require('shelljs');

require('console-stamp')(console, { pattern: 'dd/mm/yyyy HH:MM:ss.l' });

const args = minimist(process.argv.slice(2), {
  string: 'client-props', // --client-props emp-xapi-env.properties
  alias: { c: 'client-props' },
});

function encryptTest() {
  // java -jar secure-properties-tool.jar string encrypt AES CBC 1111222233334444 TestValue
  shell.exec('java -jar secure-properties-tool.jar string encrypt AES CBC 1111222233334444 TestValue');
}

function main() {
  let props;

  console.log(`Processing  ${args.c} ...`);

  try {
  /*
    if (!shell.which('java')) {
      shell.echo('Sorry, this script requires an installation of Java.');
      shell.exit(1);
    }
  */
    shell.exec('java -version'); // proves Java available
    console.log(shell.exec('java -jar secure-properties-tool.jar string encrypt AES CBC 1111222233334444 TestValue'));

    // project (clone)/etc/properties-files
    props = fs.readFileSync(`props/${args.c}`, 'utf8');
    console.info(props);
  } catch (err) {
    console.log('File does not exist!');
  }

  encryptTest();
}

main();
