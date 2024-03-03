"use strict";

/**
 * Reads value from storage by given key
 *
 * @param {string} key
 * @returns {object} value
 */
export function getItem(key) {
  return deserialize(localStorage.getItem(key));
}

/**
 * Generates object from JSON string
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
 * @returns
 */
export function saveItem(key, value) {
  return localStorage.setItem(key, serialize(value));
}

/**
 * Serializes object to JSON string
 *
 * @param {object} value
 * @returns {string} JSON string
 */
function serialize(value) {
  return JSON.stringify(value);
}
