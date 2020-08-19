import {range} from '@/utils/utils';
import {$} from '@core/Dom';

export function shouldResize(event) {
  return event.target.dataset.resize;
}

export function isCell(event) {
  return event.target.dataset.type === 'cell';
}

export function cellIdMatrix(start, end) {
  const rowsIds = range(start.row, end.row);
  const colsIds = range(start.col, end.col);
  return colsIds.reduce((acc, colId) => {
    rowsIds.forEach(rowId => {
      acc.push(`${colId}:${rowId}`);
    });
    return acc;
  }, []);
}

export function resizeHandler(event) {
  const $resizer = $(event.target);
  const $parent = $resizer.closest('[data-resizable]');
  const isColumn = $resizer.data.resize === 'column';
  const rect = $parent.boundingClientRect;
  const parentId = $parent.getId();
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
