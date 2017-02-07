import Inferno from "inferno";

export default ({ ready, run, purgeBrowserCaches, running }) => (
  <div className="footer">
    <div>
      <button onClick={ready & !running ? run : () => {}} className="btn btn-primary" data-tooltip="Minify (⌘ + ⏎ )">
        {ready & !running ? "✂" : "..."}
      </button>
    </div>
    <div>
      <button onClick={purgeBrowserCaches} className="btn btn-harmful" data-tooltip="Purge Caches">
        <img src="/static/ic_delete_forever_white_24px.svg" width="24" height="24" />
      </button>
    </div>
  </div>
);
