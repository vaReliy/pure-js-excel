export function parse(value = '') {
  if (value.startsWith('=')) {
    let result;
    try {
      result = eval(value.slice(1)).toString();
    } catch (e) {
      result = value;
    }
    return result;
  }
  return value;
}
