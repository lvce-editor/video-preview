import { WebView } from '../WebView/WebView.ts'
import * as WebViewStates from '../WebViewStates/WebViewStates.ts'

export const create = (id: number): void => {
  const webView: WebView = {
    url: '',
    time: 0,
  }
  WebViewStates.set(id, webView)
}
