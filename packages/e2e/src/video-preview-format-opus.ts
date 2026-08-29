const mediaUri = import.meta.resolve('../fixtures/format-opus.opus')

export const name = 'video-preview-format-opus'

export const test = async ({ expect, Locator, Main }) => {
  await Main.openUri(mediaUri)

  const media = Locator('.AudioElement')
  const error = Locator('.VideoPreviewError')
  await expect(media).toBeVisible()
  await expect(media).toHaveAttribute('src', mediaUri)
  await expect(media).toHaveJSProperty('readyState', 4)
  await expect(media).toHaveJSProperty('error', null)
  await expect(error).toHaveCount(0)
}
