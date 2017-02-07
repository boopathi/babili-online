import Inferno from "inferno";
import Component from "inferno-component";
import { connect } from "inferno-mobx";

import Header from "./Header";
import Footer from "./Footer";
import InputBox from "./InputBox";
import OutputBox from "./OutputBox";

class App extends Component {
  constructor(...args) {
    super(...args);
    this.updateInput = this.updateInput.bind(this);
    this.run = this.run.bind(this);
    this.purgeBrowserCaches = this.purgeBrowserCaches.bind(this);
  }
  updateInput(newValue) {
    this.props.store.updateInput(newValue);
  }
  run() {
    this.props.store.run();
  }
  purgeBrowserCaches() {
    this.props.store.purgeBrowserCaches();
  }
  render() {
    return (
      <div className="fill-height column">
        <Header />
        <div className="fill-height row">
          <div className="column fill-height">
            <InputBox updateInput={this.updateInput} run={this.run} />
          </div>
          <div className="column fill-height">
            <OutputBox output={this.props.store.output} />
          </div>
        </div>
        <Footer
          ready={this.props.store.ready}
          run={this.run}
          purgeBrowserCaches={this.purgeBrowserCaches}
          running={this.props.store.running}
        />
      </div>
    );
  }
}

export default connect(["store"], App);
