export class TableSelection {
  static className = 'selected'

  constructor() {
    this.group = []
    this.current = null
  }

  //  $el instanceof DOM === true
  select($el) {
    this.clear()

    $el.focus().addClass(TableSelection.className)

    this.group.push($el)
    this.current = $el
  }

  selectGroup($group = []) {
    this.clear()
    this.group = $group
    this.group.map($el => $el.addClass(TableSelection.className))
  }

  get selectedIds() {
    return this.group.map($cell => $cell.id())
  }

  clear() {
    this.group.map($el => $el.removeClass(TableSelection.className))
    this.group = []
  }

  applyStyle(style) {
    this.group.map($el => $el.css(style))
  }

  setValue(value) {
    this.group.map($cell => $cell.text(value))
  }

  setAttr(name, value) {
    this.group.map($cell => $cell.attr(name, value))
  }
}
