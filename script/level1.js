"use strict";

import * as level2 from "./view/level2.js";

export function doSomething() {
  console.log("hello level 1");
  level2.doSomething();
}

export function set(value) {
  level2.set(value);
}

export function get() {
  return level2.get();
}
