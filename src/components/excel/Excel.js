import {$} from '@core/Dom';
import {EventEmitter} from '@core/EventEmitter';
import {StoreSubscriber} from '@core/StoreSubscriber';

export class Excel {
  constructor(options) {
    this.components = options.components || [];
    this.store = options.store;
    this.subscriber = new StoreSubscriber(this.store);
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
    this.components.forEach(component => component.init());
    this.subscriber.subscribeComponents(this.components);
    // this.destroyAfterDelay(10000); // fixme
  }

  destroy() {
    this.subscriber.unsubscribeComponents();
    this.components.forEach(component => component.destroy());
  }

  destroyAfterDelay(ms) {
    setTimeout(() => {
      this.destroy();
    }, ms);
  }
}
