const mediaUri = import.meta.resolve('../fixtures/format-opus.opus')

export const name = 'video-preview-format-opus'

export const test = async ({ expect, Locator, Main, VideoPreview }) => {
  await Main.openUri(mediaUri)

  const media = Locator('.AudioElement')
  const error = Locator('.VideoPreviewError')
  await expect(media).toBeVisible()
  await expect(media).toHaveAttribute('src', mediaUri)
  await VideoPreview.waitForMediaPreviewReady(media)
  await expect(media).toHaveJSProperty('error', null)
  await expect(error).toHaveCount(0)
}
