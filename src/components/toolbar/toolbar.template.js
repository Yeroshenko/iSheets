const toButton = button => {
  const meta = `
    data-type='button'
    data-value='${JSON.stringify(button.value)}'
  `

  return `
    <button
      class='spreadsheet__toolbar-button ${button.active && 'active'}'
      ${meta}
    >
      <i class='material-icons' ${meta}>${button.icon}</i>
    </button>
  `
}

// { textDecoration: state['textDecoration'] === 'underline' ? 'none' : 'underline' }
const createButtonValue = (state, value, active, notActive) => ({
  [value]: state[value] === active ? notActive : active
})

export const createToolbar = state => {
  const buttons = [
    {
      icon: 'format_align_left',
      active: state['textAlign'] === 'left',
      value: { textAlign: 'left' }
    },
    {
      icon: 'format_align_center',
      active: state['textAlign'] === 'center',
      value: { textAlign: 'center' }
    },
    {
      icon: 'format_align_right',
      active: state['textAlign'] === 'right',
      value: { textAlign: 'right' }
    },
    {
      icon: 'format_bold',
      active: state['fontWeight'] === 'bold',
      value: createButtonValue(state, 'fontWeight', 'bold', 'normal')
    },
    {
      icon: 'format_italic',
      active: state['fontStyle'] === 'italic',
      value: createButtonValue(state, 'fontStyle', 'italic', 'normal')
    },
    {
      icon: 'format_underline',
      active: state['textDecoration'] === 'underline',
      value: createButtonValue(state, 'textDecoration', 'underline', 'none')
    }
  ]

  return buttons.map(toButton).join('')
}
