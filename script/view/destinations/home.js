"use strict";

import { Destinations } from "../../core/entities/destinations.js";
import * as logger from "../../core/logger.js"

/**
 * Shows HOME destination in the given container with given arguments.
 * @param {DOM_Node} container - empty DOM node to be placed in.
 * @param {object} args - arguments.
 * @param {Function} navigationDelegate - incapsulates navigation from navigation.js Takes Destination enum and args object.
 * @returns {boolean} - true if successful.
 */
export function showHome(container, args, navigationDelegate) {
  console.log(`home adding`);
  container.insertAdjacentHTML(
    `beforebegin`,
    `
    <h1>This is HOME screen<h1>
    <button id="myButton">my button!</button>
    `
  );

  console.log(`home added`);
  // console.log(container);
  // const button = container.querySelector(`myButton`);
  // button.addEventListener("click", onButtonClick);
  // navigationDelegate(Destinations.ABOUT, {});
  return true;
}

function onButtonClick() {
  console.log(`clicked`);
}
