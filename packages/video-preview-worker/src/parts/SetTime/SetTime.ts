import type { WebView } from '../WebView/WebView.ts'
import { id } from '../Id/Id.ts'
import * as WebViewStates from '../WebViewStates/WebViewStates.ts'

export const setTime = (time: number): void => {
  const webView = WebViewStates.get(id)
  const newWebView: WebView = {
    ...webView,
    time,
  }
  WebViewStates.set(id, newWebView)
}
