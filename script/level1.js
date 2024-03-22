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

function checkNumber(input) {
  if (typeof input !== "number") {
    throw new Error("Input must be a number");
  } else {
    return `Input is a number: ${input}`;
  }
}

function tryToCheckNumber(input) {
  try {
    console.log(checkNumber(input));
  } catch (exception) {
    return exception;
  }
}

export function tryToCatch() {
  const pos = tryToCheckNumber(2);
  const neg = tryToCheckNumber(`two`);

  let posB;
  if (pos) {
    posB = true;
  } else {
    posB = false;
  }

  let negB;
  if (neg) {
    negB = true;
  } else {
    posB = false;
  }

  const isEx = neg instanceof Error;

  console.log(`try and catch results:`, pos, posB, neg, negB, isEx);
  console.log(`done`);
}

export function throwAnException() {
  return 1 / 0;
}

export function makeDivision(n, m) {
  try {
    return n / m;
  } catch (exception) {
    return exception + " ex";
  }
}
