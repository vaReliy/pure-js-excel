import {Action} from '@/redux/action-type';

export function rootReducer(state, action) {
  switch (action.type) {
    case Action.TABLE_RESIZE: {
      const {id, type, value} = action.data;
      const table = state.table || {};
      table[type] = table[type] || {};
      table[type][id] = value;
      return {...state, table};
    }
    case Action.TABLE_TEXT_UPDATE: {
      const {cellData, currentTextContent} = action.data;
      const table = state.table || {};
      table.cellData = table.cellData || {};
      table.cellData[cellData.id] = cellData.value;
      table.currentTextContent = currentTextContent || '';
      return {...state, table};
    }
    default: return state;
  }
}
