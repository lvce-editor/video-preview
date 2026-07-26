const MediaErrorSrcNotSupported = 4

export const getVideoErrorMessage = (code: unknown, message: unknown): string => {
  const detail = typeof message === 'string' && message ? `: ${message}` : ''
  if (code === MediaErrorSrcNotSupported) {
    return `Failed to decode video${detail}`
  }
  return `Failed to load video${detail}`
}
