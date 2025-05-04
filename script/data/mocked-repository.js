"use strict";

import { deepCopy } from "../core/utils.js";

const numberOfObjects = 6;
const commonFields = {
  name: "Product",
  price: 25.99,
  inStock: true,
  category: { id: 1, name: "Electronics" }, // Example nested object
  tags: ["featured", "new"], // Example array
  description: null, // Example null value
};

export function getMockedItems() {
  const result = [];
  for (let index = 0; index < numberOfObjects; index++) {
    const item = getMockedItem();
    item.id = index;
    result.push(item);
  }
  return result;
}

export function getMockedItem() {
  return deepCopy(commonFields);
}
