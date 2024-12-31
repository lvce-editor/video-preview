import * as Create from '../Create/Create.ts'
import * as SetTime from '../SetTime/SetTime.ts'
import * as SaveState from '../SaveState/SaveState.ts'

export const commandMap = {
  'WebView.create': Create.create,
  handleTimeUpdate: SetTime.setTime,
  'WebView.saveState': SaveState.saveState,
}
