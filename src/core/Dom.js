class Dom {
  constructor(selector) {
    this.$el =
      typeof selector === 'string' ? document.querySelector(selector) : selector
  }

  // element.innerHTML 2.0
  html(html) {
    if (typeof html === 'string') {
      this.$el.innerHTML = html
      return this
    }
    return this.$el.outerHTML.trim()
  }

  clear() {
    this.html('')
    return this
  }

  on(eventType, callback) {
    this.$el.addEventListener(eventType, callback)
  }

  off(eventType, callback) {
    this.$el.removeEventListener(eventType, callback)
  }

  // ParentNode.appendChild() 2.0
  append(node) {
    if (node instanceof Dom) {
      node = node.$el
    }

    Element.prototype.append
      ? this.$el.append(node)
      : this.$el.appendChild(node)

    return this
  }
}

// event.target
export const $ = selector => {
  return new Dom(selector)
}

$.create = (tagName, classes = '') => {
  const el = document.createElement(tagName)

  if (classes) {
    el.classList.add(classes)
  }
  return $(el)
}
