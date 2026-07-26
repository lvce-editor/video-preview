export const name = 'video-preview'

const remotePrefix = '/remote'
const videoUri = new URL('../../sample-files/files/big_buck_bunny.mp4', import.meta.url).pathname.slice(remotePrefix.length)

export const test = async ({ expect, Locator, Main }) => {
  // act
  await Main.openUri(videoUri)

  // assert
  const video = Locator('.VideoElement')
  await expect(video).toBeVisible()
  await expect(video).toHaveAttribute('src', `${remotePrefix}${videoUri}`)
}
