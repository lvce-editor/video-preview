export const name = 'video-preview-error-not-found'

export const test = async ({ expect, FileSystem, Locator, Main }) => {
  // arrange
  const tmpDir = await FileSystem.getTmpDir()

  // act
  await Main.openUri(`${tmpDir}/not-found.mp4`)

  // assert
  const error = Locator('.Viewlet .VideoPreviewError')
  await expect(error).toBeVisible()
  await expect(error).toContainText('Failed to decode video')
}
