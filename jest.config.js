/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  collectCoverage: true,
  coverageDirectory: "coverage",
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFiles: ['./src/test/mocks/sessionStorageMock.ts'],
  globals: {
    window: {}
  }
};