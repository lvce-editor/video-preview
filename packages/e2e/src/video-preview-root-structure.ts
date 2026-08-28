const videoUri = import.meta.resolve('../fixtures/big_buck_bunny.mp4')

export const name = 'video-preview-root-structure'

export const test = async ({ expect, Locator, Main }) => {
  // act
  await Main.openUri(videoUri)

  // assert
  const element = Locator('.Viewlet .VideoPreview')
  await expect(element).toHaveCount(1)
}
