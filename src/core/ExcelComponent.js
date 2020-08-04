import {DomListener} from '@core/DomListener';

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name;
  }

  init() {
    this.initListeners();
  }

  toHTML() {
    return '';
  }

  destroy() {
    this.removeListeners();
  }
}
