const Hook = require('require-in-the-middle');

/**
 * This module only wrap the require function
 */
function patchModules(modules, instrumentationInstance) {
  Hook(modules, (exports, name, basedir) => {
    // basedir = undefined when is a core module
    if (basedir) {
      // TODO: implement here if necessary to patch npm packages
    } else {
      exports = require(`./${name}.js`)(instrumentationInstance, exports);
    }
    return exports
  });
}

module.exports = {
  patchModules,
};
