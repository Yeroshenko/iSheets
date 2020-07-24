import alignLeftIcon from '@/assets/icons/align-left.svg'
import alignRightIcon from '@/assets/icons/align-right.svg'
import alignCenterIcon from '@/assets/icons/align-center.svg'
import boldIcon from '@/assets/icons/bold.svg'
import italicIcon from '@/assets/icons/italic.svg'
import underlineIcon from '@/assets/icons/underline.svg'

const toButton = button => {
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

// { textDecoration: state['textDecoration'] === 'underline' ? 'none' : 'underline' }
const _createButtonValue = (state, value, active, notActive) => ({
  [value]: state[value] === active ? notActive : active
})

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
    ${buttons.map(toButton).join('')}
  `
}
