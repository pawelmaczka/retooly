const fs = require('fs');
const setHelpers = require('./setHelpers');

const CONFIG_PATH = './.retooly.json';

module.exports = function plopMain(plop) {
  const currentPath = process.env.INIT_CWD;

  setHelpers(plop);

  let config;

  try {
    const data = fs.readFileSync(CONFIG_PATH, {
      encoding: 'utf8',
      flag: 'r',
    });

    config = JSON.parse(data);
  } catch (err) {
    console.log('Config file not found');
  }

  plop.setGenerator('Component', {
    description: 'Create component in current directory',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Provide component name',
      },
      {
        type: 'checkbox',
        name: 'packages',
        message: 'Select packages to import',
        choices: ['styled-components', 'prop-types'],
        default: config?.packages ?? [],
      },
    ],
    actions: [
      {
        type: 'add',
        path: `${currentPath}/{{name}}/index.js`,
        templateFile: 'templates/index.hbs',
      },
      {
        type: 'add',
        path: `${currentPath}/{{name}}/{{name}}.js`,
        templateFile: 'templates/component.hbs',
      },
    ],
  });

  plop.setGenerator('Component - set default imports', {
    description:
      'Configures default imports for generated components and saves it in config file',
    prompts: [
      {
        type: 'checkbox',
        name: 'packages',
        message: 'Select packages to import',
        choices: ['styled-components', 'prop-types'],
        default: config?.packages ?? [],
      },
    ],
    actions: [
      function saveConfig(answers) {
        try {
          fs.writeFileSync(CONFIG_PATH, JSON.stringify(answers));
        } catch (err) {
          console.log("Something went wrong. Couldn't save config file: ", err);
        }
      },
    ],
  });
};
