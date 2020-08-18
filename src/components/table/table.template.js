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

function toChar(_, index) {
  let charCode = CODES.A + index;
  const suffix = Math.floor(index / CODES.range());
  if (suffix) {
    charCode = CODES.A + (index - suffix * CODES.range());
    return String.fromCharCode(charCode) + `${suffix}`;
  }
  return String.fromCharCode(charCode);
}

function toColumn(data) {
  return `
    <div class="column" data-resizable="column">
        ${data}
        <div class="col-resize" data-resize="column"></div>
    </div>
    `;
}

function toCell(rowId) {
  return columnId => {
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
