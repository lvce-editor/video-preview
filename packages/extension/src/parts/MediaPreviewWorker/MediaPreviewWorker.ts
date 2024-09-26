import * as GetOrCreateWorker from '../GetOrCreateWorker/GetOrCreateWorker.ts'
import * as LaunchvideoPreviewWorker from '../LaunchvideoPreviewWorker/LaunchvideoPreviewWorker.ts'

const { invoke } = GetOrCreateWorker.getOrCreateWorker(LaunchvideoPreviewWorker.launchvideoPreviewWorker)

export { invoke }
