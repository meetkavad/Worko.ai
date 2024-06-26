module.exports = {
  testEnvironment: "node",
  coverageDirectory: "coverage",
  collectCoverage: true,
  collectCoverageFrom: [
    "controllers/**/*.js",
    "services/**/*.js",
    "middlewares/**/*.js",
    "routes/**/*.js",
  ],
  coverageReporters: ["text", "lcov"],
};
