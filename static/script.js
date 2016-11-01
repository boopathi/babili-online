(function() {
  "use strict";

  var input = document.getElementById("input");
  var output = document.getElementById("output");
  var run = document.getElementById("run");
  var purge = document.getElementById("purge");
  var toolbox = document.querySelector(".tools");

  var minifier = new Worker("static/worker.js");
  var cachename = "babili-1";

  // ace boot up
  ace.config.set("modePath", "https://cdn.jsdelivr.net/ace/1.2.3/min/");
  ace.config.set("workerPath", "https://cdn.jsdelivr.net/ace/1.2.3/min/");
  ace.config.set("themePath", "https://cdn.jsdelivr.net/ace/1.2.3/min/");
  var editor = ace.edit("input");
  editor.getSession().setMode("ace/mode/javascript");
  editor.getSession().setOptions({ tabSize: 2, useSoftTabs: true });
  editor.$blockScrolling = Infinity;

  // state
  var state = {
    running: false,
    readyText: "✂",
    loadingText: "...",
    replaceTimeout: null,
    enableRun: function() {
      this.running = false;
      clearTimeout(this.replaceTimeout);
      run.innerHTML = this.readyText;
      run.disabled = false;
    },
    disableRun: function() {
      this.running = true;
      var loadingText = this.loadingText;
      this.replaceTimeout = setTimeout(function () {
        run.innerHTML = loadingText;
      }, 80);
      run.disabled = true;
    },
    run: function () {
      if (!this.running) {
        this.disableRun();
        editor.focus();
        minifier.postMessage({
          input: editor.getValue(),
        });
      } else {
        console.log("already running");
      }
    }
  };

  state.disableRun();

  // Boot up
  Promise.resolve()
    .then(queueUpMinifierLoad)
    .then(attachListeners)
    .then(populateEditor)
    .catch(function (err) {
      throw err;
    });

  function queueUpMinifierLoad() {
    minifier.postMessage({ start: true });
  }

  function populateEditor() {
    return localforage.getItem(cachename).then(value => {
      if (value) editor.setValue(value, -1);
      editor.focus();
    });
  }

  function attachListeners() {
    document.body.addEventListener("keydown", function (e) {
      if ((e.ctrlKey || e.metaKey) && e.keyCode === 13) {
        e.preventDefault();
        e.stopPropagation();
        state.run();
      }
    });

    editor.on("input", function() {
      localforage.setItem(cachename, editor.getValue());
    });

    run.addEventListener("click", function(e) {
      e.preventDefault();
      state.run();
    });

    minifier.addEventListener("message", function(out) {
      state.enableRun();
      if (typeof out.data === "string") {
        var percentage = 100 * (1 - out.data.length / editor.getValue().length);
        console.log("Compression percentage = ", percentage);
        output.value = out.data;
      }
    });

    purge.addEventListener("click", function(e) {
      console.log("removing all caches");
      removeCaches().then(function() {
        console.log("removing all caches [done]");
      });
    });
  }

  function removeCaches() {
    let p = [localforage.clear()];
    if (caches) {
      p.push(caches.keys().then(function(keylist) {
        return Promise.all(keylist.map(function(key) {
          return caches.delete(key);
        }));
      }));
    }
    return Promise.all(p);
  }

  // service worker
  if (navigator.serviceWorker) {
    navigator.serviceWorker.register("sw.js").then(function(reg) {
      purge.addEventListener("click", function(e) {
        console.log("removing sw");
        reg.unregister().then(function() {
          console.log("removing sw [done]");
        });
      });
    });
  }
})();

function debounce(func, wait, immediate) {
  "use strict";
  var timeout;
  return function() {
    var context = this, args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};
