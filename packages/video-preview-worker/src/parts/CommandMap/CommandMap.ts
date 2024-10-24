import * as Create from '../Create/Create.ts'
import * as GetUrl from '../GetUrl/GetUrl.ts'
import * as SaveState from '../SaveState/SaveState.ts'
import * as SetTime from '../SetTime/SetTime.ts'

export const commandMap = {
  'VideoPreview.create': Create.create,
  'VideoPreview.getUrl': GetUrl.getUrl,
  'VideoPreview.saveState': SaveState.saveState,
  'VideoPreview.setTime': SetTime.setTime,
}
