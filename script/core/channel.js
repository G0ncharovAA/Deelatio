"use strict";

import * as logger from "./logger.js";
import { deepCompare } from "./utils.js";

/**
 * Channels implements subscription mechanism on a mutable value.
 */
export class Channel {
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
   * Subscribes for this channel. Must take an id,
   * and a function to be invoked every time the value changes.
   * subscriptionFunction also to be invoked at subscription.
   * subscriptionFunction must return true to maintain subscription.
   *
   * @param {String} subcriptionId Must be unique.
   * @param {function(any): boolean} subscriptionFunction Must return boolean.
   */
  subscsribe(subcriptionId, subscriptionFunction) {
    if (this.#invokeSubscriptionFunction(subscriptionFunction)) {
      this.#observers.set(subcriptionId, subscriptionFunction);
    }
  }

  getCurrentValue() {
    return this.#value;
  }

  onNext(newValue) {
    if (!deepCompare(this.#value, newValue)) {
      this.#value = newValue;
      const aliveObservers = new Map(
        [...this.#observers].filter(
          ([subscriptionId, subscriptionFunction]) => {
            return this.#invokeSubscriptionFunction(subscriptionFunction);
          }
        )
      );
      this.#observers = aliveObservers;
    }
  }

  unsubscribeAll() {
    this.#observers = new Map();
  }

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
