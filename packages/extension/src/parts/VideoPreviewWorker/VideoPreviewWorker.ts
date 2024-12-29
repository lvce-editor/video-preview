import * as Command from '../Command/Command.ts'

// @ts-ignore
const rpc = vscode.createRpc({
  id: 'builtin.video-preview.video-preview-worker',
  execute: Command.execute,
  commandMap: Command.commandMap,
})

export const invoke = (method, ...params) => {
  return rpc.invoke(method, ...params)
}
