import toolbox from "sw-toolbox";

toolbox.cache.name = "babili-" + 6;

toolbox.precache([
  "static/script.js",
  "static/worker.js",
  "static/styles.css",
  "./",
  "//cdn.jsdelivr.net/ace/1.2.3/min/ace.js",
  "build/babel-preset-babili.js",
  "build/babel-core.js"
]);

toolbox.router.get("/", toolbox.fastest);
toolbox.router.get("/*", toolbox.cacheFirst);
toolbox.router.get("/*", toolbox.cacheFirst, { origin: "cdn.jsdelivr.net" });
toolbox.router.get("/*", toolbox.cacheFirst, { origin: "fonts.googleapis.com" });
