"use strict";

import * as navigationInteractor from "../core/navigation-interactor.js";
import { Destinations } from "../core/entities/destinations.js";
import { clearNode } from "./utils.js";
import * as home from "./destinations/home.js";
import * as about from "./destinations/about.js";
import * as playground from "./destinations/channel_playground.js";
import * as logger from "../core/logger.js";

// DOM node used as host container for destinations.
let container;

// DOM node used as buffer to store destinations currently unseen.
let buffer;

// Stack of destinations with argumetns to move bakwards.
const backstack = [];

// Stores current destination along with its arguments.
let currentDestinationWithArgs;

//
const creationMethods = {
  [Destinations.HOME]: home.create,
  [Destinations.ABOUT]: about.create,
  [Destinations.CHANNEL_PLAYGROUND]: playground.create,
};

const alterationMethods = {
  [Destinations.HOME]: home.alterate,
  [Destinations.ABOUT]: about.alterate,
  [Destinations.CHANNEL_PLAYGROUND]: playground.alterate,
};

/**
 * Delegate function incapsulates navigation imlementation to avoid circular dependecy.
 *
 * @param {Destination} destination - string value of Destinations enum.
 * @param {object} args - arguments for Destination.
 */
const navigationDelegate = (destiantion, args) => {
  performNavigation(destiantion, args);
};

/**
 * Setup and startup navigation in the given container. Using given buffer to store destinations currently unseen.
 *
 * @param {DOM_Node} root_container - destinations will be placed here.
 * @param {DOM_Node} nav_buffer - currently invisible destinnations placed here.
 */
export function setup(root_container, nav_buffer) {
  container = root_container;
  buffer = nav_buffer;
  navigateToRecentDestination(container);
  //  setupBrowserHistoryListener();
}

/**
 * Navigates to desired destination with desired arguments in a desired container.
 *
 * @param {Destination} destination - string value of Destinations enum.
 * @param {object} args - arguments for Destination.
 * @param {DOM_Node} container - destinations will be placed here.
 * @param {boolean} isMovingBackwards - if navigating through backstack.
 */
function navigate(destination, args, container, isMovingBackwards) {
  moveCurrentDestinaionToBuffer();
  const destiantionFromBuffer = findDestinationInBuffer(destination);
  logger.log("destination from buffer ", destiantionFromBuffer);
  if (destiantionFromBuffer) {
    moveDestinationToContainer(destiantionFromBuffer);
  }
  const functor = getDestinationFunctor(destination, destiantionFromBuffer);
  logger.log("destination functor ", functor);
  if (applyNavigationMonade(functor, container, args)) {
    navigationInteractor.onDestinationChanged(destination, args);
    manageBackstackOnNavigation(destination, args, isMovingBackwards);
    //  reflectNavigateEventToBrowser(destination, args);
  } else {
    logger.log("navigation failed");
  }
}

/**
 * Incapsulates navigation logic featuring backstack.
 *
 * @param {Destination} destination - string value of Destinations enum.
 * @param {object} args - arguments for Destination.
 */
function performNavigation(destination, args) {
  logger.log("backstack ", backstack);
  if (destination === Destinations.BACKWARDS) {
    navigateBackwards();
  } else {
    navigate(destination, args, container, false);
  }
}

/**
 * Implements navigation backwards.
 */
function navigateBackwards() {
  const previousDestinationWithArguments = backstack.pop();
  if (previousDestinationWithArguments) {
    navigate(
      previousDestinationWithArguments.destination,
      previousDestinationWithArguments.args,
      container,
      true
    );
  } else {
    navigate(Destinations.HOME, {}, container, true);
  }
}

/**
 * Manages navigation backstack feature.
 *
 * @param {Destination} destination - string value of Destinations enum.
 * @param {object} args - arguments for Destination.
 * @param {boolean} isMovingBackwards - if navigating through backstack.
 */
function manageBackstackOnNavigation(destination, args, isMovingBackwards) {
  if (currentDestinationWithArgs && !isMovingBackwards) {
    backstack.push(currentDestinationWithArgs);
  }
  currentDestinationWithArgs = { destination, args };
}

/**
 * Restores recent navigation state. Takes root node as argument.
 *
 * @param {DOM_Node} container - destinations will be placed here.
 */
function navigateToRecentDestination(container) {
  console.log("container", container);
  const recentDestinationWithArguments =
    navigationInteractor.getRecentDestinationWithArguments();
  logger.log("destArgs", recentDestinationWithArguments);
  navigate(
    recentDestinationWithArguments.recendDestination,
    recentDestinationWithArguments.recendDestinationArgs,
    container,
    false
  );
}

/**
 * Determinates the function to perform navigation to specified destination.
 *
 * @param {Destination} destination - string value of Destinations enum.
 * @param {DOM_Node} destiantionElementFromBuffer - previously created destination element from buffer.
 * @returns {Function} - function to be applyed to perform navigation.
 */
function getDestinationFunctor(destiantion, destiantionElementFromBuffer) {
  let functor;
  if (destiantionElementFromBuffer) {
    functor = alterationMethods[destiantion];
  } else {
    functor = creationMethods[destiantion];
  }
  return functor;
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

// function setupBrowserHistoryListener() {
//   window.addEventListener("popstate", (event) => {
//     const url = new URL(window.location.href);
//     const route = url.pathname;
//   });
// }

/**
 * Reflects navigation change to browser address prompt.
 *
 * @param {Destination} destination - string value of Destinations enum.
 * @param {object} args - arguments for Destination.
 */
// function reflectNavigateEventToBrowser(destination, args) {
//   try {
//     history.pushState(args, ``, `/${destination}`);
//   } catch (error) {
//     logger.e(error);
//   }
// }

/**
 * Searches DOM node in buffer div to match the given destination
 *
 * @param {Destination} destination - String value of Destinations enum. Also used as a class name for corresponding div.
 * @returns {DOM_node | null} - Might return previously created destination element from buffer.
 */
function findDestinationInBuffer(destination) {
  return buffer.querySelector(`.${destination}`);
}

/**
 * Moves DOM nodes from container to buffer.
 */
function moveCurrentDestinaionToBuffer() {
  buffer.replaceChildren(...container.childNodes, ...buffer.childNodes);
}

/**
 * Moves destination DOM node from buffer to container.
 *
 * @param {DOM_node} destination_node
 */
function moveDestinationToContainer(destination_node) {
  container.replaceChildren(destination_node);
}
