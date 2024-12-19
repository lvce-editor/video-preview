import * as Rpc from '../Rpc/Rpc.ts'


export const getRemoteUrl = async (uri: string) => {
  const url = await Rpc.invoke('Host.getRemoteUrl', uri)
  return url
}
