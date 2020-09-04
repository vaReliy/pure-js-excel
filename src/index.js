import {DashboardPage} from '@/pages/DashboardPage';
import {ExcelPage} from '@/pages/ExcelPage';
import {NotFoundPage} from '@/pages/NotFoundPage';
import {Router} from '@core/router/Router';
import './scss/index.scss';

new Router('#app', {
  dashboard: DashboardPage,
  excel: ExcelPage,
  notFound: NotFoundPage,
});
