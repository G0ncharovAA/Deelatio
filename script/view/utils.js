/**
 * Clears all content from the node properly.
 *
 * @param {DOM_Node} node.
 */
export function clearNode(node) {
  node.replaceChildren();
}

/**
 * Removes all listeners from the node.
 *
 * @param {DOM_Node} node.
 * @returns {DOM_Node} new node without listeners.
 */
export function removeAllListeners(node) {
  const clone = node.cloneNode(true);
  node.parentNode.replaceChild(clone, node);
  return clone;
}
