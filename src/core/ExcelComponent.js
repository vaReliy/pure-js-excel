import {DomListener} from '@core/DomListener';

export class ExcelComponent extends DomListener {
  /**
   * @param {Dom} $root
   * @param {Object} options
   */
  constructor($root, options = {}) {
    super($root, options.listeners);
    /** @type {string} */
    this.name = options.name;
    /** @type {EventEmitter} */
    this.emitter = options.emitter;
    /** @type {Array<Function>} */
    this.subscriptions = [];

    this.beforeInit();
  }

  $emit(eventType, data) {
    this.emitter.emit(eventType, data);
  }

  $on(eventType, handler) {
    const sub = this.emitter.subscribe(eventType, handler);
    this.subscriptions.push(sub);
  }

  beforeInit() {}

  init() {
    this.initListeners();
  }

  toHTML() {
    return '';
  }

  destroy() {
    this.removeListeners();
    this.subscriptions.forEach(sub => sub());
  }
}
