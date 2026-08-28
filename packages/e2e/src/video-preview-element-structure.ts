const videoUri = import.meta.resolve('../fixtures/big_buck_bunny.mp4')

export const name = 'video-preview-element-structure'

export const test = async ({ expect, Locator, Main }) => {
  // act
  await Main.openUri(videoUri)

  // assert
  const element = Locator('.VideoContent > video.VideoElement')
  await expect(element).toHaveCount(1)
}
