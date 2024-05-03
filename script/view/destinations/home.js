/**
 * Shows HOME destination in the given container with given arguments.
 * @param {DOM_Node} container - empty DOM node to be placed in.
 * @param {object} args - arguments.
 * @returns {boolean} - true if successful.
 */
export function showHome(container, args) {
  container.insertAdjacentHTML(
    `beforebegin`,
    `
    <h1>This is HOME screen<h1>
    `
  );
  return true;
}
