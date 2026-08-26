export const name = 'video-preview-audio-error-not-found'

export const test = async ({ expect, FileSystem, Locator, Main }) => {
  // arrange
  const tmpDir = await FileSystem.getTmpDir()

  // act
  await Main.openUri(`${tmpDir}/not-found.webm`)

  // assert
  const error = Locator('.Viewlet .VideoPreviewError')
  await expect(error).toBeVisible()
  await expect(error).toHaveText('Audio file not found')
}
