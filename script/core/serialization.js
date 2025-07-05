"use strict";

/**
 * Serializes object to JSON string.
 *
 * @param {object} value
 * @returns {string} JSON string.
 */
export function serialize(value) {
  return JSON.stringify(value);
}

/**
 * Generates object from JSON string.
 *
 * @param {string} stringValue
 * @returns {object} deserialized object
 */
export function deserialize(stringValue) {
  return JSON.parse(stringValue);
}
