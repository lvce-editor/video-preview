import * as GetOrCreateWorker from '../GetOrCreateWorker/GetOrCreateWorker.ts'
import * as LaunchVideoPreviewWorker from '../LaunchVideoPreviewWorker/LaunchVideoPreviewWorker.ts'

const { invoke } = GetOrCreateWorker.getOrCreateWorker(LaunchVideoPreviewWorker.launchvideoPreviewWorker)

export { invoke }
