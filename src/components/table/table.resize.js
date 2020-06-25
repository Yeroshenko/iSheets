import { $ } from '@core'

export const resizeHandler = (event, $root) => {
  const $resizer = $(event.target)
  const resizeType = $resizer.data.resize
  const $parent = $resizer.closest('[data-type="resizable"]')
  const coords = $parent.getCoords()

  const sideProp = resizeType === 'col' ? 'bottom' : 'right'
  const sizeProp = resizeType === 'col' ? 'width' : 'height'

  // default resizer styles
  const { right, bottom, opacity } = $resizer.getStyle()

  let delta
  let value

  $resizer.css({ opacity, [sideProp]: '-2000px' })

  document.onmousemove = event => {
    if (resizeType === 'col') {
      delta = event.pageX - coords.right
      value = coords.width + delta

      $resizer.css({ right: -delta + 'px' })
    }

    if (resizeType === 'row') {
      delta = event.pageY - coords.bottom
      value = coords.height + delta

      $resizer.css({ bottom: -delta + 'px' })
    }
  }

  document.onmouseup = () => {
    document.onmousemove = null
    document.onmouseup = null

    $parent.css({ [sizeProp]: value + 'px' })

    if (resizeType === 'col') {
      $root
        .findAll(`[data-col='${$parent.data.col}']`)
        .forEach(el => (el.style.width = value + 'px'))
    }

    $resizer.css({ bottom, right, opacity: 0 })
  }
}
