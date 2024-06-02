"use strict";

import * as logger from "./core/logger.js";
import * as level1 from "./level1.js";
import * as level2 from "./view/level2.js";
import * as navigation from "./view/navigation.js";

logger.log(`Script is read`);

// let worker;

// console.log(` worker:`, worker);

// async function registerSW() {
//   if (`serviceWorker` in navigator) {
//     window.addEventListener("load", () => {
//       worker = navigator.serviceWorker;
//       console.log(` worker:`, worker);
//       worker
//         .register(`./view/service-worker.js`)
//         .then((registration) => {
//           console.log(`Service worker registered:`, registration);
//         })
//         .catch((error) => {
//           console.error(`Service worker registration failed:`, error);
//         });
//     });
//   }
// }

// registerSW();

// level1.doSomething();

// logger.log(`field level1 `, level1.get());
// logger.log(`field level2 `, level2.get());
// level1.set(1);
// logger.log(`field level1 `, level1.get());
// logger.log(`field level2 `, level2.get());

// let root = document.getElementById(`root`);

// logger.log(`root`, root);

// level1.tryToCatch();

navigation.setup(
    document.querySelector("#root")
);