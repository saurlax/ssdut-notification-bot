import { config } from 'dotenv'
import { eda, ss } from './fetcher.js'
import { send } from './sender.js'

config()
const time = parseFloat(process.env.TIME) ?? 30

async function update () {
  const hour = new Date().getUTCHours() + 8
  if (hour < 8 || hour > 22) return
  const news = (await ss()).concat(await eda())
  console.log(Date.now())
  console.log(news)
  if (news.length > 0) news.forEach(send)
}

console.log('started')
setInterval(update, time * 60000)
