import { send } from './sender.js'
import { update } from './fetcher.js'
import { getData, setData } from './db.js'

const data = await update()
const old = getData()
data
  .filter(item => !old.includes(item.link))
  .forEach(item => {
    send(`${item.title}\n${item.link}`)
  })
setData(data.map(item => item.link))
console.log('done')
