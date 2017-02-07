import Inferno from "inferno";

export default () => (
  <div className="row center header">
    <h1 className="title">Babili</h1>
    <a className="link" id="current-branch-placeholder" href="https://github.com/babel/babili">
      Current tree: master
    </a>
    <a href="https://babeljs.io/repl/#?babili=true&amp;evaluate=false" className="link" target="_blank">
      Probably buggy, use the Official REPL
    </a>
    <a href="https://github.com/babel/babili" className="img-link" target="_blank">
      <img src="/static/GitHub-Mark-Light-32px.png" width="30" height="30" />
    </a>
  </div>
);
