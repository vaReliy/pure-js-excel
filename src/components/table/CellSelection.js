export class CellSelection {
  static className = 'selected';

  constructor() {
    this.group = [];
    this._current = null;
  }

  get current() {
    return this._current;
  }

  /**
   * @param {Dom} $el Select active table cell
   */
  select($el) {
    this.reset();
    this.group.push($el);
    this._current = $el;
    this.applySelect();
  }

  /**
   * @param {Dom[]} $group Add target cell to active table cells
   */
  selectGroup($group) {
    this.reset();
    this.group = $group;
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
