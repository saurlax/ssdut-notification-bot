import { load } from 'cheerio'
import { config } from 'dotenv'

config()
const size = parseInt(process.env.SIZE) ?? 5
const ssbuffer = new Array(size).fill('')

export async function ss () {
  const news = []
  const res = await fetch('https://ss.dlut.edu.cn/index/bkstz.htm')
  const html = await res.text()
  const $ = load(html)
  $('.c_hzjl_list1 ul li')
    .slice(0, size)
    .each(function () {
      const a = $(this).find('a')
      const href = a.attr('href').replace('..', 'https://ss.dlut.edu.cn')
      const title = a.attr('title')
      if (!ssbuffer.includes(href)) {
        news.push(`${title}\n${href}`)
      }
      ssbuffer.shift()
      ssbuffer.push(href)
    })
  return news
}

const edabuffer = new Array(size).fill('')

export async function eda () {
  const news = []
  const res = await fetch('http://eda.dlut.edu.cn/tzgg/tzgg.htm')
  const html = await res.text()
  const $ = load(html)

  $('.ny_list ul li')
    .slice(0, size)
    .each(function () {
      const a = $(this).find('a')
      const href = a.attr('href').replace('..', 'http://eda.dlut.edu.cn')
      const title = a.text()
      if (!edabuffer.includes(href)) {
        news.push(`${title}\n${href}`)
      }
      edabuffer.shift()
      edabuffer.push(href)
    })
  return news
}
