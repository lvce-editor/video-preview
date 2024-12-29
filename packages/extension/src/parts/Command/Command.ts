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

const getFn = (method) => {
  const fn = commandMap[method]
  if (!fn) {
    throw new Error(`method not found: ${method}`)
  }
}

export const execute = (method, ...params) => {
  const fn = getFn(method)
  // @ts-ignore
  return fn(...params)
}
