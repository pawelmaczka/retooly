const fs = require('fs');
const shell = require('shelljs');
const setHelpers = require('./setHelpers');

const CONFIG_PATH = './.retooly.json';

module.exports = function plopMain(plop) {
  const currentPath = process.env.INIT_CWD;

  setHelpers(plop);

  let config;
  let packageJson;

  try {
    const data = fs.readFileSync(CONFIG_PATH, {
      encoding: 'utf8',
      flag: 'r',
    });

    config = JSON.parse(data);
  } catch (err) {
    console.log('Config file not found');
  }

  try {
    const data = fs.readFileSync('./package.json', {
      encoding: 'utf8',
      flag: 'r',
    });

    packageJson = JSON.parse(data);
  } catch (err) {
    console.log('package.json not found');
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
        templateFile: `templates/${
          config?.projectType === 'React-Native' ? 'componentRN' : 'component'
        }.hbs`,
      },
      ...(config?.projectType === 'React-Native'
        ? []
        : [{
          type: 'add',
          path: `${currentPath}/{{name}}/{{name}}.module.scss`,
          templateFile: `templates/styles.hbs`,
        }]
      ),
      function lint(answers) {
        if (
          packageJson?.dependencies?.eslint ||
          packageJson?.devDependencies?.eslint
        ) {
          try {
            shell.exec(
              `./node_modules/eslint/bin/eslint.js "${currentPath}/${answers.name}" --fix`
            );
          } catch (err) {
            console.log("Couldn't lint the code");
          }
        }
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
        const updatedConfig = {
          ...(config || {}),
          ...answers,
        };

        try {
          fs.writeFileSync(CONFIG_PATH, JSON.stringify(updatedConfig));
        } catch (err) {
          console.log("Something went wrong. Couldn't save config file: ", err);
        }
      },
    ],
  });

  plop.setGenerator('Set project type (React / React-Native)', {
    description: 'Configures project type',
    prompts: [
      {
        type: 'list',
        name: 'projectType',
        message: 'Select project type',
        choices: ['React', 'React-Native'],
        default: config?.projectType ?? [],
      },
    ],
    actions: [
      function saveConfig(answers) {
        const updatedConfig = {
          ...(config || {}),
          ...answers,
        };

        try {
          fs.writeFileSync(CONFIG_PATH, JSON.stringify(updatedConfig));
        } catch (err) {
          console.log("Something went wrong. Couldn't save config file: ", err);
        }
      },
    ],
  });
};
