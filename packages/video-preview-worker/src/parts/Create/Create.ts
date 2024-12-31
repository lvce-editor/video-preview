import * as GetTime from '../GetTime/GetTime.ts'
import { id } from '../Id/Id.ts'
import * as Rpc from '../Rpc/Rpc.ts'
import * as SetSavedState from '../SetSavedState/SetSavedState.ts'
import { VideoLoadError } from '../VideoLoadError/VideoLoadError.ts'
import { WebView } from '../WebView/WebView.ts'
import * as WebViewStates from '../WebViewStates/WebViewStates.ts'

export const create = async ({ port, savedState, webViewId, uri, id }) => {
  const webView: WebView = {
    url: '',
    time: 0,
  }
  WebViewStates.set(id, webView)
  SetSavedState.setSavedState(id, savedState)
  const remoteUrl = await Rpc.invoke('WebView.getRemoteUrl', {
    uri,
    id,
    webViewId,
  })

  const time = GetTime.getTime(id)
  const event = await port.invoke('initialize', remoteUrl, time)
  if (event.type === 'error') {
    throw new VideoLoadError(event)
  }

  return {}
}
