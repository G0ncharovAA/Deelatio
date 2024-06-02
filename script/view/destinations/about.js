"use strict";

/**
 * Shows ABOUT destination in the given container with given arguments.
 * @param {DOM_Node} container - empty DOM node to be placed in.
 * @param {object} args - arguments.
 * @param {Function} navigationDelegate - incapsulates navigation from navigation.js
 * @returns {boolean} - true if successful.
 */
export function showAbout(container, args, navigationDelegate) {
  console.log(`about adding`);
  container.insertAdjacentHTML(
    `beforebegin`,
    `
    <h1>This is ABOUT screen<h1>
    `
  );
  console.log(`about added`);
  return true;
}
