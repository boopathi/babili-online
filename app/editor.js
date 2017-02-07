export default function setup() {
  ace.config.set("modePath", "https://cdn.jsdelivr.net/ace/1.2.3/min/");
  ace.config.set("workerPath", "https://cdn.jsdelivr.net/ace/1.2.3/min/");
  ace.config.set("themePath", "https://cdn.jsdelivr.net/ace/1.2.3/min/");

  const editor = ace.edit("input");
  editor.getSession().setMode("ace/mode/javascript");
  editor.getSession().setOptions({ tabSize: 2, useSoftTabs: true });
  editor.$blockScrolling = Infinity;

  return editor;
}
