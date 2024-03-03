"use strict";

const DEBUG_MODE = true;

/**
 * Make log entry if it is debug mode
 *
 * @param {...any} message
 */
export function log(...message) {
  if (DEBUG_MODE) {
    console.log(...message);
  }
}
