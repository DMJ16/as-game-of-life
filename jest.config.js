export default {
  name: "as-game-of-life",
  preset: "ts-jest",
  verbose: true,
  globals: {
    "ts-jest": {
      tsConfig: "tsconfig.test.json",
    },
  },
  testEnvironment: "node",
  roots: ["<rootDir>/web/__test__/"],
  transform: {
    "^.+\\.(t|j)sx?$": "ts-jest",
  },
  transformIgnorePatterns: [
    "<rootDir>/node_modules/(?!(use-)as-bind/(src|dist)/.*)",
  ],
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  snapshotSerializers: ["enzyme-to-json/serializer"],
  setupFilesAfterEnv: ["<rootDir>/web/__test__/setupEnzyme.ts"],
};
