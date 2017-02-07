export default function createMinifierWorker() {
  const minifier = new Worker("/static/worker.js");
  return minifier;
}
