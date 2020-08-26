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

  text(text) {
    if (typeof text === 'string') {
      this.$nativeElement.textContent = text;
      return this;
    }
    return this.$nativeElement.textContent.trim();
  }

  attr(name, value) {
    if (typeof value === 'string') {
      this.$nativeElement.setAttribute(name, value);
      return this;
    }
    return this.$nativeElement.getAttribute(name);
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

  get data() {
    return this.$nativeElement.dataset;
  }

  get value() {
    return this.$nativeElement.value;
  }

  css(styles = {}) {
    Object.entries(styles).forEach(([key, value]) => {
      this.$nativeElement.style[key] = value;
    });
    return this;
  }

  getStyles(styleKeys = []) {
    return styleKeys.reduce((result, key) => {
      result[key] = this.$nativeElement.style[key];
      return result;
    }, {});
  }

  focus() {
    this.$nativeElement.focus();
    return this;
  }

  findNode(selector) {
    return $(this.$nativeElement.querySelector(selector));
  }

  findNodeList(selector) {
    return this.$nativeElement.querySelectorAll(selector);
  }

  addClass(className) {
    this.$nativeElement.classList.add(className);
    return this;
  }

  removeClass(className) {
    this.$nativeElement.classList.remove(className);
    return this;
  }

  getId(parse) {
    if (parse) {
      const parsed = this.getId().split(':');
      return {
        col: +parsed[0],
        row: +parsed[1],
      };
    }
    return this.data.id;
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
