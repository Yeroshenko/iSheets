import { toInlineStyles } from '@core/utils'
import { availableCellFonts, availableCellSizes } from '@/constants'

import alignLeftIcon from '@/assets/icons/align-left.svg'
import alignRightIcon from '@/assets/icons/align-right.svg'
import alignCenterIcon from '@/assets/icons/align-center.svg'
import boldIcon from '@/assets/icons/bold.svg'
import italicIcon from '@/assets/icons/italic.svg'
import underlineIcon from '@/assets/icons/underline.svg'

const _toButton = button => {
  const meta = `
  data-type='button'
  data-value='${JSON.stringify(button.value)}'
  `

  return `
    <button
      class='spreadsheet__toolbar-button ${button.active ? 'active' : ''}'
      ${meta}
    >
      <img ${meta} src='${button.icon}'>
    </button>
  `
}

const _createSelect = (placeholder = '', listItems) => `
    <div class='spreadsheet__toolbar-select' data-type='select-wrap' >
    <div class='spreadsheet__toolbar-backdrop' data-type='backdrop'></div>
      <button class='spreadsheet__toolbar-button' data-type='select-button'>
        ${placeholder}
      </button>
      <ul class='spreadsheet__toolbar-dropdown'>${listItems}</ul>
    </div>
  `

// { textDecoration: state['textDecoration'] === 'underline' ? 'none' : 'underline' }
const _createButtonValue = (state, value, active, notActive) => ({
  [value]: state[value] === active ? notActive : active
})

const _toSelectListItem = ({
  value,
  currentValue,
  dataCreator,
  applyProperty
}) => {
  let cls = ''
  let style = ''

  if (value === parseInt(currentValue) || value === currentValue)
    cls = 'is-active'

  if (applyProperty) style = toInlineStyles(JSON.parse(dataCreator(value)))

  return `
    <li class='${cls}'
      data-type='button'
      data-value='${dataCreator ? dataCreator(value) : ''}'
      style='${style}'
    >
      ${value}
    </li>
  `
}

// 16 => fontSize: '16px'
const _sizeToFontSize = value => JSON.stringify({ fontSize: `${value}px` })

// Roboto => fontFamily: 'Roboto'
const _familyToFontFamily = value => JSON.stringify({ fontFamily: `${value}` })

const _createSizeSelect = (currentValue, sizes) => {
  const items = sizes
    .map(value =>
      _toSelectListItem({ value, currentValue, dataCreator: _sizeToFontSize })
    )
    .join('')

  return _createSelect(parseInt(currentValue), items)
}

const _createFontFamilySelect = (currentValue, fonts) => {
  const items = fonts
    .map(value =>
      _toSelectListItem({
        value,
        currentValue,
        dataCreator: _familyToFontFamily,
        applyProperty: true
      })
    )
    .join('')

  return _createSelect(currentValue, items)
}

export const createToolbar = state => {
  const buttons = [
    {
      icon: alignLeftIcon,
      active: state['textAlign'] === 'left',
      value: { textAlign: 'left' }
    },
    {
      icon: alignCenterIcon,
      active: state['textAlign'] === 'center',
      value: { textAlign: 'center' }
    },
    {
      icon: alignRightIcon,
      active: state['textAlign'] === 'right',
      value: { textAlign: 'right' }
    },
    {
      icon: boldIcon,
      active: state['fontWeight'] === 'bold',
      value: _createButtonValue(state, 'fontWeight', 'bold', 'normal')
    },
    {
      icon: italicIcon,
      active: state['fontStyle'] === 'italic',
      value: _createButtonValue(state, 'fontStyle', 'italic', 'normal')
    },
    {
      icon: underlineIcon,
      active: state['textDecoration'] === 'underline',
      value: _createButtonValue(state, 'textDecoration', 'underline', 'none')
    }
  ]

  return `
    ${buttons.map(_toButton).join('')}
    ${_createSizeSelect(state.fontSize, availableCellSizes)}
    ${_createFontFamilySelect(state.fontFamily, availableCellFonts)}
  `
}
