export const getVideoUrl = (uri: string): string => {
  if (uri.startsWith('http://') || uri.startsWith('https://')) {
    return uri
  }
  return uri.startsWith('/') ? `/remote${uri}` : `/remote/${uri}`
}
