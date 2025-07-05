"use strict";

import { Destinations } from "../../core/entities/destinations.js";
import * as logger from "../../core/logger.js";
import { setOnDescendantClickListener } from "../utils.js";
import myChannel from "../../core/example-channel.js";
import mockedItemsChannel from "../../core/mocked-list-channel.js";
import { deepCopy } from "../../core/utils.js";

const BACK_BUTTON_ID = "BACK-BUTTON-ID";
const CHANNEL_OUTPUT = "CHANNEL-OUTPUT";
const MOCKED_LIST_CHANNEL_OUTPUT = "MOCKED-LIST-CHANNEL-OUTPUT";
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
  container.insertAdjacentHTML(
    `beforeend`,
    `
    <div class="${Destinations.CHANNEL_PLAYGROUND}">
      <h1>This is Channel playground screen</h1>
      <button class="${BACK_BUTTON_ID}">go back</button>
       <button class="${CHANGE_BUTTON_ID}">CHAnge!</button>
      <p class="${CHANNEL_OUTPUT}"/>
      <p class="${MOCKED_LIST_CHANNEL_OUTPUT}"/>
    </div>
    `
  );

  const playground_element = container.querySelector(
    `.${Destinations.CHANNEL_PLAYGROUND}`
  );
  if (playground_element) {
    const channelOutputElement = playground_element.querySelector(
      `.${CHANNEL_OUTPUT}`
    );
    myChannel.subscsribe(MY_SUBSRIPTION_ID, (value) => {
      channelOutputElement.textContent = `Current value of channel: ${value}`;
      return true;
    });

    const mockedListChannelOutputElement = playground_element.querySelector(
      `.${MOCKED_LIST_CHANNEL_OUTPUT}`
    );
    mockedItemsChannel.subscsribe(MY_SUBSRIPTION_ID, (value) => {
      displayProducts(value, mockedListChannelOutputElement);
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
    //myChannel.onNext(myChannel.getCurrentValue() + "!");
    const currentList = mockedItemsChannel.getCurrentValue();
    const newList = deepCopy(currentList);
    newList[1].price = currentList[1].price + 1.0;
    mockedItemsChannel.onNext(newList);
  });
  return true;
}

function displayProducts(products, container) {
  if (!Array.isArray(products)) {
    console.error("displayProducts: products argument must be an array.");
    return;
  }

  if (!(container instanceof HTMLElement)) {
    console.error("displayProducts: container argument must be a DOM element.");
    return;
  }

  // Clear the container before adding new content
  container.innerHTML = "";

  products.forEach((product) => {
    // Create a product element (e.g., a div or li)
    const productElement = document.createElement("div");
    productElement.classList.add("product"); // Add a class for styling

    // Create elements for each property
    const nameElement = document.createElement("h3");
    nameElement.textContent = product.name;
    productElement.appendChild(nameElement);

    const priceElement = document.createElement("p");
    priceElement.textContent = `Price: $${product.price}`;
    productElement.appendChild(priceElement);

    const inStockElement = document.createElement("p");
    inStockElement.textContent = `In Stock: ${product.inStock ? "Yes" : "No"}`;
    productElement.appendChild(inStockElement);

    const categoryElement = document.createElement("p");
    categoryElement.textContent = `Category: ${
      product.category?.name || "N/A"
    }`; // Use optional chaining
    productElement.appendChild(categoryElement);

    const tagsElement = document.createElement("p");
    tagsElement.textContent = `Tags: ${
      product.tags ? product.tags.join(", ") : "N/A"
    }`;
    productElement.appendChild(tagsElement);

    const descriptionElement = document.createElement("p");
    descriptionElement.textContent = `Description: ${
      product.description || "No description"
    }`;
    productElement.appendChild(descriptionElement);

    // Append the product element to the container
    container.appendChild(productElement);
  });
}
