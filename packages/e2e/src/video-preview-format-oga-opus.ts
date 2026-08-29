const mediaUri = import.meta.resolve('../fixtures/format-opus.oga')

const wait = (milliseconds: number): Promise<void> => {
  return new Promise((resolve) => globalThis.setTimeout(resolve, milliseconds))
}

const waitForMediaReady = async (expect, media): Promise<void> => {
  let lastError: unknown
  for (let attempt = 0; attempt < 50; attempt++) {
    try {
      await expect(media).toHaveJSProperty('readyState', 4)
      return
    } catch (error) {
      lastError = error
      await wait(100)
    }
  }
  throw lastError
}

export const name = 'video-preview-format-oga-opus'

export const test = async ({ expect, Locator, Main }) => {
  await Main.openUri(mediaUri)

  const media = Locator('.AudioElement')
  const error = Locator('.VideoPreviewError')
  await expect(media).toBeVisible()
  await expect(media).toHaveAttribute('src', mediaUri)
  await waitForMediaReady(expect, media)
  await expect(media).toHaveJSProperty('error', null)
  await expect(error).toHaveCount(0)
}
