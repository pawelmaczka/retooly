const imports = require('./imports');

const newLine = `
`;

const setHelpers = (plop) => {
  plop.setHelper('imports', (packages) =>
    [...packages.map((pkg) => imports[pkg]), ''].join(newLine)
  );
};

module.exports = setHelpers;
