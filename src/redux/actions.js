import {Action} from '@/redux/action-type';

export function actionTableResize(data) {
  return {
    type: Action.TABLE_RESIZE,
    data,
  };
}

export function actionTableTextUpdate(data) {
  return {
    type: Action.TABLE_TEXT_UPDATE,
    data,
  };
}

/* data: {id: number, value: string} */
export function actionTableStyleUpdate(data) {
  return {
    type: Action.TABLE_STYLE_UPDATE,
    data,
  };
}

export function actionHeaderUpdate(data) {
  return {
    type: Action.HEADER_UPDATE,
    data,
  };
}

export function actionRemoveTable() {
  return {
    type: Action.REMOVE_TABLE,
  };
}
