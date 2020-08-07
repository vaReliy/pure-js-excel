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

  toHTML() {
    return getTemplateTable();
  }

  onMousedown(event) {
    const resizeTarget = event.target.dataset.resize;
    if (resizeTarget) {
      const $parent = $(event.target)
          .closest('[data-resizable]')
          .$nativeElement;
      const isColumn = resizeTarget === 'column';
      const rect = $parent.getBoundingClientRect();
      const parentId = $parent.innerText.toLowerCase();
      const targetCellAttribute = `[data-resizable-${parentId}]`;
      const $cells = document.querySelectorAll(targetCellAttribute);
      const resizeProgressClass = `${resizeTarget}-resize-active`;

      $parent.classList.add(resizeProgressClass);
      if (isColumn) {
        $cells.forEach(cell => {
          cell.classList.add(resizeProgressClass);
        });
      }

      document.onmousemove = event => {
        let delta;
        if (isColumn) {
          delta = event.clientX - rect.right;
          const widthValue = `${rect.width + delta}px`;
          $parent.style.width = widthValue;
          $cells.forEach(cell => {
            cell.style.width = widthValue;
          });
        } else {
          delta = event.clientY - rect.bottom;
          $parent.style.height = `${rect.height + delta}px`;
        }
      };

      document.onmouseup = () => {
        $parent.classList.remove(resizeProgressClass);
        $cells.forEach(cell => {
          cell.classList.remove(resizeProgressClass);
        });
        document.onmousemove = null;
      };
    }
  }
}
