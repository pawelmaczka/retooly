module.exports = function plopMain(plop) {
  plop.addHelper('cwd', () => process.cwd());

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
        path: '{{cwd}}/{{name}}.js',
        // templateFile: 'plop-templates/controller.hbs',
      },
    ],
  });
};
