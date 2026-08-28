const audioUri = import.meta.resolve('../fixtures/big_buck_bunny-audio-only.webm')

export const name = 'video-preview-audio-only-webm'

export const test = async ({ expect, Locator, Main }) => {
  // act
  await Main.openUri(audioUri)

  // assert
  const media = Locator('.AudioElement, .VideoElement')
  const error = Locator('.VideoPreviewError')
  await expect(media).toBeVisible()
  await expect(media).toHaveAttribute('src', audioUri)
  await expect(media).toHaveJSProperty('error', null)
  await expect(error).toHaveCount(0)
}
