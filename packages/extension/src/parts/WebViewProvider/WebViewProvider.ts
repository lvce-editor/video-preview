import * as VideoPreviewWorker from '../VideoPreviewWorker/VideoPreviewWorker.ts'

const previewId = 1

export const webViewProvider = {
  id: 'builtin.video-preview',
  async create(webView, uri) {
    console.log({ uri })
    // TODO if can use remote uri, use remote uri, else read file
    // @ts-ignore
    const remoteUrl = await VideoPreviewWorker.invoke('videoPreview.getUrl', uri)
    await webView.invoke('initialize', remoteUrl)
    // @ts-ignore
    webViewProvider.webView = webView
    await VideoPreviewWorker.invoke('videoPreview.create', previewId)
  },
  async open(uri, webView) {},
  commands: {
    // TODO support zoom
    // TODO support drag via mouse move
    async update(newState) {
      // @ts-ignore
      await webViewProvider.webView.invoke('update', newState)
    },
    async handlePointerDown(x, y) {
      // @ts-ignore
      const newState = await VideoPreviewWorker.invoke('videoPreview.handlePointerDown', previewId, x, y)
      return webViewProvider.commands.update(newState)
    },
    async handlePointerMove(x, y) {
      // @ts-ignore
      const newState = await VideoPreviewWorker.invoke('videoPreview.handlePointerMove', previewId, x, y)
      return webViewProvider.commands.update(newState)
    },
    async handlePointerUp(x, y) {
      // @ts-ignore
      const newState = await VideoPreviewWorker.invoke('videoPreview.handlePointerUp', previewId, x, y)
      return webViewProvider.commands.update(newState)
    },
  },
}
