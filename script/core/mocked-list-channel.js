"use strict";

import { Channel } from "./channel.js";
import { getMockedItems } from "../data/mocked-repository.js";

const mockedItemsChannel = new Channel(getMockedItems());

export default mockedItemsChannel;
