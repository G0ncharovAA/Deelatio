"use strict";

import * as storageInteractor from "../core/storage-interactor.js";
import { Destinations } from "../core/entities/destinations.js";

const RECENT_DESTINATION_KEY = `NAV_RECENT_DESTINATION`;
const RECENT_DESTINATION_ARGUMENTS_KEY = `NAV_RECENT_DESTINATION_ARGUMENTS`;

/**
 * Saves recent destination to storage
 *
 * @param {Destination} destination - string value of Destinations enum
 * @param {object} args - arguments for Destination
 * @returns {boolean} true, if successful
 */
export function saveDestination(destination, args) {
  const destinationResult = storageInteractor.saveItem(
    RECENT_DESTINATION_KEY,
    destination
  );
  const argumentsResult = storageInteractor.saveItem(
    RECENT_DESTINATION_ARGUMENTS_KEY,
    args
  );
  const isDone =
    !(destinationResult instanceof error) &&
    !(argumentsResult instanceof error);
  return isDone;
}

/**
 * Loads recent destination
 *
 * @returns {Destination | boolean} destination of Destinations enum; false if not found or error
 */
export function loadRecentDestination() {
  const result = storageInteractor.getItem(RECENT_DESTINATION_KEY);
  if (Object.values(Destinations).includes(result)) {
    return result;
  } else {
    return false;
  }
}

/**
 * Loads recent destination arguments
 *
 * @returns {object | boolean} destination arguments; false if not found or error
 */
export function loadRecentDestinationArguments() {
  const result = storageInteractor.getItem(RECENT_DESTINATION_ARGUMENTS_KEY);
  if (result instanceof error) {
    return false;
  } else {
    return result;
  }
}
