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
    default: return state;
  }
}
