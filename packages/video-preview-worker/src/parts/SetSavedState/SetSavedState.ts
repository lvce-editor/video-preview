import { WebView } from '../WebView/WebView.ts'
import * as WebViewStates from '../WebViewStates/WebViewStates.ts'

const getSavedTime = (savedState) => {
  if (savedState && savedState.time && typeof savedState.time === 'number' && !isNaN(savedState.time)) {
    return savedState.time
  }
  return 0
}

export const setSavedState = (id: number, savedState: any): void => {
  const webView = WebViewStates.get(id)
  const time = getSavedTime(savedState)
  const newWebView: WebView = {
    ...webView,
    time,
  }
  WebViewStates.set(id, newWebView)
}
