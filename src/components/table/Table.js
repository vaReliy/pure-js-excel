import {CellSelection} from '@/components/table/CellSelection';
// eslint-disable-next-line max-len
import {cellIdMatrix, closestCellId, isCell, resizeHandler, shouldResize} from '@/components/table/table.functions';
import {getTemplateTable} from '@/components/table/table.template';
import {actionTableResize, actionTableTextUpdate} from '@/redux/actions';
import {defaultStyles} from '@core/constants';
import {$} from '@core/Dom';
import {EventType} from '@core/event-type';
import {ExcelComponent} from '@core/ExcelComponent';

export class Table extends ExcelComponent {
  static className = 'excel__table';

  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      ...options,
    });
  }

  beforeInit() {
    super.beforeInit();
    this.cellSelection = new CellSelection();
  }

  init() {
    super.init();

    const $defaultSelectedCell = this.$root.findNode('[data-id="1:1"]');
    this.selectCellUpdate($defaultSelectedCell);

    this.$on(EventType.FORMULA.INPUT, this.onFormulaUpdate.bind(this));
    this.$on(EventType.FORMULA.DONE, this.onFormulaDone.bind(this));
    this.$on(EventType.TOOLBAR.UPDATE, this.onToolbarUpdate.bind(this));
  }

  toHTML() {
    return getTemplateTable(30, this.store.getState().table);
  }

  async resizeTable(event) {
    try {
      const data = await resizeHandler(event);
      this.$dispatch(actionTableResize(data));
    } catch (e) {
      console.warn(e.message);
    }
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      this.resizeTable(event);
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

  onInput(event) {
    this.textUpdateStore($(event.target).text());
  }

  onFormulaUpdate(text) {
    this.cellSelection.current.text(text);
    this.textUpdateStore(text);
  }

  onFormulaDone() {
    this.selectCellUpdate(this.cellSelection.current);
  }

  onToolbarUpdate(style) {
    this.cellSelection.applyStyle(style);
  }

  selectCellUpdate($cell) {
    this.cellSelection.select($cell);
    this.textUpdateStore($cell.text());
    const cellStyles = $cell.getStyles(Object.keys(defaultStyles));
    console.log(cellStyles); // fixme
  }

  textUpdateStore(textData) {
    const data = {
      cellData: {
        id: this.cellSelection.current.getId(),
        value: textData,
      },
      currentTextContent: textData,
    };
    this.$dispatch(actionTableTextUpdate(data));
  }
}
