import { EventStreamContentType, fetchEventSource } from '@microsoft/fetch-event-source'

export async function chat(conversations, controller, callback) {
  const result = []
  await fetchEventSource('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      conversations: conversations.map((item) => {
        return {
          user_msg: item.user,
          assistant_msg: item.assistant,
        }
      }),
    }),
    signal: controller.signal,
    openWhenHidden: true,
    async onopen(response) {
      console.log('response', response);
      if (response.ok && response.headers.get('content-type') === EventStreamContentType) {
        // everything's good
      }
      else {
        if (!response.ok)
          throw new Error(response.statusText)
        else
          throw new Error('Unexpected Content-Type')
      }
    },
    onmessage(ev) {
      console.log('ev', ev);
      switch (ev.event) {
        case 'meta':
          break
        case '':
          result.push(ev.data)
          break
        default:
      }
      callback(result.join(''))
    },
    onerror(error) {
      throw error
    },
  })
  return result.join('')
}
