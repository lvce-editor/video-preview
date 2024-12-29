import * as WebViewId from '../WebViewId/WebViewId.ts'

const getRemoteUrl = async (uri) => {
  // @ts-ignore
  const remoteUrl = await vscode.getRemoteUrl(uri, {
    webViewId: WebViewId.webViewId,
  })
  return remoteUrl
}

export const commandMap = {
  'Host.getRemoteUrl': getRemoteUrl,
}
