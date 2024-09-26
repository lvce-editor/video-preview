import * as VideoPreviewWorkerUrl from '../VideoPreviewWorkerUrl/VideoPreviewWorkerUrl.ts'

const execute = (method, ...params) => {
  return {}
}

export const launchvideoPreviewWorker = async () => {
  // @ts-ignore
  const rpc = await vscode.createRpc({
    url: VideoPreviewWorkerUrl.videoPreviewWorkerUrl,
    name: 'Media Preview Worker',
    execute,
  })
  return rpc
}
