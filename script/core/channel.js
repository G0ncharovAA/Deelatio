"use strict";

import * as logger from "./logger.js";
import { deepCompare } from "./utils.js";

/**
 * Channels implements subscription mechanism on a mutable value.
 */
export default class Channel {
  /**
   * Current value of this channel.
   */
  #value;

  /**
   * Map of observers of this value, stored by their id's.
   */
  #observers;

  /**
   * Initial value thhis channel will have.
   * @param {Object} initialValue
   */
  constructor(initialValue) {
    this.#value = initialValue;
    this.#observers = new Map();
  }

  /**
   *
   * @param {String} subcriptionId
   * @param {Function} subscriptionFunction
   */
  subscsribe(subcriptionId, subscriptionFunction) {
    if (this.#invokeSubscriptionFunction(subscriptionFunction)) {
      this.#observers.set(subcriptionId, subscriptionFunction);
    }
  }

  onNext(newValue) {
    if (!deepCompare(this.#value, newValue)) {
      this.#value = newValue;
      const aliveObservers = new Map(
        [...this.#observers].filter(([subscriptionId, subscriptionFunction]) =>
          this.#invokeSubscriptionFunction(subscriptionFunction)
        )
      );
      this.#observers = aliveObservers;
    }
  }

  unsubscribeAll() {
    this.#observers = new Map();
  }

  /**
   * 
   * @param {*} subscriptionFunction 
   * @returns 
   */
  #invokeSubscriptionFunction(subscriptionFunction) {
    let success = false;
    try {
      success = subscriptionFunction(this.#value);
    } catch (error) {
      logger.e(error);
    } finally {
      return success;
    }
  }
}
