import {CellSelection} from '@/components/table/CellSelection';
// eslint-disable-next-line max-len
import {cellIdMatrix, isCell, resizeHandler, shouldResize} from '@/components/table/table.functions';
import {getTemplateTable} from '@/components/table/table.template';
import {$} from '@core/Dom';
import {ExcelComponent} from '@core/ExcelComponent';

export class Table extends ExcelComponent {
  static className = 'excel__table';

  constructor($root) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown'],
    });
  }

  beforeInit() {
    super.beforeInit();
    this.cellSelection = new CellSelection();
  }

  init() {
    super.init();

    const defaultSelectedCell = this.$root.findNode('[data-id="1:1"]');
    this.cellSelection.select(defaultSelectedCell);
  }

  toHTML() {
    return getTemplateTable();
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      resizeHandler(event);
    }

    if (isCell(event)) {
      const $target = $(event.target);
      if (event.shiftKey) {
        const start = this.cellSelection.current.getId(true);
        const end = $target.getId(true);
        const $groups = cellIdMatrix(start, end)
            .map(id => this.$root.findNode(`[data-id="${id}"]`));
        this.cellSelection.selectGroup($groups);
      } else {
        this.cellSelection.select($target);
      }
    }
  }
}
