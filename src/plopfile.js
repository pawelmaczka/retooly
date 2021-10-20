module.exports = function plopMain(plop) {
  const currentPath = process.env.INIT_CWD;

  plop.setGenerator('Component', {
    description: 'Create component in current directory',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Provide component name',
      },
    ],
    actions: [
      {
        type: 'add',
        path: `${currentPath}/index.js`,
        templateFile: 'templates/index.hbs',
      },
      {
        type: 'add',
        path: `${currentPath}/{{name}}.js`,
        templateFile: 'templates/component.hbs',
      },
    ],
  });
};
