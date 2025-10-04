const fs = require('fs');
const path = require('path');
const Module = require('module');
const ts = require('typescript');

const projectRoot = path.resolve(__dirname, '..');

const compilerOptions = {
  module: ts.ModuleKind.CommonJS,
  target: ts.ScriptTarget.ES2019,
  jsx: ts.JsxEmit.ReactJSX,
  esModuleInterop: true,
  moduleResolution: ts.ModuleResolutionKind.NodeJs,
  resolveJsonModule: true,
  allowSyntheticDefaultImports: true,
};

const originalResolveFilename = Module._resolveFilename;
Module._resolveFilename = function (request, parent, isMain, options) {
  if (request.startsWith('@/')) {
    const resolved = path.join(projectRoot, 'src', request.slice(2));
    return originalResolveFilename.call(this, resolved, parent, isMain, options);
  }
  return originalResolveFilename.call(this, request, parent, isMain, options);
};

const compile = (module, filename) => {
  const source = fs.readFileSync(filename, 'utf8');
  const { outputText } = ts.transpileModule(source, {
    compilerOptions,
    fileName: filename,
  });
  module._compile(outputText, filename);
};

Module._extensions['.ts'] = compile;
Module._extensions['.tsx'] = compile;
