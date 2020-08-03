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
    this.$nativeElement.innerHTML = '';
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
}

export function $(selector) {
  return new Dom(selector);
}

$.create = (tagName, classes = '') => {
  const element = document.createElement(tagName);
  if (classes) {
    element.classList.add(classes);
  }
  return element;
};
