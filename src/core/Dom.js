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

  text(text) {
    if (typeof text !== 'undefined') {
      this.$el.textContent = text
      return this
    }

    if (this.$el.tagName.toLowerCase() === 'input') {
      return this.$el.value.trim()
    }

    return this.$el.textContent.trim()
  }

  clear() {
    this.html('')
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

  id(parse) {
    if (parse) {
      const parsed = this.id().split(':')
      return {
        row: +parsed[0],
        col: +parsed[1]
      }
    }
    return this.data.id
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

  getStyles(styles = []) {
    return styles.reduce((res, s) => {
      res[s] = this.$el.style[s]
      return res
    }, {})
  }

  getStyleValue() {
    return getComputedStyle(this.$el)
  }

  addClass(className) {
    this.$el.classList.add(className)
    return this
  }

  removeClass(className) {
    this.$el.classList.remove(className)
    return this
  }

  focus() {
    this.$el.focus()
    this.cursorToEnd()
    return this
  }

  attr(name, value) {
    if (value !== undefined) {
      this.$el.setAttribute(name, value)
      return this
    }

    this.$el.getAttribute(name)
  }

  cursorToEnd() {
    const range = document.createRange()
    const sel = window.getSelection()

    range.selectNodeContents(this.$el)
    range.collapse(false)

    sel.removeAllRanges()
    sel.addRange(range)

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
