import {$} from '@core/Dom';
import {ExcelComponent} from '@core/ExcelComponent';

export class Formula extends ExcelComponent {
  static className = 'excel__formula';

  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'click'],
      ...options,
    });
  }

  onInput(event) {
    const text = $(event.target).text();
    this.emitter.emit('formula:input', text);
  }

  onClick(event) {
    console.log('Formula onClick()', event); // fixme
  }

  toHTML() {
    return `<div class="info">fx</div>
            <div class="input" contenteditable="true" spellcheck="false"></div>
    `;
  }
}
