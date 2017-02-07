import Inferno from "inferno";

export default ({ output }) => (
  <textarea className="fill-height" value={output}>
    {output}
  </textarea>
);
