const mediaUri = import.meta.resolve('../fixtures/format-theora-vorbis.ogv')

export const name = 'video-preview-format-ogv-theora-vorbis'

export const test = async ({ expect, Locator, Main }) => {
  await Main.openUri(mediaUri)

  const media = Locator('.VideoElement')
  const error = Locator('.VideoPreviewError')
  await expect(media).toBeVisible()
  await expect(media).toHaveAttribute('src', mediaUri)
  await expect(media).toHaveJSProperty('readyState', 4)
  await expect(media).toHaveJSProperty('error', null)
  await expect(error).toHaveCount(0)
}
