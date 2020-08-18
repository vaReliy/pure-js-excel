import {resizeHandler, shouldResize} from '@/components/table/table.functions';
import {getTemplateTable} from '@/components/table/table.template';
import {ExcelComponent} from '@core/ExcelComponent';

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
    if (shouldResize(event)) {
      resizeHandler(event);
    }
  }
}
