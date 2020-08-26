import {Excel} from '@/components/excel/Excel';
import {Formula} from '@/components/formula/Formula';
import {Header} from '@/components/header/Header';
import {Table} from '@/components/table/Table';
import {Toolbar} from '@/components/toolbar/Toolbar';
import {rootReducer} from '@/redux/rootReducer';
import {defaultState} from '@/redux/state';
import {debounce, storage} from '@/utils/utils';
import {Store} from '@core/Store';
import './scss/index.scss';

const stateKey = 'excel-state';
const appState = storage(stateKey) || defaultState;
const store = new Store(rootReducer, appState);

const stateListener = state => {
  console.log('APP', state); // fixme
  storage(stateKey, state);
};

store.subscribe(debounce(stateListener, 300));

const excel = new Excel('#app', {
  components: [Header, Toolbar, Formula, Table],
  store,
});
excel.render();
