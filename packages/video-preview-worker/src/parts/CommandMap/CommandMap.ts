import * as Create from '../Create/Create.ts'
import * as GetUrl from '../GetUrl/GetUrl.ts'
import * as SaveState from '../SaveState/SaveState.ts'
import * as SetSavedState from '../SetSavedState/SetSavedState.ts'
import * as GetTime from '../GetTime/GetTime.ts'
import * as SetTime from '../SetTime/SetTime.ts'

export const commandMap = {
  'VideoPreview.create': Create.create,
  'VideoPreview.getTime': GetTime.getTime,
  'VideoPreview.getUrl': GetUrl.getUrl,
  'VideoPreview.saveState': SaveState.saveState,
  'VideoPreview.setSavedState': SetSavedState.setSavedState,
  'VideoPreview.setTime': SetTime.setTime,
}
