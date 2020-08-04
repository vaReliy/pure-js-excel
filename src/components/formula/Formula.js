import {ExcelComponent} from '@core/ExcelComponent';

export class Formula extends ExcelComponent {
  static className = 'excel__formula';

  constructor($root) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'click'],
    });
  }

  onInput(event) {
    console.log('Formula onInput()', event); // fixme
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
