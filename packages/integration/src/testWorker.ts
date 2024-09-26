// TODO add integration tests for git worker
// send and receive messages

import { startWorker } from './startWorker.ts'
import * as PolyFill from './polyfill.ts'

export const testWorker = async ({ execMap }) => {
  const invocations = []
  const rpc = {
    invoke(...args) {
      // @ts-ignore
      invocations.push(args)
      if (execMap[args[0]]) {
        return execMap[args[0]](...args.slice(1))
      }
      throw new Error(`unknown command ${args[0]}`)
    },
  }
  for (const [key, value] of Object.entries(PolyFill)) {
    globalThis[key] = value
  }
  const worker = await startWorker(rpc)
  return {
    execute(...args) {
      // @ts-ignore
      return worker.execute(...args)
    },
    invocations,
  }
}
