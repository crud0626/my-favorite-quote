/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  collectCoverage: true,
  coverageDirectory: "coverage",
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFiles: ['<rootDir>/src/test/mocks/sessionStorageMock.ts'],
  moduleNameMapper: {
    '^\~\/': '<rootDir>/src/',
  }
};