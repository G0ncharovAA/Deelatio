"use strict";

let field = 0;

export function doSomething() {
  console.log("hello level 2");
}

export function set(value) {
  field = value;
}

export function get() {
  return field;
}
