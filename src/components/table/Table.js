import { SpreadsheetComponent } from '@core/SpreadsheetComponent'
import { defaultCellStyles, tableRowCount } from '@/constants'
import { $ } from '@core/Dom'
import { parse } from '@core/parse/parse'
import * as actions from '@store/actions'

import { TableSelection } from './TableSelection'
import { createTable } from './table.template'
import { resizeHandler } from './table.resize'
import { isCell, matrix, nextSelector, shouldResize } from './table.functions'

export class Table extends SpreadsheetComponent {
  static className = 'spreadsheet__table'

  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input', 'mouseover', 'mouseup'],
      ...options
    })
  }

  toHTML() {
    return createTable(tableRowCount, this.store.getState())
  }

  prepare() {
    this.selection = new TableSelection()
  }

  init() {
    super.init()

    const $cell = this.$root.find('[data-id="0:0"]')
    this.selectCell($cell)

    this.$on('formula:input', value => {
      this.selection.current.attr('data-value', value).text(parse(value))
      this.updateTextInState(value)
    })

    this.$on('formula:pressEnter', () => this.selection.current.focus())
    this.$on('toolbar:applyStyle', value => {
      this.selection.applyStyle(value)
      this.$dispatch(
        actions.applyStyle({
          value,
          ids: this.selection.selectedIds
        })
      )
    })
  }

  selectCell($cell) {
    const styles = $cell.getStyles(Object.keys(defaultCellStyles))

    this.selection.select($cell)
    this.$emit('table:select', $cell)
    this.$dispatch(actions.changeStyles(styles))
  }

  async resizeTable(event) {
    try {
      const data = await resizeHandler(event, this.$root)
      this.$dispatch(actions.tableResize(data))
    } catch (e) {
      console.warn('Resize error', e.message)
    }
  }


  updateTextInState(value) {
    const id = this.selection.current.id()

    this.$dispatch(actions.changeText({ id, value }))
  }

  clearTextsInState() {
    this.selection.group.map($cell => {
      const id = $cell.id()
      this.$dispatch(actions.changeText({ id, value: '' }))
    })
  }

  updateDataValue($target) {
    $target.attr('data-value', $target.text())
  }

  clearValues() {
    this.selection.setAttr('data-value', '')
    this.selection.setValue('')
    this.clearTextsInState()
  }

  getSelectedCells(target) {
    return matrix(target, this.selection.current)
      .map(id => this.$root.find(`[data-id='${id}']`))
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      this.resizeTable(event)
    }

    if (isCell(event)) {
      const $target = $(event.target)

      if (event.shiftKey) {
        const $cells = this.getSelectedCells($target)

        this.selection.selectGroup($cells)
      } else {
        this.mouseIsDown = true
        this.selectCell($target)
      }
    }
  }

  onMouseover(event) {
    if (this.mouseIsDown && isCell(event)) {
      const $cells = this.getSelectedCells($(event.target))

      this.selection.selectGroup($cells)
    }
  }

  onMouseup() {
    this.mouseIsDown = false
  }

  onKeydown(event) {
    const navigationKeys = ['Enter', 'Tab', 'ArrowLeft', 'ArrowRight', 'ArrowDown', 'ArrowUp']
    const removeKeys = ['Delete']

    const { key } = event

    if (navigationKeys.includes(key) && !event.shiftKey) {
      event.preventDefault()

      const id = this.selection.current.id(true)
      const $next = this.$root.find(nextSelector(key, id, this.rowCount))

      this.selectCell($next)
    }

    if (removeKeys.includes(key)) {
      event.preventDefault()
      this.clearValues()
    }
  }

  onInput(event) {
    const $target = $(event.target)

    this.updateTextInState($target.text())
    this.updateDataValue($target)
  }
}
