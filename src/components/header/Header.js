import {createHeader} from '@/components/header/header.template';
import {actionHeaderUpdate, actionRemoveTable} from '@/redux/actions';
import {debounce} from '@/utils/utils';
import {$} from '@core/Dom';
import {ExcelComponent} from '@core/ExcelComponent';

export class Header extends ExcelComponent {
  static className = 'excel__header';

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input', 'click'],
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

  onClick(event) {
    const $target = $(event.target);
    if ($target.data.type === 'button') {
      const decision = confirm('Do you want to delete this table?');
      if (decision) {
        this.$dispatch(actionRemoveTable());
      }
    }
  }
}
