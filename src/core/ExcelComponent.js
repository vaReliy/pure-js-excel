import {DomListener} from '@core/DomListener';

export class ExcelComponent extends DomListener {
  /**
   * @param {Dom} $root
   * @param {Object} options
   */
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name;
    this.emitter = options.emitter;
    this.subscriptions = [];

    this.beforeInit();
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
