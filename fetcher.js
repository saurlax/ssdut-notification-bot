import { config } from 'dotenv'
import { JSDOM } from 'jsdom'

const targets = [
  {
    url: 'https://ss.dlut.edu.cn/index/bkstz.htm',
    selector: '.c_hzjl_list1 ul li',
    title: a => a.title,
    link: a => a.href.replace('..', 'https://ss.dlut.edu.cn')
  },
  {
    url: 'https://teach.dlut.edu.cn/byxx/byxx.htm',
    selector: '.list ul li',
    title: a => a.title,
    link: a => a.href.replace('..', 'https://teach.dlut.edu.cn')
  }
]

export async function update() {
  let results = []
  for (const target of targets) {
    const res = await fetch(target.url)
    const doc = new JSDOM(await res.text()).window.document
    const items = Array.from(doc.querySelectorAll(target.selector))
      .slice(0, 5)
      .map(li => li.querySelector('a'))
      .map(a => {
        return { title: target.title(a), link: target.link(a) }
      })
    results.push(...items)
  }
  return results
}