import * as Create from '../Create/Create.ts'
import * as SetTime from '../SetTime/SetTime.ts'

export const commandMap = {
  'WebView.create': Create.create,
  handleTimeUpdate: SetTime.setTime,
}
