"use strict";

import { Destinations } from "../../core/entities/destinations.js";
import * as logger from "../../core/logger.js";
import { removeAllListeners } from "../utils.js";
import myChannel from "../../core/example-channel.js";

const BACK_BUTTON_ID = "BACK-BUTTON-ID";
const CHANNEL_OUTPUT = "CHANNEL-OUTPUT";
const MY_SUBSRIPTION_ID = "MY_SUBSRIPTION_ID";
const CHANGE_BUTTON_ID = "CHANGE_BUTTON_ID";

/**
 * Creates destination element and inserts it into given container with given arguments.
 * @param {DOM_Node} container - empty DOM node to be placed in.
 * @param {object} args - arguments.
 * @param {Function} navigationDelegate - incapsulates navigation from navigation.js Takes Destination enum and args
 * @returns {DOM_Node} - element crated.
 */
export function create(container, args, navigationDelegate) {
  logger.log("layground is creating!");

  container.insertAdjacentHTML(
    `beforeend`,
    `
    <div class="${Destinations.CHANNEL_PLAYGROUND}">
      <h1>This is Channel playground screen</h1>
      <button class="${BACK_BUTTON_ID}">go back</button>
       <button class="${CHANGE_BUTTON_ID}">CHAnge!</button>
      <p class="${CHANNEL_OUTPUT}"/>
    </div>
    `
  );

  const channelOutputElement = container.querySelector(`.${CHANNEL_OUTPUT}`);
  logger.log("My channel output element: ", channelOutputElement);
  myChannel.subscsribe(MY_SUBSRIPTION_ID, (value) => {
    logger.log(`Current value of channel: ${value}`);
    channelOutputElement.textContent = `Current value of channel: ${value}`;
    return true;
  });

  const playground_element = container.querySelector(
    `.${Destinations.CHANNEL_PLAYGROUND}`
  );
  if (playground_element) {
    return alterate(playground_element, args, navigationDelegate);
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
  let button = element.querySelector(`.${BACK_BUTTON_ID}`);
  button = removeAllListeners(button);
  button.addEventListener("click", () => {
    logger.log("on Playground backwards click!");
    navigationDelegate(Destinations.BACKWARDS, {});
  });
  let buttonChange = element.querySelector(`.${CHANGE_BUTTON_ID}`);
  buttonChange = removeAllListeners(buttonChange);
  buttonChange.addEventListener("click", () => {
    logger.log("on Playground change click!");
    myChannel.onNext(myChannel.getCurrentValue() + "!");
  });
  return true;
}
