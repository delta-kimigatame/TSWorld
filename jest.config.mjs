export default {
  transform: {},
  extensionsToTreatAsEsm: [".ts"],
  preset: "ts-jest/presets/default-esm",
  globals: {
    "ts-jest": {
      useESM: true
    }
  },
  moduleFileExtensions: ["js", "ts"],
  setupFiles: ['<rootDir>/setup/jestSetup.js'],
  testEnvironment: "jsdom", 
};