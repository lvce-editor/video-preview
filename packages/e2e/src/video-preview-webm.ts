const videoUri = import.meta.resolve('../fixtures/big_buck_bunny.webm')

export const name = 'video-preview-webm'

export const test = async ({ expect, Locator, Main }) => {
  // act
  await Main.openUri(videoUri)

  // assert
  const video = Locator('.VideoElement')
  await expect(video).toBeVisible()
  await expect(video).toHaveAttribute('src', videoUri)
}
