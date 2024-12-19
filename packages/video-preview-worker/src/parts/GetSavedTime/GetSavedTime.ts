
export const getSavedTime = (savedState) => {
  if (savedState && savedState.time && typeof savedState.time === 'number' && !isNaN(savedState.time)) {
    return savedState.time
  }
  return 0
}