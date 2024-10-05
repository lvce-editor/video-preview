const rpc = globalThis.rpc

export const getRemoteUrl = async (uri: string) => {
  const url = await rpc.invoke('Host.getRemoteUrl', uri)
  return url
}
