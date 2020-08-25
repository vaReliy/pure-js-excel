import {createHeader} from '@/components/header/header.template';
import {Action} from '@/redux/action-type';
import {actionHeaderUpdate} from '@/redux/actions';
import {$} from '@core/Dom';
import {ExcelStateComponent} from '@core/ExcelStateComponent';

export class Header extends ExcelStateComponent {
  static className = 'excel__header';

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input'],
      subscribe: [Action.__INIT__],
      ...options,
    });
  }

  get template() {
    return createHeader(this.state.title);
  }

  toHTML() {
    return this.template;
  }

  onInput(event) {
    const state = {title: $(event.target).value};
    this.$dispatch(actionHeaderUpdate(state));
  }

  $onInit(state) {
    const {header} = state;
    if (header) {
      this.setState(header);
    }
  }
}
