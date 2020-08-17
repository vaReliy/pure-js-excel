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
    const $resizer = $(event.target);
    const resizeTarget =$resizer.data.resize;
    if (resizeTarget) {
      const $parent = $resizer.closest('[data-resizable]');
      const isColumn = resizeTarget === 'column';
      const rect = $parent.boundingClientRect;
      const parentId = $parent.text.toLowerCase();
      const targetCellAttribute = `[data-resizable-${parentId}]`;
      const resizerCssProp = isColumn ? 'right' : 'bottom';

      let delta;
      let widthValue;
      document.onmousemove = event => {
        if (isColumn) {
          delta = event.clientX - rect.right;
          widthValue = `${rect.width + delta}px`;
        } else {
          delta = event.clientY - rect.bottom;
        }
        $resizer.css({
          [resizerCssProp]: `${-delta}px`,
        });
      };

      document.onmouseup = () => {
        if (isColumn) {
          $parent.css({
            width: widthValue,
          });
          document.querySelectorAll(targetCellAttribute).forEach(cell => {
            cell.style.width = widthValue;
          });
        } else {
          $parent.css({
            height: `${rect.height + delta}px`,
          });
        }
        $resizer.css({
          [resizerCssProp]: 0,
        });
        document.onmousemove = null;
        document.onmouseup = null;
      };
    }
  }
}
