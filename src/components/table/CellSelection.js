export class CellSelection {
  static className = 'selected';

  constructor() {
    this.group = [];
  }

  /**
   * @param {Dom} $el Select active table cell
   */
  select($el) {
    this.reset();
    this.group.push($el);
    this.applySelect();
  }

  /**
   * @param {Dom} $el Add target cell to active table cells
   */
  selectGroup($el) {
    this.group.push($el);
    this.applySelect();
  }

  applySelect() {
    this.group.forEach($el => $el.addClass(CellSelection.className));
  }

  reset() {
    this.group.forEach($el => $el.removeClass(CellSelection.className));
    this.group = [];
  }
}
