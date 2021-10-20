module.exports = function plopMain(plop) {
  const currentPath = process.env.INIT_CWD;

  plop.setGenerator('component', {
    description: 'application component logic',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'component name please',
      },
    ],
    actions: [
      {
        type: 'add',
        path: `${currentPath}/{{name}}.js`,
        templateFile: 'templates/component.hbs',
      },
    ],
  });
};
