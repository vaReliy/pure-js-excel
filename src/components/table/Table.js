import {ExcelComponent} from '@core/ExcelComponent';

export class Table extends ExcelComponent {
  static className = 'excel__table';

  toHTML() {
    return `<div class="row">
                <div class="row-info"></div>

                <div class="row-data">
                    <div class="column">A</div>
                    <div class="column">B</div>
                    <div class="column">C</div>
                </div>
            </div>

            <div class="row">
                <div class="row-info">1</div>

                <div class="row-data">
                    <div class="cell selected" contenteditable="true">A1</div>
                    <div class="cell" contenteditable="true">B1</div>
                    <div class="cell" contenteditable="true">C1</div>
                </div>
            </div>

            <div class="row">
                <div class="row-info">2</div>

                <div class="row-data">
                    <div class="cell" contenteditable="true">A2</div>
                    <div class="cell" contenteditable="true">B2</div>
                    <div class="cell" contenteditable="true">C2</div>
                </div>
            </div>
    `;
  }
}
