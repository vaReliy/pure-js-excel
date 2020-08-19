import {$} from '@core/Dom';

export class CellSelection {
  static className = 'selected';

  constructor() {
    this.group = [];
    this.current = null;
    this.$cellList = null;
  }

  updateCellList() {
    const domCells = document.querySelectorAll('[data-type="cell"]');
    this.$cellList = [...domCells].map($cell => $($cell));
    this.$cellList.forEach($el => $el.removeClass(CellSelection.className));
  }

  /**
   * @param {Dom} $el Select active table cell
   */
  select($el) {
    this.reset();
    this.group.push($el);
    this.current = $el;
    this.applySelect();
  }

  /**
   * @param {Dom} $el Add target cell to active table cells
   */
  selectGroup($el) {
    const start = this.current.getId(true);
    const end = $el.getId(true);
    this.updateCellList(); // fixme

    const targetRows = this.getRange(start, end, 'row');
    const targetCols = this.getRange(start, end, 'col');
    this.group = this.$cellList
        .filter($cell => targetRows.includes($cell.getId(true).row))
        .filter($cell => targetCols.includes($cell.getId(true).col));

    this.applySelect();
  }

  applySelect() {
    this.group.forEach($el => $el.addClass(CellSelection.className));
  }

  reset() {
    this.group.forEach($el => $el.removeClass(CellSelection.className));
    this.group = [];
    this.current = null;
  }

  getRange(start, end, fieldName) {
    const min = Math.min(start[fieldName], end[fieldName]);
    const max = Math.max(start[fieldName], end[fieldName]);
    const rangeLength = max - min + 1;
    return new Array(rangeLength)
        .fill(0)
        .map((v, i) => min + i);
  }
}
