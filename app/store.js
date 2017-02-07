import { observable, action } from "mobx";

export default ({ minifier }) => observable({
  running: false,
  ready: false,
  input: "",
  opts: {},
  output: "",
  purging: false,
  boot: action(function() {
    this.ready = true;
  }),
  updateInput: action(function(newValue) {
    this.input = newValue;
  }),
  updateOutput: action(function(newValue) {
    this.output = newValue;
    this.running = false;
  }),
  run: action(function() {
    this.running = true;
    minifier.postMessage({
      input: this.input,
      opts: this.opts
    });
  }),
  purgeBrowserCaches: action(function() {
    this.purging = true;
  }),
  completePurge: action(function() {
    this.purging = false;
  })
});
