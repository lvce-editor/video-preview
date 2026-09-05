import type { InstanceView } from '@lvce-editor/api'
import type { VideoPreviewComponentState } from '../VideoPreviewViewInstance/VideoPreviewViewInstance.ts'
import { createInstance, type VideoPreviewViewInstance } from '../VideoPreviewViewInstance/VideoPreviewViewInstance.ts'

const viewId = 'builtin.video-preview'

export const view: InstanceView<VideoPreviewViewInstance, VideoPreviewComponentState> = {
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
  getComponentState: (instance) => instance.getComponentState(),
  id: viewId,
  kind: 'virtualDom',
  setComponentState: (instance, state) => instance.setComponentState(state),
  title: 'Video Preview',
}
