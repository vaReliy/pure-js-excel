import {$} from '@core/Dom';

export class Excel {
  constructor(selector, options) {
    this.$el = document.querySelector(selector);
    this.components = options.components || [];
  }

  getRoot() {
    const $root = $.create('div', 'excel');

    this.components.forEach(Component => {
      const component = new Component('excel');
      const $el = $.create('div', Component.className);
      $($el).html(component.toHTML());
      $root.append($el);
    });
    return $root;
  }

  render() {
    this.$el.append(this.getRoot());
  }
}
