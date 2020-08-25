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

export function storage(key, data) {
  if (!data) {
    return JSON.parse(localStorage.getItem(key));
  }
  localStorage.setItem(key, JSON.stringify(data));
}

export function isEqual(a, b) {
  if (typeof a === 'object' && typeof b === 'object') {
    return JSON.stringify(a) === JSON.stringify(b);
  }
  return a === b;
}

export function camelToDashCase(string) {
  return string.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`);
}
