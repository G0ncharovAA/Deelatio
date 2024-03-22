"use strict";

/**
 * Makes a deep copy of an object, using recursive approach.
 *
 * @param {any} obj
 * @returns {any}
 */
export function deepCopy(obj) {
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }
  let copy = Array.isArray(obj) ? [] : {};
  for (let key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      copy[key] = deepCopy(obj[key]);
    }
  }
  return copy;
}

/**
 * Compares two objects deeply, using recursive approach.
 *
 * @param {any} obj1
 * @param {any} obj2
 * @returns {boolean}
 */
export function deepCompare(obj1, obj2) {
  if (
    typeof obj1 === "object" &&
    typeof obj2 === "object" &&
    obj1 !== null &&
    obj2 !== null
  ) {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    if (keys1.length !== keys2.length) {
      return false;
    }
    for (let key of keys1) {
      if (!obj2.hasOwnProperty(key) || !deepCompare(obj1[key], obj2[key])) {
        return false;
      }
    }
    return true;
  } else {
    return obj1 === obj2;
  }
}
