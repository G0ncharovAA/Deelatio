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

/**
 * Sets the one and only listener for this node.
 *
 * @param {DOM_Node} node.
 * @param {Function} listener On click listener lambda.
 * @returns {DOM_Node} 
 */
export function setOnClickListener(node, listener) {
  const clone = removeAllListeners(node);
  clone.addEventListener("click", listener);
  return clone;
}

/**
 * 
 * @param {DOM_Node} root 
 * @param {string} nodeIdClassName 
 * @param {Function} listener 
 */
export function setOnDescendantClickListener(root, nodeIdClassName, listener){
   let node = root.querySelector(
      `.${nodeIdClassName}`
    );
    node = setOnClickListener(node, listener);
}
