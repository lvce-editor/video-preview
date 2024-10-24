import * as VideoPreviewWorker from '../VideoPreviewWorker/VideoPreviewWorker.ts'
import * as WebViewId from '../WebViewId/WebViewId.ts'

const id = 1

export const webViewProvider = {
  id: WebViewId.webViewId,
  async create(webView, uri) {
    // TODO if can use remote uri, use remote uri, else read file
    await VideoPreviewWorker.invoke('VideoPreview.create', id)
    // @ts-ignore
    const remoteUrl = await VideoPreviewWorker.invoke('VideoPreview.getUrl', uri)
    await webView.invoke('initialize', remoteUrl)
    // @ts-ignore
    webViewProvider.webView = webView
  },
  async open(uri, webView) {},
  commands: {
    handleError(code, message) {
      // TODO move this to worker
      // TODO improve error message for file not found error
      const errorMessage = `Error: Video Failed to load: ${message}`
      // @ts-ignore
      webViewProvider.webView.invoke('setError', errorMessage)
    },
    handleLoad() {
      // console.log('video loaded')
    },
    async handleTimeUpdate(currentTime) {
      await VideoPreviewWorker.invoke('VideoPreview.setTime', id, currentTime)
    },
  },
}
