import * as VideoPreviewWorker from '../VideoPreviewWorker/VideoPreviewWorker.ts'
import * as WebViewId from '../WebViewId/WebViewId.ts'

const id = 1

// TODO move all of this to video worker.
// then the video worker only asks for remoteUrl, which is provided by vscode.getRemoteUrl

export const webViewProvider = {
  id: WebViewId.webViewId,
  async create(webView, uri, savedState) {
    // TODO if can use remote uri, use remote uri, else read file
    // await VideoPreviewWorker.invoke('VideoPreview.create', id)
    // await VideoPreviewWorker.invoke('VideoPreview.setSavedState', id, savedState)
    // // @ts-ignore
    // // @ts-ignore
    // const remoteUrl = await vscode.getRemoteUrl(uri, {
    //   webViewId: WebViewId.webViewId,
    // })
    // const time = await VideoPreviewWorker.invoke('VideoPreview.getTime', id)
    // const event = await webView.invoke('initialize', remoteUrl, time)
    // if (event.type === 'error') {
    //   throw new VideoLoadError(event)
    // }

    // @ts-ignore
    webViewProvider.webView = webView
  },
  async open(uri, webView) {},
  async saveState() {
    // const state = await VideoPreviewWorker.invoke('VideoPreview.saveState', id)
    // return state
    return {}
  },
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
    pageHide() {
      console.log('page hide (worker)')
    },
    async beforeUnload() {
      console.log('before unload (worker)')
    },
  },
}
