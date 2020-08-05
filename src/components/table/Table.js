import {ExcelComponent} from '@core/ExcelComponent';
import {getTemplateTable} from '@/components/table/table.template';

export class Table extends ExcelComponent {
  static className = 'excel__table';

  constructor($root) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown'],
    });
  }

  toHTML() {
    return getTemplateTable();
  }

  onMousedown(event) {
    const resizeTarget = event.target.dataset.resize;
    if (resizeTarget) {
      console.log('onMousedown =>', resizeTarget); // fixme
    }
  }
}
