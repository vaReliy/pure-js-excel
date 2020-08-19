export function capitalize(str) {
  if (typeof str !== 'string') {
    throw new Error(`capitalize: ${str} is not a string!`);
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function range(start, end) {
  const min = Math.min(start, end);
  const max = Math.max(start, end);
  const rangeLength = max - min + 1;
  return new Array(rangeLength)
      .fill(0)
      .map((v, i) => min + i);
}
