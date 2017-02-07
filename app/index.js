import Inferno from "inferno";
import { Provider, observer } from "inferno-mobx";
import { observable } from "mobx";

import App from "./App";

import createMinifier from "./minifier";

const minifier = createMinifier();

minifier.postMessage({ start: true });
minifier.addEventListener("message", ({ data }) => {
  store.boot();
  if (typeof data === "string") {
    store.updateOutput(data);
  }
});

import createStore from "./store";
const store = createStore({ minifier });

Inferno.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// service worker
if (navigator.serviceWorker) {
  navigator.serviceWorker.register("/sw.js").then(reg => {
    console.log("SW Active");
    observer(({ purging }) => {
      if (purging && caches) {
        caches
          .keys()
          .then(keyList => Promise.all(keyList.map(key => caches.delete(key))))
          .then(() => {
            console.log("all caches removed");
            store.completePurge();
          })
          .catch(err => {
            console.error(err);
          });
      }
    });
  });
}
