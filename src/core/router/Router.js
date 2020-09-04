import {$} from '@core/Dom';
import {ActiveRouter} from '@core/router/ActiveRouter';

export class Router {
  constructor(selector, routes) {
    if (!selector) {
      throw new Error('The selector of Router instance should be defined!');
    }
    this.routes = routes;
    this.$pagePlaceholder = $(selector);
    this.onHashChange = this.onHashChange.bind(this);
    this.init();
  }

  init() {
    window.addEventListener('hashchange', this.onHashChange);

    console.log('current hash is', ActiveRouter.path()); // fixme
    // const ActivePageClass = this.routes.excel;
    // const ActivePageClass = this.routes.dashboard;
    const ActivePageClass = this.routes.notFound;
    this.page = new ActivePageClass();
    this.$pagePlaceholder.append(this.page.getRoot());
    this.page.afterViewInit();
  }

  onHashChange() {
    console.log(ActiveRouter.path()); // fixme
  }

  destroy() {
    window.removeEventListener('hashchange', this.onHashChange);
    if (this.page) {
      this.page.destroy();
    }
    this.$pagePlaceholder = null;
  }
}
