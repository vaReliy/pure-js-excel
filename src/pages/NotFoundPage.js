import {Page} from '@/pages/Page';
import {$} from '@core/Dom';
import {ActiveRouter} from '@core/router/ActiveRouter';

export class NotFoundPage extends Page {
  getRoot() {
    this.context = $.create('div', 'not-found');
    return this.context.html(`
      <h1>Error 404!</h1>
      <h2>The page "/#${ActiveRouter.path()}" is not found!</h2>
    `);
  }
}
