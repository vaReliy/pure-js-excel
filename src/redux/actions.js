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
