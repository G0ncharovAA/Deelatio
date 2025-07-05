"use strict";

import { Destinations } from "../../core/entities/destinations.js";
import * as logger from "../../core/logger.js";
import { setOnDescendantClickListener } from "../utils.js";

const BACK_BUTTON_ID = "BACK-BUTTON-ID";

/**
 * Creates destination element and inserts it into given container with given arguments.
 * @param {DOM_Node} container - empty DOM node to be placed in.
 * @param {object} args - arguments.
 * @param {Function} navigationDelegate - incapsulates navigation from navigation.js Takes Destination enum and args
 * @returns {DOM_Node} - element crated.
 */
export function create(container, args, navigationDelegate) {
  container.insertAdjacentHTML(
    `beforeend`,
    `
    <div class="${Destinations.ABOUT} match-parent column">
      <h1>This is ABOUT screen</h1>
      <button class="${BACK_BUTTON_ID}">go back</button>
    </div>
    `
  );
  const about_element = container.querySelector(`.${Destinations.ABOUT}`);
  if (about_element) {
    return alterate(about_element, args, navigationDelegate);
  } else {
    return false;
  }
}

/**
 * alterates destination in the given container with given arguments. Takes existing HOME element to display new
 * @param {DOM_Node} element - empty DOM node to be placed in.
 * @param {object} args - arguments.
 * @param {Function} navigationDelegate - incapsulates navigation from navigation.js Takes Destination enum and args object.
 * @returns {boolean} - true if successful.
 */
export function alterate(element, args, navigationDelegate) {
  setOnDescendantClickListener(element, BACK_BUTTON_ID, () => {
    navigationDelegate(Destinations.BACKWARDS, {});
  });
  return true;
}
