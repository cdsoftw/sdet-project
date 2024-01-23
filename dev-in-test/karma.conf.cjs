/*eslint-env node*/
"use strict";

module.exports = function (config) {
  config.set({
    frameworks: ["jasmine"],
    files: [
      { pattern: "source/**.js", type: "module" },
      { pattern: "specs/**Spec.js", type: "module" },
    ],
    reporters: ["spec"],
    browsers: ["ChromeHeadless"],
    singleRun: true,
  });
};
