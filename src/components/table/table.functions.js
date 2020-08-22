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

export function closestCellId(direction, {col, row}) {
  switch (direction) {
    case 'Enter':
    case 'ArrowDown': {
      return `${col}:${row + 1}`;
    }
    case 'ArrowUp': {
      return `${col}:${Math.max(1, row - 1)}`;
    }
    case 'Tab':
    case 'ArrowRight': {
      return `${col + 1}:${row}`;
    }
    case 'ArrowLeft': {
      return `${Math.max(1, col - 1)}:${row}`;
    }
  }
}

export function resizeHandler(event) {
  return new Promise(resolve => {
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

      const updatedRect = $parent.boundingClientRect;
      const data = {
        value: isColumn ? updatedRect.width : updatedRect.height,
        id: $parent.data.id,
        type: isColumn ? 'col' : 'row',
      };
      resolve(data);

      $resizer.css({
        [resizerCssProp]: 0,
      });
      document.onmousemove = null;
      document.onmouseup = null;
    };
  });
}

export function updateColumnsSize($root, columns) {
  Object.keys(columns).forEach(id => {
    const $target = $root.findNode(`[data-id="${id}"]`);
    const value = `${columns[id]}px`;
    $target.css({
      width: value,
    });
    $root.findNodeList(`[data-resizable-${id}]`).forEach(cell => {
      cell.style.width = value;
    });
  });
}

export function updateRowsSize($root, rows) {
  const ids = Object.keys(rows);
  const nodeList = $root.findNodeList('[data-resizable="row"]');
  Array
      .from(nodeList)
      .forEach(row => {
        const id = row.getAttribute('data-id');
        if (ids.includes(id)) {
          const value = `${rows[id]}px`;
          $(row).css({
            height: value,
          });
        }
      });
}
