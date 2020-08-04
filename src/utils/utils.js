export function capitalize(str) {
  if (typeof str !== 'string') {
    throw new Error(`capitalize: ${str} is not a string!`);
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
}
