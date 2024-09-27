// TODO use virtual dom in  worker

const handleError = async (event) => {
  console.log('error', event)
  await rpc.invoke('handleError')
}

const initialize = (remoteUrl) => {
  const app = document.createElement('div')
  app.className = 'App'

  const videoContent = document.createElement('div')
  videoContent.className = 'VideoContent'

  const video = document.createElement('video')
  video.className = 'VideoElement'
  video.src = remoteUrl
  video.controls = true
  video.addEventListener('error', handleError)

  videoContent.append(video)
  app.append(videoContent)

  document.body.append(app)
}

const update = (state) => {}

const setError = (message) => {
  document.body.textContent = ''
  const $Error = document.createElement('div')
  $Error.className = 'Error'
  $Error.textContent = message
  document.body.append($Error)
}

const rpc = globalThis.lvceRpc({
  initialize,
  update,
  setError,
})
