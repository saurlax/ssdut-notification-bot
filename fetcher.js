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
    url: 'https://eda.dlut.edu.cn/tzgg/tzgg.htm',
    selector: '.ny_list ul li',
    title: a => a.textContent,
    link: a => a.href.replace('..', 'https://eda.dlut.edu.cn')
  },
  {
    url: 'https://teach.dlut.edu.cn/byxx/byxx.htm',
    selector: '.list ul li',
    title: a => a.title,
    link: a => a.href.replace('..', 'https://teach.dlut.edu.cn')
  }
]

export async function update () {
  const tasks = targets.map(async target => {
    const res = await fetch(target.url)
    const doc = new JSDOM(await res.text()).window.document
    return Array.from(doc.querySelectorAll(target.selector))
      .slice(0, 5)
      .map(li => li.querySelector('a'))
      .map(a => {
        return { title: target.title(a), link: target.link(a) }
      })
  })
  return (await Promise.all(tasks)).flat()
}
