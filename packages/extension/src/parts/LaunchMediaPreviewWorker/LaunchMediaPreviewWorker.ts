import * as videoPreviewWorkerUrl from '../videoPreviewWorkerUrl/videoPreviewWorkerUrl.ts'

const execute = (method, ...params) => {
  return {}
}

export const launchvideoPreviewWorker = async () => {
  // @ts-ignore
  const rpc = await vscode.createRpc({
    url: videoPreviewWorkerUrl.videoPreviewWorkerUrl,
    name: 'Media Preview Worker',
    execute,
  })
  return rpc
}
