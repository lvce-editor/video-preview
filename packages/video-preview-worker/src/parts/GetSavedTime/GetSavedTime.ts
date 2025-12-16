export const getSavedTime = (savedState) => {
  if (savedState && savedState.time && typeof savedState.time === 'number' && !Number.isNaN(savedState.time)) {
    return savedState.time
  }
  return 0
}
