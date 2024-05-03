"use strict";

import * as navigationRepository from "../data/navigation-repository.js";
import { Destinations } from "./entities/destinations.js";

const DEFAULT_DESTINATION = Destinations.HOME;

/**
 * Returns recent destination with its arguments. Default values will be returned in case of error.
 *
 * @returns {{destiantion, args}} {destination, args} - Destinations enum and an object containinig arguments.
 */
export function getRecentDestinationWithArguments() {
  let recendDestination = navigationRepository.loadRecentDestination();
  if (!recendDestination) {
    recendDestination = DEFAULT_DESTINATION;
  }
  let recendDestinationArgs =
    navigationRepository.loadRecentDestinationArguments();
  if (!recendDestinationArgs) {
    recendDestinationArgs = {};
  }
  return { recendDestination, recendDestinationArgs };
}

/**
 * Should be invoked every time destination or its arguments changed.
 *
 * @param {Destination} destination - string value of Destinations enum.
 * @param {object} args - arguments for Destination.
 * @returns {boolean} true, if processed successful.
 */
export function onDestinationChanged(destination, args) {
  const result = navigationRepository.saveDestination(destination, args);
  return result;
}
