export class TableSelection {
  static className = 'selected'

  constructor() {
    this.group = []
    this.current = null
  }

  //  $el instanceof DOM === true
  select($el) {
    this.clear()
    $el.addClass(TableSelection.className)

    this.group.push($el)
    this.current = $el
  }

  selectGroup($group = []) {
    this.clear()
    this.group = $group
    this.group.map($el => $el.addClass(TableSelection.className))
  }

  clear() {
    this.group.map($el => $el.removeClass(TableSelection.className))
    this.group = []
  }
}
