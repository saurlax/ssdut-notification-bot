import { config } from 'dotenv'
import { JSDOM } from 'jsdom'

config()
const size = parseInt(process.env.SIZE ?? 5)
const targets = [
  {
    url: 'https://ss.dlut.edu.cn/index/bkstz.htm',
    selector: '.c_hzjl_list1 ul li',
    title: a => a.title,
    link: a => a.href.replace('..', 'https://ss.dlut.edu.cn'),
    buffer: []
  },
  {
    url: 'https://eda.dlut.edu.cn/tzgg/tzgg.htm',
    selector: '.ny_list ul li',
    title: a => a.textContent,
    link: a => a.href.replace('..', 'https://eda.dlut.edu.cn'),
    buffer: []
  },
  {
    url: 'https://teach.dlut.edu.cn/byxx/byxx.htm',
    selector: '.list ul li',
    title: a => a.title,
    link: a => a.href.replace('..', 'https://teach.dlut.edu.cn'),
    buffer: []
  }
]

export async function update () {
  const news = []
  for (const target of targets) {
    const res = await fetch(target.url)
    const doc = new JSDOM(await res.text()).window.document
    target.buffer = Array.from(doc.querySelectorAll(target.selector))
      .slice(0, size)
      .map(li => li.querySelector('a'))
      .map(a => {
        const title = target.title(a)
        const link = target.link(a)
        if (!target.buffer.includes(link)) {
          news.push(title + '\n' + link)
        }
        return link
      })
  }
  return news
}
