import * as WebViewId from '../WebViewId/WebViewId.ts'

const getRemoteUrl = async (uri) => {
  // @ts-ignore
  const remoteUrl = await vscode.getRemoteUrl(uri, {
    webViewId: WebViewId.webViewId,
  })
  return remoteUrl
}

const getFn = (method) => {
  switch (method) {
    case 'getRemoteUrl':
      return getRemoteUrl
    default:
      throw new Error(`method not found: ${method}`)
  }
}

const execute = (method, ...params) => {
  const fn = getFn(method)
  // @ts-ignore
  return fn(...params)
}

// @ts-ignore
const rpc = vscode.createRpc({
  id: 'builtin.video-preview.video-preview-worker',
  execute,
})

export const invoke = (method, ...params) => {
  return rpc.invoke(method, ...params)
}
