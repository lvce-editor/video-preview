import { WebView } from '../WebView/WebView.ts'
import * as WebViewStates from '../WebViewStates/WebViewStates.ts'

export const setTime = (id: number, time: number): void => {
  const webView = WebViewStates.get(id)
  const newWebView: WebView = {
    ...webView,
    time,
  }
  WebViewStates.set(id, newWebView)
}
