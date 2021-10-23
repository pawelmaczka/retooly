const setHelpers = require('./setHelpers');

module.exports = function plopMain(plop) {
  const currentPath = process.env.INIT_CWD;

  setHelpers(plop);

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
        default: ['styled-components', 'prop-types'],
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
};
