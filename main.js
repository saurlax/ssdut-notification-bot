import cheerio from 'cheerio'
import { config } from 'dotenv'

config()

const sslinks = []
const edalinks = []

async function load (url) {
  return cheerio.load(await fetch(url).then(res => res.text()))
}

function send (data) {
  fetch(process.env.API, {
    method: 'post',
    body: JSON.stringify({
      msgtype: 'text',
      text: {
        content: data
      }
    })
  })
}

async function main () {
  const ss = await load('https://ss.dlut.edu.cn/index/bkstz.htm')

  ss('.c_hzjl_list1 ul li')
    .slice(0, 3)
    .each(function () {
      const a = ss(this).find('a')
      const href = a.attr('href').replace('..', 'https://ss.dlut.edu.cn')
      const title = a.attr('title')
      if (!sslinks.includes(href)) {
        console.log(title, href)
        send(`${title}\n${href}`)
      }
      sslinks.shift()
      sslinks.push(href)
    })

  const eda = await load('http://eda.dlut.edu.cn/tzgg/tzgg.htm')
  eda('.ny_list ul li')
    .slice(0, 3)
    .each(function () {
      const a = eda(this).find('a')
      const href = a.attr('href').replace('..', 'http://eda.dlut.edu.cn')
      const title = a.text()
      if (!edalinks.includes(href)) {
        console.log(title, href)
        send(`${title}\n${href}`)
      }
      edalinks.shift()
      edalinks.push(href)
    })
}

setInterval(main, 5 * 60000)

process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at:', p, 'reason:', reason)
  send(`Unhandled Rejection at: ${p}, reason: ${reason}`)
})
