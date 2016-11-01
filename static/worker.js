var fs = {};
var net = {};
var module = {};

importScripts("build/babel-core.js");
importScripts("build/babel-preset-babili.js");

self.addEventListener('message', function(e) {
  if (e.data.start) {
    return self.postMessage({
      ready: true
    });
  }

  var input = e.data.input;
  var opts = e.data.opts;
  try {
    var result = Babel.transform(input, {
      presets: [BabiliPreset],
      compact: true,
      minified: true,
      comments: false
    });
  } catch (err) {
    console.log(err);
    self.postMessage(err.toString());
    throw err;
  }
  self.postMessage(result.code);
});
