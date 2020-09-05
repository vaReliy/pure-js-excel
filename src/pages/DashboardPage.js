import {dashboardToHTML} from '@/pages/dashboard.template';
import {Page} from '@/pages/Page';
import {$} from '@core/Dom';

export class DashboardPage extends Page {
  getRoot() {
    return $.create('div', 'db').html(dashboardToHTML());
  }
}
