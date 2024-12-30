import * as Create from '../Create/Create.ts'
import * as GetTime from '../GetTime/GetTime.ts'
import * as Rpc from '../Rpc/Rpc.ts'
import * as SetSavedState from '../SetSavedState/SetSavedState.ts'
import { VideoLoadError } from '../VideoLoadError/VideoLoadError.ts'

// export const commandMap = {
// 'VideoPreview.create': Create.create,
// 'VideoPreview.getTime': GetTime.getTime,
// 'VideoPreview.getUrl': GetUrl.getUrl,
// 'VideoPreview.saveState': SaveState.saveState,
// 'VideoPreview.setSavedState': SetSavedState.setSavedState,
// 'VideoPreview.setTime': SetTime.setTime,
// }

const id = 1

const ports = Object.create(null)

const create = async ({ port, savedState, webViewId, uri }) => {
  console.log('webview create')
  Create.create(id)
  SetSavedState.setSavedState(id, savedState)
  const remoteUrl = await Rpc.invoke('WebView.getRemoteUrl', {
    uri,
    webViewId,
  })

  console.log({ remoteUrl })
  const time = GetTime.getTime(id)
  console.log({ time })
  console.log('before init')
  const event = await port.invoke('initialize', remoteUrl, time)
  console.log('after init')
  console.log({ event })
  if (event.type === 'error') {
    throw new VideoLoadError(event)
  }

  return {}
}

const setPort = (id, port) => {
  ports[id] = port
}

export const commandMap = {
  'WebView.create': create,
  'WebView.setPort': setPort,
}
