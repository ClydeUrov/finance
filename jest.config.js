/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|svg)$": "<rootDir>/src/__mocks__/fileMock.js"
  },
  //   '\\.(css|less)$': '<rootDir>/__mocks__/styleMock.js',
  //   "\\.(png|jpg)$": "<rootDir>/src/icons/Nvidia.png"
  // },
  transformIgnorePatterns: [
    '/node_modules/',
    '\\.css$',
    "\\.p(ng|ug)$"
  ],
};