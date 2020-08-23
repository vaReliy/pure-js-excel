import {$} from '@core/Dom';
import {EventType} from '@core/event-type';
import {ExcelComponent} from '@core/ExcelComponent';

export class Formula extends ExcelComponent {
  static className = 'excel__formula';

  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'click', 'keydown'],
      ...options,
    });
  }

  init() {
    super.init();

    this.$subscribe(state => {
      console.log('FORMULA:', state.table.currentTextContent); // fixme
      this.onCellContentUpdate(state.table.currentTextContent);
    });
  }

  onInput(event) {
    const text = $(event.target).text();
    this.onCellContentUpdate(text);
    this.$emit(EventType.FORMULA.INPUT, text);
  }

  onKeydown(event) {
    const keys = ['Enter', 'Tab'];
    if (keys.includes(event.key)) {
      event.preventDefault();
      this.$emit(EventType.FORMULA.DONE);
    }
  }

  onClick(event) {
    console.log('Formula onClick()', event); // fixme
  }

  onCellContentUpdate(text) {
    const $input = this.$root.findNode('[data-type="input"]');
    $input.text(text);
  }

  toHTML() {
    return `<div class="info">fx</div>
            <div
                class="input"
                contenteditable="true"
                spellcheck="false"
                data-type="input">
            </div>
    `;
  }
}
