import {camelToDashCase} from '@/utils/utils';
import {defaultStyles} from '@core/constants';

const CODES = {
  A: 65,
  Z: 90,
  range: () => CODES.Z - CODES.A + 1,
};

const DEFAULT = {
  WIDTH: 120,
  HEIGHT: 24,
};

function getWidth(state, index) {
  return (state[index + 1] || DEFAULT.WIDTH) + 'px';
}

function withWidthFrom(state ={}) {
  return function({char, index}) {
    const width = getWidth(state, index);
    return {char, index, width};
  };
}

function createRow(rowId, rowData, state = {}) {
  // eslint-disable-next-line max-len
  const resize = rowId ? '<div class="row-resize" data-resize="row"></div>' : '';
  const height = (state[rowId] || DEFAULT.HEIGHT) + 'px';
  return `
        <div
            class="row"
            data-id="${rowId}"
            data-resizable="row"
            style="height: ${height}">
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

function toColumn({index, char, width}) {
  return `
    <div
        class="column"
        data-id="${index + 1}"
        data-resizable="column"
        style="width: ${width}">
        ${char}
        <div class="col-resize" data-resize="column"></div>
    </div>
    `;
}

function toCell(rowId, tableState, styleData) {
  return ({index, char}) => {
    const columnId = index + 1;
    const width = getWidth(tableState.size.col, index);
    const id = `${columnId}:${rowId}`;
    const content = tableState.cellData[id] || '';
    const styles = styleData[id] || defaultStyles;
    return `<div
              class="cell"
              contenteditable="true"
              data-resizable-${columnId}="cell"
              data-id="${id}"
              data-type="cell"
              style="width: ${width}; ${toTemplateString(styles)}">
              ${content}
          </div>`;
  };
}

/* Merge default and current styleData without empty values */
function getCorrectCellStyleData(styleData) {
  return Object.keys(styleData).reduce((data, id) => {
    const styles = styleData[id];
    data[id] = Object.keys(styles).reduce((res, key) => {
      res[key] = styles[key] ? styles[key] : defaultStyles[key];
      return res;
    }, {});
    return data;
  }, {});
}

function toTemplateString(styles) {
  return Object.keys(styles).reduce((str, key) => {
    return str + `${camelToDashCase(key)}: ${styles[key]}; `;
  }, '');
}

/**
 * @param {number} size
 * @param {TableState} tableState
 * @return {string}
 */
export function getTemplateTable(size, tableState) {
  const rows = [];
  const rowSize = CODES.range();
  const sizeState = tableState.size;
  const styleData = getCorrectCellStyleData(tableState.styleData);

  const columnHeaders = new Array(rowSize)
      .fill('')
      .map(toChar)
      .map(withWidthFrom(sizeState.col))
      .map(toColumn)
      .join('');

  rows.push(createRow('', columnHeaders));
  for (let i = 0; i < size; i++) {
    const rowId = `${i + 1}`;
    const columnCells = new Array(rowSize)
        .fill('')
        .map(toChar)
        .map(toCell(rowId, tableState, styleData))
        .join('');

    rows.push(createRow(rowId, columnCells, sizeState.row));
  }

  return rows.join('');
}
