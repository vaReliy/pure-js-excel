import {createHeader} from '@/components/header/header.template';
import {actionHeaderUpdate} from '@/redux/actions';
import {debounce} from '@/utils/utils';
import {$} from '@core/Dom';
import {ExcelComponent} from '@core/ExcelComponent';

export class Header extends ExcelComponent {
  static className = 'excel__header';

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input'],
      ...options,
    });
  }

  beforeInit() {
    super.beforeInit();
    this.onInput = debounce(this.onInput.bind(this), 300);
  }

  toHTML() {
    return createHeader(this.store.getState());
  }

  onInput(event) {
    const title = $(event.target).value;
    this.$dispatch(actionHeaderUpdate(title));
  }
}
