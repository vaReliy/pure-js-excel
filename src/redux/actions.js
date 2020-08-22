import {Action} from '@/redux/action-type';

export function actionTableResize(data) {
  return {
    type: Action.TABLE_RESIZE,
    data,
  };
}
