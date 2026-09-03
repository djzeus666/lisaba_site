const Module = require("module");
const nextEnv = require("@next/env");

const originalLoad = Module._load;
Module._load = function (request, parent, isMain) {
  if (request === "@next/env") {
    return { ...nextEnv, default: nextEnv, loadEnvConfig: nextEnv.loadEnvConfig };
  }
  return originalLoad.apply(this, arguments);
};
