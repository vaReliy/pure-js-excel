import {$} from '@core/Dom';

export class Excel {
  constructor(selector, options) {
    this.$el = $(selector);
    this.components = options.components || [];
  }

  getRoot() {
    const $root = $.create('div', 'excel');

    this.components = this.components.map(Component => {
      const $el = $.create('div', Component.className);
      const component = new Component($el);
      $el.html(component.toHTML());
      $root.append($el);
      return component;
    });
    return $root;
  }

  render() {
    this.$el.append(this.getRoot());

    this.components.forEach(component => component.init());
    // this.destroyAfterDelay(10000); // fixme
  }

  destroyAfterDelay(ms) {
    setTimeout(() => {
      this.components.forEach(component => component.destroy());
    }, ms);
  }
}
