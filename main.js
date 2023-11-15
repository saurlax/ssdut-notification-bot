import { config } from 'dotenv'
import { send } from './sender.js'
import { update } from './fetcher.js'

config()
const time = parseFloat(process.env.TIME ?? 30)

async function timer () {
  const hour = new Date().getUTCHours() + 8
  if (hour < 8 || hour > 22) return
  const news = await update()
  console.log(Date.now())
  if (news.length > 0) {
    news.forEach(send)
  }
}

process.on('unhandledRejection', (reason, p) => {
  send(reason.stack)
})

send('started')
update()
setInterval(timer, time * 60000)
