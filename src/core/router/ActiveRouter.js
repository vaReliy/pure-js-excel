export class ActiveRouter {
  static path() {
    return window.location.hash.slice(1);
  }
}
