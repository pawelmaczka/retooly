const imports = require('./imports');

const newLine = `
`;

const setHelpers = (plop) => {
  plop.setHelper('imports', (packages) =>
    [...packages.map((pkg) => imports[pkg]), ''].join(newLine)
  );

  plop.setHelper(
    'camelCase',
    (text) => `${text[0].toLowerCase()}${text.substring(1)}`
  );
};

module.exports = setHelpers;
