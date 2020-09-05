import {$} from '@core/Dom';
import {ActiveRouter} from '@core/router/ActiveRouter';

export class Router {
  constructor(selector, routes) {
    if (!selector) {
      throw new Error('The selector of Router instance should be defined!');
    }
    this.routes = routes;
    this.$pagePlaceholder = $(selector);
    this.$currentNode = null;
    this.page = null;
    this.onHashChange = this.onHashChange.bind(this);
    this.init();
  }

  init() {
    window.addEventListener('hashchange', this.onHashChange);
    this.onHashChange();
  }

  onHashChange() {
    this.updatePageContent();
  }

  getActivePageClass(path) {
    switch (path) {
      case '':
      case 'dashboard':
        return this.routes.dashboard;
      case 'excel':
        return this.routes.excel;
      default:
        return this.routes.notFound;
    }
  }

  updatePageContent() {
    this.cleanPageContent();
    const ActivePageClass = this.getActivePageClass(ActiveRouter.path());
    this.page = new ActivePageClass();
    this.$currentNode = this.page.getRoot();
    this.$pagePlaceholder.append(this.$currentNode);
    this.page.afterViewInit();
  }

  cleanPageContent() {
    if (this.page) {
      this.page.destroy();
    }
    if (this.$currentNode) {
      this.$currentNode.clear();
    }
  }

  destroy() {
    window.removeEventListener('hashchange', this.onHashChange);
    if (this.page) {
      this.page.destroy();
    }
    this.$pagePlaceholder = null;
    this.$currentNode = null;
    this.page = null;
  }
}
