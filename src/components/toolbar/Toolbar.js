import {createToolbar} from '@/components/toolbar/toolbar.template';
import {defaultStyles} from '@core/constants';
import {$} from '@core/Dom';
import {EventType} from '@core/event-type';
import {ExcelStateComponent} from '@core/ExcelStateComponent';

export class Toolbar extends ExcelStateComponent {
  static className = 'excel__toolbar';

  constructor($root, options) {
    super($root, {
      name: 'Toolbar',
      listeners: ['click'],
      ...options,
    });
  }

  get template() {
    return createToolbar(this.state);
  }

  beforeInit() {
    super.beforeInit();
    this.initState(defaultStyles);
  }

  toHTML() {
    return this.template;
  }

  onClick(event) {
    const $target = $(event.target);
    if ($target.data.type === 'button') {
      const style = JSON.parse($target.data.value);
      const key = Object.keys(style)[0];

      this.$emit(EventType.TOOLBAR.UPDATE, style);
      this.setState({[key]: style[key]});
    }
  }
}
