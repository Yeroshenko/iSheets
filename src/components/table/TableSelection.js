export class TableSelection {
  static className = 'selected'

  constructor() {
    this.group = []
  }

  //  $el instanceof DOM === true
  select($el) {
    this.clear()
    this.group.push($el)
    $el.addClass(TableSelection.className)
  }

  selectGroup() {}

  clear() {
    this.group.map($el => $el.removeClass(TableSelection.className))
    this.group = []
  }
}
