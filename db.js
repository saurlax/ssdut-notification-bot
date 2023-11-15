import { existsSync, readFileSync, writeFileSync } from 'fs'

export function getData () {
  if (!existsSync('db.txt')) {
    writeFileSync('db.txt', '')
  }
  const text = readFileSync('db.txt', 'utf8')
  return text.split('\n')
}

export function setData (data) {
  writeFileSync('db.txt', data.join('\n'))
}
