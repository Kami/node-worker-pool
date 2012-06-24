var path = require("path");
 
exports.testDir = path.dirname(__filename);
exports.fixturesDir = path.join(exports.testDir, "fixtures");
exports.libDir = path.join(exports.testDir, "../../lib");
 
require.paths.unshift(exports.libDir);
 
var assert = require('assert');
var util = require('util');

exports.path = path;

var ok = assert.ok;
assert.ok = function (bool, msg) {
  if(bool) {
    util.print("OK ")
  } else {
    util.print("NOT OK ")
  }
  util.puts(msg);
}