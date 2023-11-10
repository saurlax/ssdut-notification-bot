import { config } from 'dotenv'
import { JSDOM } from 'jsdom'

config()
const size = parseInt(process.env.SIZE ?? 5)

let ssbuffer = []

export async function ss () {
  const news = []
  const res = await fetch('https://ss.dlut.edu.cn/index/bkstz.htm')
  const doc = new JSDOM(await res.text()).window.document
  ssbuffer = Array.from(doc.querySelectorAll('.c_hzjl_list1 ul li'))
    .slice(0, size)
    .map(li => li.querySelector('a'))
    .map(a => {
      if (!ssbuffer.includes(a.href)) {
        news.push(
          a.title + '\n' + a.href.replace('..', 'https://ss.dlut.edu.cn')
        )
      }
      return a.href
    })
  return news
}

let edabuffer = []

export async function eda () {
  const news = []
  const res = await fetch('http://eda.dlut.edu.cn/tzgg/tzgg.htm')
  const doc = new JSDOM(await res.text()).window.document
  edabuffer = Array.from(doc.querySelectorAll('.ny_list ul li'))
    .slice(0, size)
    .map(li => li.querySelector('a'))
    .map(a => {
      if (!edabuffer.includes(a.href)) {
        news.push(
          a.textContent + '\n' + a.href.replace('..', 'http://eda.dlut.edu.cn')
        )
      }
      return a.href
    })
  return news
}
