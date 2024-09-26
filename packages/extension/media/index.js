// TODO use virtual dom in  worker

const initialize = (remoteUrl) => {
  const app = document.createElement('div')
  app.className = 'App'

  const videoContent = document.createElement('div')
  videoContent.className = 'VideoContent'

  const video = document.createElement('video')
  video.className = 'VideoElement'
  video.src = remoteUrl

  videoContent.append(video)
  app.append(videoContent)

  document.body.append(app)
}

const update = (state) => {}

const rpc = globalThis.lvceRpc({
  initialize,
  update,
})
