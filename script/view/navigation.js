"use strict";

import * as navigationInteractor from "../core/navigation-interactor.js";
import { Destinations } from "../core/entities/destinations.js";
import { clearNode } from "./utils.js";
import { showHome } from "./destinations/home.js";
import { showAbout } from "./destinations/about.js";
import * as logger from "../core/logger.js";

let container;

/**
 * Setup and startup navigation in this container.
 * @param {DOM_Node} container - destinations will be placed here.
 */
export function setup(root_container) {
  container = root_container;
  navigateToRecentDestination(container);
}

/**
 * Delegate function incapsulates navigation imlementation to avoid circular dependecy.
 * @param {Destination} destination - string value of Destinations enum.
 * @param {object} args - arguments for Destination.
 */
const navigationDelegate = (destiantion, args) => {
  navigate(destiantion, args, container);
};

/**
 * Restores recent navigation state. Takes root node as argument.
 *
 * @param {DOM_Node} container - destinations will be placed here.
 */
function navigateToRecentDestination(container) {
  console.log("container", container);
  const recentDestinationWithArguments =
    navigationInteractor.getRecentDestinationWithArguments();
  console.log("destArgs", recentDestinationWithArguments);
  navigate(
    recentDestinationWithArguments.recendDestination,
    recentDestinationWithArguments.recendDestinationArgs,
    container
  );
}

/**
 * Navigates to desired destination with desired arguments in a desired container.
 *
 * @param {Destination} destination - string value of Destinations enum.
 * @param {object} args - arguments for Destination.
 * @param {DOM_Node} container - destinations will be placed here.
 */
function navigate(destination, args, container) {
  clearNode(container);
  let functor;
  switch (destination) {
    case Destinations.ABOUT:
      functor = showAbout;
      break;
    default:
      functor = showHome;
      break;
  }
  if (applyNavigationMonade(functor, container, args)) {
    navigationInteractor.onDestinationChanged(destination, args);
  }
}

/**
 * Monade applies to container DOM node.

 * @param {Function} functor - function to be applied to container.
 * @param {DOM_node} container - Has to be empty.
 * @param {object} args - arguments for the functor.
 * @returns {boolean} true, if successful.
 */
function applyNavigationMonade(functor, container, args) {
  try {
    return functor(container, args, navigationDelegate);
  } catch (error) {
    logger.e(error);
    return false;
  }
}
