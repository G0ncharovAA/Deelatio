"use strict";

import * as logger from "./logger.js";
import { deepCompare } from "./utils.js";
import * as serialization from "./serialization.js";

/**
 * Storage channels implements subscription mechanism on value in the local storage.
 * Used for inter tabs communication.
 */
export class StorageChannel {
  /**
   * Map of observers of this value, stored by their id's.
   */
  #observers;

  #storageKey;

  /**
   * Setter function for the value of this channel.
   */
  #setValue;

  /**
   * Getter function for the value of this channel.
   */
  #getValue;

  constructor(key, setter, getter, initialValue) {
    this.#observers = new Map();
    this.#storageKey = key;
    this.#setValue = setter;
    this.#getValue = getter;
    // this.#setValue(key, initialValue);
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
    if (
      this.#invokeSubscriptionFunction(
        subscriptionFunction,
        this.getCurrentValue()
      )
    ) {
      this.#observers.set(subcriptionId, subscriptionFunction);
    }
  }

  getCurrentValue() {
    return this.#getValue(this.#storageKey);
  }

  onNext(newValue) {
    const oldValue = this.getCurrentValue();
    if (!deepCompare(oldValue, newValue)) {
      this.#setValue(this.#storageKey, newValue);
      this.#notifyObservers(newValue);
    }
  }

  onOtherTabChanges(oldValue, newValue) {
    if (!deepCompare(oldValue, newValue)) {
      this.#notifyObservers(serialization.deserialize(newValue));
    }
  }

  unsubscribeAll() {
    this.#observers = new Map();
  }

  #notifyObservers(value) {
    logger.log("Notifying value:", value);
    const aliveObservers = new Map(
      [...this.#observers].filter(([subscriptionId, subscriptionFunction]) => {
        return this.#invokeSubscriptionFunction(subscriptionFunction, value);
      })
    );
    this.#observers = aliveObservers;
  }

  #invokeSubscriptionFunction(subscriptionFunction, value) {
    let success = false;
    try {
      success = subscriptionFunction(value);
    } catch (error) {
      logger.e(error);
    } finally {
      return success;
    }
  }
}
