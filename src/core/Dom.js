class Dom {
  constructor(selector) {
    this.$nativeElement = typeof selector === 'string' ?
      document.querySelector(selector) :
      selector;
  }

  html(innerHTML) {
    if (typeof innerHTML === 'string') {
      this.$nativeElement.innerHTML = innerHTML;
      return this;
    }
    return this.$nativeElement.outerHTML.trim();
  }

  clear() {
    this.html('');
    return this;
  }

  append(node) {
    if (node instanceof Dom) {
      node = node.$nativeElement;
    }

    if (Element.prototype.append) {
      this.$nativeElement.append(node);
    } else {
      this.$nativeElement.appendChild(node);
    }

    return this;
  }

  on(eventType, callback) {
    this.$nativeElement.addEventListener(eventType, callback);
  }

  off(eventType, callback) {
    this.$nativeElement.removeEventListener(eventType, callback);
  }

  closest(selector) {
    return $(this.$nativeElement.closest(selector));
  }

  get boundingClientRect() {
    return this.$nativeElement.getBoundingClientRect();
  }

  get text() {
    return this.$nativeElement.innerText;
  }

  get data() {
    return this.$nativeElement.dataset;
  }

  css(styles = {}) {
    Object.entries(styles).forEach(([key, value]) => {
      this.$nativeElement.style[key] = value;
    });
    return this;
  }

  find(selector) {
    return $(document.querySelector(selector));
  }

  addClass(className) {
    this.$nativeElement.classList.add(className);
  }

  removeClass(className) {
    this.$nativeElement.classList.remove(className);
  }
}

export function $(selector) {
  return new Dom(selector);
}

$.create = (tagName, classes = '') => {
  const element = document.createElement(tagName);
  if (classes) {
    element.classList.add(classes);
  }
  return $(element);
};
