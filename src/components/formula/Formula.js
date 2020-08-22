import {$} from '@core/Dom';
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

    this.$on('table:cell_update', this.onCellUpdate.bind(this));
  }

  onInput(event) {
    const text = $(event.target).text();
    this.onCellUpdate(text);
    this.$emit('formula:input', text);
  }

  onKeydown(event) {
    const {key} = event;
    if (key === 'Enter') {
      event.preventDefault();
      this.$emit('formula:complete');
    }
  }

  onClick(event) {
    console.log('Formula onClick()', event); // fixme
  }

  onCellUpdate(text) {
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
