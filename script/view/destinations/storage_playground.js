"use strict";

import { Destinations } from "../../core/entities/destinations.js";
import * as logger from "../../core/logger.js";
import { setOnDescendantClickListener } from "../utils.js";
//import myChannel from "../../core/example-channel.js";
import mockedItemsChannel from "../../core/mocked-list-channel.js";
import { deepCopy } from "../../core/utils.js";
import * as storageInteractor from "../../core/storage-interactor.js";

const BACK_BUTTON_ID = "BACK-BUTTON-ID";
const CHANNEL_OUTPUT = "CHANNEL-OUTPUT";
const MY_SUBSRIPTION_ID = "MY_SUBSRIPTION_ID_2";
const CHANGE_BUTTON_ID = "CHANGE_BUTTON_ID";

const STORAGE_CHANNEL_ID = "PLAYGROUND_STORAGE_CHANNEL_ID";
const storageChannel = storageInteractor.getStorageChannel(STORAGE_CHANNEL_ID);

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
    <div class="${Destinations.STORAGE_PLAYGROUND}">
      <h1>This is Storage playground screen</h1>
      <button class="${BACK_BUTTON_ID}">go back</button>
       <button class="${CHANGE_BUTTON_ID}">CHAnge!</button>
      <p class="${CHANNEL_OUTPUT}"/>
    </div>
    `
  );

  const playground_element = container.querySelector(
    `.${Destinations.STORAGE_PLAYGROUND}`
  );

  if (playground_element) {
    const channelOutputElement = playground_element.querySelector(
      `.${CHANNEL_OUTPUT}`
    );
    logger.log("storage value:", storageChannel.getCurrentValue());
    storageChannel.subscsribe(MY_SUBSRIPTION_ID, (value) => {
      channelOutputElement.textContent = `Current value of channel: ${value.myVal}`;
      return true;
    });
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
  setOnDescendantClickListener(element, BACK_BUTTON_ID, () => {
    navigationDelegate(Destinations.BACKWARDS, {});
  });
  setOnDescendantClickListener(element, CHANGE_BUTTON_ID, () => {
    const newValue = deepCopy(storageChannel.getCurrentValue());
    newValue.myVal += 1;
    storageChannel.onNext(newValue);
  });
  return true;
}
