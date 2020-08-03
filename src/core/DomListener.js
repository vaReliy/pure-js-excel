export class DomListener {
  constructor($root) {
    if (!$root) {
      throw new Error('The $root element is not provided!');
    }
    this.$root = $root;
  }
}
