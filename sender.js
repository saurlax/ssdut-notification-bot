export function send (data) {
  console.log(data)
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
