import type { WebView } from '../WebView/WebView.ts'
import * as GetSavedTime from '../GetSavedTime/GetSavedTime.ts'
import * as WebViewStates from '../WebViewStates/WebViewStates.ts'


export const setSavedState = (id: number, savedState: any): void => {
  const webView = WebViewStates.get(id)
  const time = GetSavedTime.getSavedTime(savedState)
  const newWebView: WebView = {
    ...webView,
    time,
  }
  WebViewStates.set(id, newWebView)
}
