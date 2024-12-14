import { jest, test, expect } from '@jest/globals'

jest.unstable_mockModule('../src/parts/GetRemoteUrl/GetRemoteUrl.ts', () => ({
  // @ts-ignore
  getRemoteUrl: jest.fn().mockResolvedValue('https://example.com/video.mp4'),
}))

const { getUrl } = await import('../src/parts/GetUrl/GetUrl.ts')
const GetRemoteUrl = await import('../src/parts/GetRemoteUrl/GetRemoteUrl.ts')

test('getUrl - should return remote url', async () => {
  const uri = 'video.mp4'
  const result = await getUrl(uri)
  expect(GetRemoteUrl.getRemoteUrl).toHaveBeenCalledWith(uri)
  expect(result).toBe('https://example.com/video.mp4')
})
