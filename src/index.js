import {Excel} from '@/components/excel/Excel';
import {Formula} from '@/components/formula/Formula';
import {Header} from '@/components/header/Header';
import {Table} from '@/components/table/Table';
import {Toolbar} from '@/components/toolbar/Toolbar';
import {rootReducer} from '@/redux/rootReducer';
import {State} from '@/redux/state';
import {storage} from '@/utils/utils';
import {Store} from '@core/Store';
import './scss/index.scss';

const stateKey = 'excel-state';
const appState = storage(stateKey) || new State();
const store = new Store(rootReducer, appState);

store.subscribe(state => {
  console.log('APP', state); // fixme
  storage(stateKey, state);
});

const excel = new Excel('#app', {
  components: [Header, Toolbar, Formula, Table],
  store,
});
excel.render();
