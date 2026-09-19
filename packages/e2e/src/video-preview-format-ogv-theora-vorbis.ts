const mediaUri = import.meta.resolve('../fixtures/format-theora-vorbis.ogv')

export const name = 'video-preview-format-ogv-theora-vorbis'

export const test = async ({ expect, Locator, Main, VideoPreview }) => {
  await Main.openUri(mediaUri)

  const media = Locator('.VideoElement')
  const error = Locator('.VideoPreviewError')
  await expect(media).toBeVisible()
  await expect(media).toHaveAttribute('src', mediaUri)
  await VideoPreview.waitForMediaPreviewReady(media)
  await expect(media).toHaveJSProperty('error', null)
  await expect(error).toHaveCount(0)
}
