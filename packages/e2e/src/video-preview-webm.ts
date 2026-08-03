const remotePrefix = '/remote'
const videoUri = new URL('../../sample-files/files/big_buck_bunny.webm', import.meta.url).pathname.slice(remotePrefix.length)
const fileUri = `file://${videoUri}`

export const name = 'video-preview-webm'

export const test = async ({ expect, Locator, Main }) => {
  // act
  await Main.openUri(fileUri)

  // assert
  const video = Locator('.VideoElement')
  await expect(video).toBeVisible()
  await expect(video).toHaveAttribute('src', `${remotePrefix}${videoUri}`)
}
