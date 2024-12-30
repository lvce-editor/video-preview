import * as VideoPreviewWorker from '../VideoPreviewWorker/VideoPreviewWorker.ts'
import * as WebViewId from '../WebViewId/WebViewId.ts'

const id = 1

// TODO move all of this to video worker.
// then the video worker only asks for remoteUrl, which is provided by vscode.getRemoteUrl

export const webViewProvider = {
  id: WebViewId.webViewId,
  async create(webView, uri, savedState) {},
  async open(uri, webView) {},
  async saveState() {
    const state = await VideoPreviewWorker.invoke('VideoPreview.saveState', id)
    return state
  },
}
