import {Action} from '@/redux/action-type';

export function rootReducer(state, action) {
  switch (action.type) {
    case Action.__INIT__: return state;
    case Action.TABLE_RESIZE: {
      const {id, type, value} = action.data;
      state.size[type] = state.size[type] || {};
      state.size[type][id] = value;
      return {...state};
    }
    case Action.TABLE_TEXT_UPDATE: {
      const {cellData, currentTextContent} = action.data;
      state.cellData = state.cellData || {};
      state.cellData[cellData.id] = cellData.value;
      state.currentTextContent = currentTextContent || '';
      return {...state};
    }
    case Action.TABLE_STYLE_UPDATE: {
      const {id, value} = action.data;
      state.styleData = state.styleData || {};
      state.styleData[id] = value;
      return {...state};
    }
    case Action.HEADER_UPDATE: {
      const title = action.data;
      return {...state, title};
    }
    default: return state;
  }
}
