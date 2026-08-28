const videoUri = import.meta.resolve('../fixtures/big_buck_bunny.mp4')

export const name = 'video-preview-root-box-sizing'

export const test = async ({ expect, Locator, Main }) => {
  // act
  await Main.openUri(videoUri)

  // assert
  const element = Locator('.VideoPreview')
  await expect(element).toHaveCSS('box-sizing', 'border-box')
}
