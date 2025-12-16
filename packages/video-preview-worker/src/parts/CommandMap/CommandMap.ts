import * as Create from '../Create/Create.ts'
import * as SaveState from '../SaveState/SaveState.ts'
import * as SetTime from '../SetTime/SetTime.ts'

export const commandMap = {
  handleTimeUpdate: SetTime.setTime,
  'WebView.create': Create.create,
  'WebView.saveState': SaveState.saveState,
}
