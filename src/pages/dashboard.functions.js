export const toHTML = () => {
  return `
    <div class='dashboard__table'>
      <div class='dashboard__table-name'>
        Новая таблица
      </div>
      <div class='dashboard__table-date'>
        Дата открытия: <span>17.07.2020</span>
      </div>
    </div>
  `
}

const getAllKeys = () => {
  const keys = []

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)

    if (key.includes('spreadsheet')) {
      continue
    }

    keys.push(key)
  }

  return keys
}

export const getAllRecords = () => {
  const keys = getAllKeys()

  console.log(keys)

  return keys.map(toHTML).join('')
}
