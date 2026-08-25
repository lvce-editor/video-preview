import type { View } from '@lvce-editor/api'
import { createInstance, type VideoPreviewViewInstance } from '../VideoPreviewViewInstance/VideoPreviewViewInstance.ts'

const viewId = 'builtin.video-preview'

export const view: View<VideoPreviewViewInstance> = {
  create: createInstance,
  eventListeners: [
    {
      name: 'handleAudioError',
      params: ['handleAudioError', 'event.target.error.code', 'event.target.error.message'],
    },
    {
      name: 'handleVideoError',
      params: ['handleVideoError', 'event.target.error.code', 'event.target.error.message'],
    },
  ],
  id: viewId,
  kind: 'virtualDom',
  title: 'Video Preview',
}
