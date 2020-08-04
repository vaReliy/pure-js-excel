import {capitalize} from '@/utils/utils';

export class DomListener {
  /**
   * @param {Dom} $root Parent DOM element
   * @param {Array<string>} listeners Array of event types to subscribe
   */
  constructor($root, listeners = []) {
    if (!$root) {
      throw new Error('The $root element is not provided!');
    }
    this.$root = $root;
    this.listeners = listeners;
    this.name = '';
  }

  initListeners() {
    this.listeners.forEach(eventType => {
      const handlerName = this.getHandlerName(eventType);

      if (!this[handlerName]) {
        // eslint-disable-next-line max-len
        throw new Error(`Component ${this.name} doesn't implemented ${handlerName} handler!`);
      }
      this[handlerName] = this[handlerName].bind(this);
      this.$root.on(eventType, this[handlerName]);
    });
  }

  removeListeners() {
    this.listeners.forEach(eventType => {
      const handlerName = this.getHandlerName(eventType);
      this.$root.off(eventType, this[handlerName]);
    });
  }

  getHandlerName(eventType) {
    return 'on' + capitalize(eventType);
  }
}
