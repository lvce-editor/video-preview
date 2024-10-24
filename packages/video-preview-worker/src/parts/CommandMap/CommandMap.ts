import * as Create from '../Create/Create.ts'
import * as GetUrl from '../GetUrl/GetUrl.ts'
import * as SetTime from '../SetTime/SetTime.ts'

export const commandMap = {
  'VideoPreview.create': Create.create,
  'VideoPreview.getUrl': GetUrl.getUrl,
  'VideoPreview.setTime': SetTime.setTime,
}
