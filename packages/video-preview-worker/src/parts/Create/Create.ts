import type { WebView } from '../WebView/WebView.ts'
import * as GetTime from '../GetTime/GetTime.ts'
import * as Rpc from '../Rpc/Rpc.ts'
import * as SetSavedState from '../SetSavedState/SetSavedState.ts'
import { VideoLoadError } from '../VideoLoadError/VideoLoadError.ts'
import * as WebViewStates from '../WebViewStates/WebViewStates.ts'

export const create = async ({ id, port, savedState, uri, webViewId }) => {
  const webView: WebView = {
    time: 0,
    url: '',
  }
  WebViewStates.set(id, webView)
  SetSavedState.setSavedState(id, savedState)
  const remoteUrl = await Rpc.invoke('WebView.getRemoteUrl', {
    id,
    uri,
    webViewId,
  })

  const time = GetTime.getTime(id)
  const event = await port.invoke('initialize', remoteUrl, time)
  if (event.type === 'error') {
    throw new VideoLoadError(event)
  }

  return {}
}
