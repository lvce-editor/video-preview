export const name = 'video-preview-error-not-found'

export const test = async ({ FileSystem, Main }) => {
  // arrange
  const tmpDir = await FileSystem.getTmpDir()

  // act
  await Main.openUri(`${tmpDir}/not-found.mp4`)

  // assert
  // TODO verify an error message is displayed
}
