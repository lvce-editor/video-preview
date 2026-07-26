import type { View } from '@lvce-editor/api'
import { createInstance, type VideoPreviewViewInstance } from '../VideoPreviewViewInstance/VideoPreviewViewInstance.ts'

export const viewId = 'builtin.video-preview'

export const view: View<VideoPreviewViewInstance> = {
  create: createInstance,
  eventListeners: [
    {
      name: 'handleVideoError',
      params: ['handleVideoError', 'event.target.error.code', 'event.target.error.message'],
    },
  ],
  id: viewId,
  kind: 'virtualDom',
  title: 'Video Preview',
}
