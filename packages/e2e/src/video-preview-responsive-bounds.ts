const videoUri = import.meta.resolve('../fixtures/big_buck_bunny.mp4')

export const name = 'video-preview-responsive-bounds'

export const test = async ({ expect, Locator, Main }) => {
  // act
  await Main.openUri(videoUri)

  // assert
  const video = Locator('.VideoElement')
  await expect(video).toHaveCSS('max-width', '100%')
  await expect(video).toHaveCSS('max-height', '100%')
}
