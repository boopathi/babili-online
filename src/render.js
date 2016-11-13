const hbs = require("handlebars");
const path = require("path");
const fs = require("fs");
const exec = require("child_process").execSync;
const request = require("request");

const PR_API_URL = "https://api.github.com/repos/babel/babili/pulls";
const babiliPreset = require.resolve("babel-preset-babili");
const REPO_URL = "https://github.com/babel/babili";

module.exports = render;

function render() {
  const templateContents = fs.readFileSync(path.join(__dirname, "index.hbs")).toString();
  const hbsRenderer = hbs.compile(templateContents);

  const gitdir = path.dirname(babiliPreset);
  const branchName = getBranchName(gitdir);

  let githubPromise;

  if (branchName === "master") {
    githubPromise = Promise.resolve({
      url: REPO_URL,
      tree: "master"
    });
  } else {
    githubPromise = getPullRequest(branchName)
      .then(pr => ({
        url: pr.html_url,
        tree: "PR#" + pr.number
      }));
  }

  return githubPromise
    .then(github => ({
      github,
      html: hbsRenderer({
        git: {
          branchName,
          branchUrl: `${REPO_URL}/tree/${branchName}`,
        },
        github,
      })
    }))
    .then(({html, github}) => {
      fs.writeFileSync(path.join(__dirname, "../index.html"), html);
      return github;
    })
    .then(github => {
      // send results
      return {
        branchName,
        github
      }
    });
}

if (require.main === module) {
  render().then(result => {
    console.log("Rendered index.html");
    console.log("Branch:\t", result.branchName);
    console.log("PR:\t", result.github.tree);
  });
}

function getPullRequest(branchName) {
  return getAllPullRequests(branchName)
    .then(prs => prs[0]);
}

function getAllPullRequests(branchName) {
  return new Promise((resolve, reject) => {
    request.get({
      url: PR_API_URL + "?head=babel:" + branchName,
      headers: {
        "User-Agent": "request"
      }
    }, function (err, resp, body) {
      if (err) {
        return reject(err);
      }
      if (resp.status < 200 || resp.status > 300) {
        return reject(new Error("Response Error:\n" + body));
      }
      resolve(JSON.parse(body));
    });
  });
}

function getBranchName(dir) {
  return exec("git symbolic-ref -q --short head", {
    cwd: dir
  }).toString().trim();
}
