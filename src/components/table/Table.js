import {CellSelection} from '@/components/table/CellSelection';
// eslint-disable-next-line max-len
import {cellIdMatrix, closestCellId, isCell, resizeHandler, shouldResize} from '@/components/table/table.functions';
import {getTemplateTable} from '@/components/table/table.template';
import {$} from '@core/Dom';
import {ExcelComponent} from '@core/ExcelComponent';

export class Table extends ExcelComponent {
  static className = 'excel__table';

  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown'],
      ...options,
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

    this.$on('formula:input', this.onFormulaUpdate.bind(this));
    this.$on('formula:complete', this.onFormulaComplete.bind(this));
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
        this.selectCellUpdate($target);
      }
    }
  }

  onKeydown(event) {
    const availableKeys = [
      'Enter',
      'Tab',
      'ArrowDown',
      'ArrowUp',
      'ArrowRight',
      'ArrowLeft',
    ];
    if (availableKeys.includes(event.key) && !event.shiftKey) {
      event.preventDefault();
      const targetCellId = this.cellSelection.current.getId(true);
      const id = closestCellId(event.key, targetCellId);
      const $closestCell = this.$root.findNode(`[data-id="${id}"]`);
      if ($closestCell && $closestCell.$nativeElement) {
        // fixme: $nativeElement - check for table max cell values range
        this.selectCellUpdate($closestCell);
      }
    }
  }

  onFormulaUpdate(text) {
    this.cellSelection.current.text(text);
  }

  onFormulaComplete() {
    this.cellSelection.current.focus();
  }

  selectCellUpdate($cell) {
    this.cellSelection.select($cell);
    this.$emit('table:cell_update', $cell.text());
  }
}
