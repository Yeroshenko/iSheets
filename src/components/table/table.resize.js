import { $ } from '@core/Dom'

export const resizeHandler = (event, $root) => {
  return new Promise(resolve => {
    const $resizer = $(event.target)
    const resizeType = $resizer.data.resize
    const $parent = $resizer.closest('[data-type="resizable"]')
    const coords = $parent.getCoords()

    const sideProp = resizeType === 'col' ? 'bottom' : 'right'
    const sizeProp = resizeType === 'col' ? 'width' : 'height'

    // default resizer styles
    const { right, bottom, opacity } = $resizer.getStyle()

    const minCellWidth = parseInt($parent.getStyle().minWidth)
    const minCellHeight = parseInt($parent.getStyle().minHeight)

    let delta
    let value

    $resizer.css({ opacity, [sideProp]: '-2000px' })

    document.onmousemove = event => {
      if (resizeType === 'col') {
        delta = event.pageX - coords.right
        value = coords.width + delta

        value >= minCellWidth
          ? $resizer.css({ right: -delta + 'px' })
          : (value = minCellWidth)
      }

      if (resizeType === 'row') {
        delta = event.pageY - coords.bottom
        value = coords.height + delta

        value >= minCellHeight
          ? $resizer.css({ bottom: -delta + 'px' })
          : (value = minCellHeight)
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
      console.log('$parent -->', $parent.data)
      resolve({
        value,
        type: resizeType,
        id: $parent.data[resizeType]
      })

      $resizer.css({ bottom, right, opacity: 0 })
    }
  })
}
