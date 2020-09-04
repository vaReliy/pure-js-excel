export class Page {
  context;

  constructor() {
  }

  getRoot() {
  }

  afterViewInit() {
  }

  destroy() {
    if (this.context) {
      this.context.destroy();
    }
  }
}
