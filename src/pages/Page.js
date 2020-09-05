export class Page {
  constructor(params) {
    this.params = params;
  }

  getRoot() {
    throw new Error('The method "getRoot" should be implemented!');
  }

  afterViewInit() {
  }

  destroy() {
    this.params = null;
  }
}
