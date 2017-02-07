import Inferno from "inferno";
import Component from "inferno-component";
import setupEditor from "./editor";

const INPUT_ID = "input";

export default class extends Component {
  constructor(...args) {
    super(...args);
    this.handleShortcut = this.handleShortcut.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }
  componentDidMount() {
    const editor = setupEditor(INPUT_ID);
    this.editor = editor;

    // attach listeners on editor
    editor.on("input", this.handleInput);
    editor.focus();

    if (window.location.hash.length > 1) {
      editor.setValue(decodeURIComponent(window.location.hash.substr(1)));
    }

    // keyboard shortcuts
    document.body.addEventListener("keydown", this.handleShortcut);
  }
  componentWillUnmount() {
    document.body.removeEventListener("keydown", this.handleShortcut);
  }
  handleInput() {
    const newValue = this.editor.getValue();
    this.props.updateInput(newValue);
    window.location.hash = encodeURIComponent(newValue);
  }
  handleShortcut(e) {
    if ((e.ctrlKey || e.metaKey) && e.keyCode === 13) {
      e.preventDefault();
      e.stopPropagation();
      this.props.run();
    }
  }
  render() {
    return <div id={INPUT_ID} className="fill-height" />;
  }
}
