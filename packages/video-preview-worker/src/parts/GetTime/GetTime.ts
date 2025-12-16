import * as WebViewStates from '../WebViewStates/WebViewStates.ts'

export const getTime = (id: number): number => {
  const state = WebViewStates.get(id)
  const {time} = state
  return time
}
