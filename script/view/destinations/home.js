"use strict";

import { Destinations } from "../../core/entities/destinations.js";
import * as logger from "../../core/logger.js";

const HOME_ELEMENT_ID = "HOME-ELEMENT";

/**
 * Shows HOME destination in the given container with given arguments.
 * @param {DOM_Node} container - empty DOM node to be placed in.
 * @param {object} args - arguments.
 * @param {Function} navigationDelegate - incapsulates navigation from navigation.js Takes Destination enum and args object.
 * @returns {boolean} - true if successful.
 */
export function showHome(container, args, navigationDelegate) {
  const home_element = create(container);
  if (home_element) {
    return alterate(home_element, args, navigationDelegate);
  } else {
    return false;
  }
}

/**
 * Creates HOME destination element and inserts it into given container with given arguments.
 * @param {DOM_Node} container - empty DOM node to be placed in.
 * @returns {DOM_Node} - element crated.
 */
function create(container) {
  container.insertAdjacentHTML(
    "beforeend",
    `
    <div class="${HOME_ELEMENT_ID}">
      <h1>This is HOME screen<h1>
      <button class="myButton">my button!</button>
    </div>
    `
  );
  const home_element = container.querySelector(`.${HOME_ELEMENT_ID}`);
  if (home_element) {
    return home_element;
  } else {
    return false;
  }
}

/**
 * alterrates HOME destination in the given container with given arguments. Takes HOME
 * @param {DOM_Node} home_element - empty DOM node to be placed in.
 * @param {object} args - arguments.
 * @param {Function} navigationDelegate - incapsulates navigation from navigation.js Takes Destination enum and args object.
 * @returns {boolean} - true if successful.
 */
function alterate(home_element, args, navigationDelegate) {
  const button = home_element.querySelector(`.myButton`);
  button.addEventListener("click", () => {
    navigationDelegate(Destinations.ABOUT, {});
  });
  return true;
}
