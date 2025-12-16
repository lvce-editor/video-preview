export const name = 'video-preview-error-empty'

export const test = async ({ expect, FileSystem, Locator, Main }) => {
  // arrange
  const tmpDir = await FileSystem.getTmpDir()
  await FileSystem.writeFile(`${tmpDir}/test.mp4`, ``)

  // act
  await Main.openUri(`${tmpDir}/test.mp4`)

  // assert
  const error = Locator('.Viewlet.Error')
  await expect(error).toBeVisible()
  // TODO make it less browser specific
  await expect(error).toHaveText('Error: Failed to decode video: MEDIA_ELEMENT_ERROR: Format error')
}
