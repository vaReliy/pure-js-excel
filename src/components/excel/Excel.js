import {$} from '@core/Dom';
import {EventEmitter} from '@core/EventEmitter';

export class Excel {
  constructor(selector, options) {
    this.$el = $(selector);
    this.components = options.components || [];
  }

  getRoot() {
    const $root = $.create('div', 'excel');

    const options = {
      emitter: new EventEmitter(),
    };

    this.components = this.components.map(Component => {
      const $el = $.create('div', Component.className);
      const component = new Component($el, options);
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
