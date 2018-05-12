const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');
const chalk = require('chalk');

const log = console.log;

// Define some helper functions

// Check that the file exists, if it does exist then the
// programme may proceed, else kill it and alert the user
// via a prompt in the terminal.
fileExists = (file) => {
  try {
    return fs.statSync(file).isFile();
  } catch (err) {
    console.log(chalk.red('❗   That ain\'t no file ❗'))
    return false;
  }
}

getFilePath = () => {
  const getPath = [
    {
      name: 'file',
      type: 'input',
      message: 'Gimme the path to your file:',
      validate: (value) => {
        if (value.length) {
          return true;
        } else {
          return 'Hmm.. that doesn\'t seem right, try again'
        }
      }
    }
  ];
  return inquirer.prompt(getPath);
}

init = async () => {
  // try {
  const file = await getFilePath();
  if (fileExists(file.file)) {
    const fileArray = file.file.split('.');
    log(chalk.green('Let\'s do this!'));
    log(chalk(`We're going to convert ${chalk.underline.bold(file.file)} and create a new file called ${chalk.underline.bold(fileArray[0] + '-stringified.' + fileArray[1])}`));
  };
  // } catch {
  //   console.log(chalk.red('Woops'));
  // }
}

// Let's do this
init();