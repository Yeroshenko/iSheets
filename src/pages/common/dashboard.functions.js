import { storage } from '@core/utils'

export const toHTML = key => {
  const model = storage(key)
  const id = key.split(':')[1]

  return `
    <a href='#spreadsheet/${id}' class='dashboard__table'>
      <div class='dashboard__table-name'>${model.title}</div>
      <div class='dashboard__table-date'>
        Дата открытия: <span>
          ${new Date(model.lastOpened).toLocaleDateString()}
        </span>
      </div>
    </a>
  `
}

const getAllKeys = () => {
  const keys = []

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)

    if (!key.includes('spreadsheet')) {
      continue
    }

    keys.push(key)
  }

  return keys
}

export const getAllRecords = () => {
  return getAllKeys().map(toHTML).join('')
}
