import * as VideoPreviewWorker from '../VideoPreviewWorker/VideoPreviewWorker.ts'

export const webViewProvider = {
  id: 'builtin.video-preview',
  async create(webView, uri) {
    // TODO if can use remote uri, use remote uri, else read file
    // @ts-ignore
    const remoteUrl = await VideoPreviewWorker.invoke('VideoPreview.getUrl', uri)
    await webView.invoke('initialize', remoteUrl)
    // @ts-ignore
    webViewProvider.webView = webView
  },
  async open(uri, webView) {},
  commands: {},
}
