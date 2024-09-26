import * as Create from '../Create/Create.ts'
import * as GetUrl from '../GetUrl/GetUrl.ts'
import * as HandlePointerDown from '../HandlePointerDown/HandlePointerDown.ts'
import * as HandlePointerMove from '../HandlePointerMove/HandlePointerMove.ts'
import * as HandlePointerUp from '../HandlePointerUp/HandlePointerUp.ts'

export const commandMap = {
  'videoPreview.getUrl': GetUrl.getUrl,
  'videoPreview.handlePointerDown': HandlePointerDown.handlePointerDown,
  'videoPreview.handlePointerUp': HandlePointerUp.handlePointerUp,
  'videoPreview.handlePointerMove': HandlePointerMove.handlePointerMove,
  'videoPreview.create': Create.create,
}
