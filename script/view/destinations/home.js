"use strict";

import { Destinations } from "../../core/entities/destinations.js";
import * as logger from "../../core/logger.js";
import { setOnDescendantClickListener } from "../utils.js";

const ABOUT_BUTTON_ID = "ABOUT-BUTTON-ID";
const CHANNEL_PLAYGROUND_BUTTON_ID = "CHANNEL-PLAYGROUND-BUTTON-ID";

/**
 * Creates destination element and inserts it into given container with given arguments.
 * @param {DOM_Node} container - empty DOM node to be placed in.
 * @param {object} args - arguments.
 * @param {Function} navigationDelegate - incapsulates navigation from navigation.js Takes Destination enum and args
 * @returns {DOM_Node} - element created.
 */
export function create(container, args, navigationDelegate) {
  container.insertAdjacentHTML(
    `beforeend`,
    `
    <div class="${Destinations.HOME} match-parent centered column">
      <h1>This is HOME screen<h1>
      <button class="${ABOUT_BUTTON_ID}">to ABOUT!</button>
      <button class="${CHANNEL_PLAYGROUND_BUTTON_ID}">to ChannelPlayground!</button>
    </div>
    `
  );
  const home_element = container.querySelector(`.${Destinations.HOME}`);
  if (home_element) {
    return alterate(home_element, args, navigationDelegate);
  } else {
    return false;
  }
}

/**
 * alterates destination in the given container with given arguments. Takes existing HOME element to display new
 * @param {DOM_Node} element - This destinatio DOM node.
 * @param {object} args - arguments.
 * @param {Function} navigationDelegate - incapsulates navigation from navigation.js Takes Destination enum and args object.
 * @returns {boolean} - true if successful.
 */
export function alterate(element, args, navigationDelegate) {
  setOnDescendantClickListener(element, ABOUT_BUTTON_ID, () => {
    logger.log("on home click!");
    navigationDelegate(Destinations.ABOUT, {});
  });
  setOnDescendantClickListener(element, CHANNEL_PLAYGROUND_BUTTON_ID, () => {
    logger.log("on home to playground click!");
    navigationDelegate(Destinations.CHANNEL_PLAYGROUND, {});
  });
  return true;
}
