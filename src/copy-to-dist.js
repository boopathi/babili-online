const fse = require("fs-extra");
const path = require("path");

if (require.main === module) {
  copy(path.join(__dirname, "../"), [
    "index.html",
    "favicon.ico",
    "static",
    "sw.js"
  ], path.join(__dirname, "../dist"));
}

function copy(src, items, dest) {
  items.forEach(item => {
    const itemPath = path.join(src, item);
    const destPath = path.join(dest, item);
    fse.copySync(itemPath, destPath);
    console.log(`Copied ${itemPath} to ${destPath}`);
  });
}
