const CODES = {
  A: 65,
  Z: 90,
  range: () => CODES.Z - CODES.A + 1,
};

function createRow(info, rowData) {
  const resize = info ? '<div class="row-resize" data-resize="row"></div>' : '';
  return `
        <div class="row" data-resizable="row">
            <div class="row-info">
                ${info}
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

function toCell(columnName = '') {
  // eslint-disable-next-line max-len
  return `<div class="cell" contenteditable="true" data-resizable-${columnName}="cell"></div>`;
}


export function getTemplateTable(size = 30) {
  const rows = [];
  const rowSize = CODES.range();

  const columnHeaders = new Array(rowSize)
      .fill('')
      .map(toChar)
      .map(toColumn)
      .join('');

  const columnCells = new Array(rowSize)
      .fill('')
      .map(toChar)
      .map(toCell)
      .join('');

  rows.push(createRow('', columnHeaders));
  for (let i = 0; i < size; i++) {
    rows.push(createRow(`${i + 1}`, columnCells));
  }

  return rows.join('');
}
