export function send (data) {
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
