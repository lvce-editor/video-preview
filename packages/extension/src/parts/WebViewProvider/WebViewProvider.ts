export const webViewProvider = {
  id: 'builtin.video-preview',
  async create(webView, uri) {
    // TODO if can use remote uri, use remote uri, else read file
    // @ts-ignore
    const remoteUrl = await vscode.getRemoteUrl(uri)
    await webView.invoke('initialize', remoteUrl)
    // @ts-ignore
    webViewProvider.webView = webView
  },
  async open(uri, webView) {},
  commands: {
    handleError(code, message) {
      // TODO improve error message for file not found error
      const errorMessage = `Error: Video Failed to load: ${message}`
      // @ts-ignore
      webViewProvider.webView.invoke('setError', errorMessage)
    },
  },
}
