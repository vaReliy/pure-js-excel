export class Excel {
  constructor(selector, options) {
    this.$el = document.querySelector(selector);
    this.components = options.components || [];
  }

  getRoot() {
    const $root = document.createElement('div');
    $root.classList.add('excel');

    this.components.forEach(Component => {
      const component = new Component('excel');
      const componentElement = document.createElement('div');
      componentElement.classList.add(Component.className);
      componentElement.innerHTML = component.toHTML();
      $root.append(componentElement);
    });
    return $root;
  }

  render() {
    this.$el.append(this.getRoot());
  }
}
