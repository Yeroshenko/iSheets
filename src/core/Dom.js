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
  // addEventListener 2.0
  on(eventType, callback) {
    this.$el.addEventListener(eventType, callback)
  }

  // removeEventListener 2.0
  off(eventType, callback) {
    this.$el.removeEventListener(eventType, callback)
  }

  // ParentNode.appendChild() 2.0
  append(node) {
    if (node instanceof Dom) node = node.$el

    Element.prototype.append
      ? this.$el.append(node)
      : this.$el.appendChild(node)

    return this
  }

  get data() {
    return this.$el.dataset
  }

  closest(selector) {
    return $(this.$el.closest(selector))
  }

  getCoords() {
    return this.$el.getBoundingClientRect()
  }

  find(selector) {
    return $(this.$el.querySelector(selector))
  }

  findAll(selector) {
    return this.$el.querySelectorAll(selector)
  }

  css(styles = {}) {
    Object.keys(styles).forEach(
      styleName => (this.$el.style[styleName] = styles[styleName])
    )
  }

  getStyle() {
    return getComputedStyle(this.$el)
  }

  addClass(className) {
    this.$el.classList.add(className)
  }

  removeClass(className) {
    this.$el.classList.remove(className)
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
