export const name = 'video-preview-error'

export const test = async ({ FileSystem, Main }) => {
  // arrange
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/test.mp4`, `abc`)

  // act
  await Main.openUri(`${tmpDir}/test.mp4`)

  // assert
  // TODO verify an error message is displayed
}
