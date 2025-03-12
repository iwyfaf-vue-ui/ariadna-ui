import { Builder } from './system/builder';
import inquirer from 'inquirer';

{
  inquirer
    .prompt([
      {
        type: 'confirm',
        name: 'update',
        message: 'Update lib dependencies?',
      },
      {
        type: 'list',
        name: 'stack',
        message: 'Select application stack',
        choices: ['Vue 3 + Vite + TypeScript', 'Vue 2 + Vite + TypeScript'],
      },
    ])
    .then((answers) => {
      new Builder(answers.update, answers.stack);
    });
}
