"use strict";

import * as exceptions from "../core/exceptions.js";

/**
 * Reads value from storage by given key.
 *
 * @param {string} key
 * @returns {object} value
 */
export function getItem(key) {
  const result = localStorage.getItem(key);
  if (result) {
    return deserialize(result);
  } else {
    throw exceptions.ValueNotFoundException;
  }
}

/**
 * Generates object from JSON string.
 *
 * @param {string} stringValue
 * @returns {object} deserialized object
 */
function deserialize(stringValue) {
  return JSON.parse(stringValue);
}

/**
 * Saves value to storage by given key
 *
 * @param {string} key
 * @param {object} value
 * @returns {boolean} true, if successful.
 */
export function saveItem(key, value) {
  localStorage.setItem(key, serialize(value));
  return true;
}

/**
 * Serializes object to JSON string.
 *
 * @param {object} value
 * @returns {string} JSON string.
 */
function serialize(value) {
  return JSON.stringify(value);
}
