export class ActiveRouter {
  static path() {
    return window.location.hash.slice(1);
  }

  static param() {
    return ActiveRouter.path().split('/')[1] || '';
  }

  static navigate(hash) {
    window.location.hash = hash;
  }
}
