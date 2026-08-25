export const name = 'video-preview-error'

export const test = async ({ expect, FileSystem, Locator, Main }) => {
  // arrange
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/test.mp4`, `abc`)

  // act
  await Main.openUri(`${tmpDir}/test.mp4`)

  // assert
  const error = Locator('.Viewlet .VideoPreviewError')
  await expect(error).toBeVisible()
  await expect(error).toContainText('Failed to decode video')
  await expect(error).toHaveCSS('-webkit-user-select', 'text')
}
