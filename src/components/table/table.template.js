const CODES = {
  A: 65,
  Z: 90,
  range: () => CODES.Z - CODES.A + 1,
};

function createRow(rowId, rowData) {
  // eslint-disable-next-line max-len
  const resize = rowId ? '<div class="row-resize" data-resize="row"></div>' : '';
  return `
        <div class="row" data-resizable="row">
            <div class="row-info">
                ${rowId}
                ${resize}
            </div>
            <div class="row-data">${rowData}</div>
        </div>
    `;
}

/**
 * @param {Object} _
 * @param {number} index
 * @return {{char: string, index: number}}
 */
function toChar(_, index) {
  let charCode = CODES.A + index;
  const result = {
    index,
    char: '',
  };
  const suffix = Math.floor(index / CODES.range());
  if (suffix) {
    charCode = CODES.A + (index - suffix * CODES.range());
    result.char = String.fromCharCode(charCode) + `${suffix}`;
  } else {
    result.char = String.fromCharCode(charCode);
  }
  return result;
}

function toColumn({index, char}) {
  return `
    <div class="column" data-id="${index + 1}" data-resizable="column">
        ${char}
        <div class="col-resize" data-resize="column"></div>
    </div>
    `;
}

function toCell(rowId) {
  return ({index, char}) => {
    const columnId = index + 1;
    return `<div
              class="cell"
              contenteditable="true"
              data-resizable-${columnId}="cell"
              data-id="${columnId}:${rowId}"
              data-type="cell">
          </div>`;
  };
}


export function getTemplateTable(size = 30) {
  const rows = [];
  const rowSize = CODES.range();

  const columnHeaders = new Array(rowSize)
      .fill('')
      .map(toChar)
      .map(toColumn)
      .join('');

  rows.push(createRow('', columnHeaders));
  for (let i = 0; i < size; i++) {
    const rowId = `${i + 1}`;
    const columnCells = new Array(rowSize)
        .fill('')
        .map(toChar)
        .map(toCell(rowId))
        .join('');

    rows.push(createRow(rowId, columnCells));
  }

  return rows.join('');
}
