const isDecodingError = (event): boolean => {
  return event.code === 4
}

export const getMessage = (event): string => {
  if (isDecodingError(event)) {
    return `Failed to decode video: ${event.message}`
  }
  return `Failed to load video: ${event.message}`
}
