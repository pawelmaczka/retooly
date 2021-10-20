module.exports = function plopMain(plop) {
  const currentPath = process.env.INIT_CWD;

  plop.setGenerator('controller', {
    description: 'application controller logic',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'controller name please',
      },
    ],
    actions: [
      {
        type: 'add',
        path: `${currentPath}/{{name}}.js`,
        // templateFile: 'plop-templates/controller.hbs',
      },
    ],
  });
};
