"use strict";

import * as navigationInteractor from "../core/navigation-interactor.js";
import { Destinations } from "../core/entities/destinations.js";
import { clearNode } from "./utils.js";
import { showHome } from "./destinations/home.js";
import { showAbout } from "./destinations/about.js";

/**
 * Restores recent navigation state. Takes root node as argument.
 *
 * @param {DOM_Node} container - destinations will be placed here.
 */
export function navigateToRecentDestination(container) {
  console.log("container", container);
  const recentDestinationWithArguments =
    navigationInteractor.getRecentDestinationWithArguments();
  console.log("destArgs", recentDestinationWithArguments);
  navigate(
    recentDestinationWithArguments.destiantion,
    recentDestinationWithArguments.args,
    container
  );
}

export function navigate(destination, args, container) {
  clearNode(container);
  switch (destination) {
    case Destinations.ABOUT:
      showAbout(container, args);
      break;
    default:
      showHome(container, args);
      break;
  }
}
