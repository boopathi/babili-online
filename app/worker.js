import { transform } from "babel-core";
import babelPresetBabili from "babel-preset-babili";

self.addEventListener("message", ({ data }) => {
  if (data.start) {
    return self.postMessage({
      ready: true
    });
  }

  const { input, opts } = data;

  try {
    const result = transform(input, {
      presets: [babelPresetBabili],
      minified: false,
      comments: false
    });
    self.postMessage(result.code);
  } catch (err) {
    console.log(err);
    self.postMessage(err.toString());
    throw err;
  }
});
