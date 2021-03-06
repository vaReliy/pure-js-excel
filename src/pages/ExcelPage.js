import {Excel} from '@/components/excel/Excel';
import {Formula} from '@/components/formula/Formula';
import {Header} from '@/components/header/Header';
import {Table} from '@/components/table/Table';
import {Toolbar} from '@/components/toolbar/Toolbar';
import {Page} from '@/pages/Page';
import {rootReducer} from '@/redux/rootReducer';
import {defaultState} from '@/redux/state';
import {
  debounce,
  isProductionMode, preventDefault,
  removeStorageBy,
  storage,
} from '@/utils/utils';
import {ActiveRouter} from '@core/router/ActiveRouter';
import {Store} from '@core/Store';

export class ExcelPage extends Page {
  getRoot() {
    const stateKey = `excel:${this.params}`;
    const appState = storage(stateKey) || defaultState;
    const store = new Store(rootReducer, appState);

    const stateListener = state => {
      if (!isProductionMode()) {
        console.log('redux:', state);
      }
      if (state) {
        storage(stateKey, state);
      } else {
        removeStorageBy(stateKey);
        ActiveRouter.navigate('#dashboard');
      }
    };

    store.subscribe(debounce(stateListener, 300));

    this.excel = new Excel({
      components: [Header, Toolbar, Formula, Table],
      store,
    });
    return this.excel.getRoot();
  }

  afterViewInit() {
    super.afterViewInit();
    if (isProductionMode()) {
      window.addEventListener('contextmenu', preventDefault);
    }
    this.excel.render();
  }

  destroy() {
    super.destroy();
    window.removeEventListener('contextmenu', preventDefault);
    this.excel.destroy();
  }
}
