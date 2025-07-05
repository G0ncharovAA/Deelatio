"use strict";

import * as exceptions from "../core/exceptions.js";
import * as logger from "../core/logger.js";
import * as serialization from "../core/serialization.js";

/**
 *
 */
export function initStorageEventListener(storageEventListener) {
  onstorage = (event) => {
    storageEventListener(event);
  };
}

/**
 * Reads value from storage by given key.
 *
 * @param {string} key
 * @returns {object} value
 */
export function getItem(key) {
  const result = localStorage.getItem(key);
  if (result) {
    return serialization.deserialize(result);
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
  localStorage.setItem(key, serialization.serialize(value));
  return true;
}
