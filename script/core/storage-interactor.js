"use strict";

import * as storageRepository from "../data/storage-repository.js";
import * as logger from "./logger.js";
import { StorageChannel } from "./storage-channel.js";

const storageChannels = new Map();

/**
 * Reads value from storage by given key.
 *
 * @param {string} key
 * @returns {object | Error} value
 */
export function getItem(key) {
  try {
    return storageRepository.getItem(key);
  } catch (error) {
    logger.e(error);
    return error;
  }
}

/**
 * Saves value to storage by given key.
 *
 * @param {string} key
 * @param {object} value
 * @returns {boolean | Error} true, if successful.
 */
export function saveItem(key, value) {
  try {
    return storageRepository.saveItem(key, value);
  } catch (error) {
    logger.e(error);
    return error;
  }
}

export function getStorageChannel(storageKey) {
  if (storageChannels.size < 1) {
    storageRepository.initStorageEventListener(onStorageEvent);
  }
  const storageChannel = storageChannels[storageKey];
  if (storageChannel) {
    return storageChannel;
  } else {
    const newStorageChannel = new StorageChannel(
      storageKey,
      saveItem,
      getItem,
      { myVal: 0 }
    );
    storageChannels.set(storageKey, newStorageChannel);
    return newStorageChannel;
  }
}

function onStorageEvent(event) {
  logger.log("Storage event fired:", event);
  const storageChannel = storageChannels.get(event.key);
  logger.log("Sending to channel:", storageChannel);
  if (storageChannel) {
    storageChannel.onOtherTabChanges(event.oldValue, event.newValue);
  }
}
