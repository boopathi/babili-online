importScripts("build/sw-toolbox.js");

toolbox.cache.name = "babili-" + 6;

toolbox.precache([
  "static/script.js",
  "static/worker.js",
  "build/babel-core.js",
  "build/babel-preset-babili.js",
  "static/styles.css",
  "./",
  "//cdn.jsdelivr.net/localforage/1.4.2/localforage.min.js",
  "//cdn.jsdelivr.net/ace/1.2.3/min/ace.js",
  "static/ic_delete_forever_white_24px.svg",
  "//fonts.googleapis.com/css?family=Roboto:300,400"
]);

toolbox.router.get("/", toolbox.fastest);
toolbox.router.get("/*", toolbox.cacheFirst);
toolbox.router.get("/*", toolbox.cacheFirst, { origin: "cdn.jsdelivr.net" });
toolbox.router.get("/*", toolbox.cacheFirst, { origin: "fonts.googleapis.com" });
