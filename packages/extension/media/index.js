// TODO use virtual dom in  worker

const handleError = async (event) => {
  const { target } = event
  const { error } = target
  const { code, message } = error
  await rpc.invoke('handleError', code, message)
}

const handleLoad = async (event) => {
  await rpc.invoke('handleLoad')
}

const handleTimeUpdated = async (event) => {
  const { target } = event
  const { currentTime } = target
  await rpc.invoke('handleTimeUpdate', currentTime)
}

const initialize = (remoteUrl, time) => {
  const app = document.createElement('div')
  app.className = 'App'

  const videoContent = document.createElement('div')
  videoContent.className = 'VideoContent'

  const video = document.createElement('video')
  video.className = 'VideoElement'
  video.src = remoteUrl
  video.controls = true
  if (time) {
    video.currentTime = time
  }
  video.addEventListener('error', handleError)
  video.addEventListener('loadeddata', handleLoad)
  video.addEventListener('timeupdate', handleTimeUpdated)

  videoContent.append(video)
  app.append(videoContent)

  document.body.append(app)
}

const setError = (message) => {
  document.body.textContent = ''
  const $Error = document.createElement('div')
  $Error.className = 'Error'
  $Error.textContent = message
  document.body.append($Error)
}

const rpc = globalThis.lvceRpc({
  initialize,
  setError,
})

// TODO in beforeunload, there is ~30ms time to save state in indexeddb
// before the worker is disposed. it might even be less time in mobile browsers.
window.addEventListener('beforeunload', async (event) => {
  console.log('before unload')
  await rpc.invoke('beforeUnload')
})
