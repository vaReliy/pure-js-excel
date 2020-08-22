import {Action} from '@/redux/action-type';
import {$} from '@core/Dom';
import {EventEmitter} from '@core/EventEmitter';

export class Excel {
  constructor(selector, options) {
    this.$el = $(selector);
    this.components = options.components || [];
    this.store = options.store;
  }

  getRoot() {
    const $root = $.create('div', 'excel');

    const options = {
      emitter: new EventEmitter(),
      store: this.store,
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
    this.store.dispatch({type: Action.__INIT__});
    // this.destroyAfterDelay(10000); // fixme
  }

  destroyAfterDelay(ms) {
    setTimeout(() => {
      this.components.forEach(component => component.destroy());
    }, ms);
  }
}
