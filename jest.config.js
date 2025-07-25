module.exports = {
    transform: {
      '^.+\\.(js|jsx|ts|tsx)$': ["babel-jest", { configFile: "./babel.jest.config.js" }],
    },
    moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
    testEnvironment: 'node',
  };
  