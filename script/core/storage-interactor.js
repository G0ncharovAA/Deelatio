"use strict";

import * as storageRepository from "../data/storage-repository.js";
import * as logger from "./logger.js";

/**
 * Reads value from storage by given key.
 *
 * @param {string} key
 * @returns {object | Error} value
 */
export function getItem(key) {
  try {
    return storageRepository.getItem(key);
  } catch (error) {
    logger.e(error);
    return error;
  }
}

/**
 * Saves value to storage by given key.
 *
 * @param {string} key
 * @param {object} value
 * @returns {boolean | Error} true, if successful.
 */
export function saveItem(key, value) {
  try {
    return storageRepository.saveItem(key, value);
  } catch (error) {
    logger.e(error);
    return error;
  }
}
