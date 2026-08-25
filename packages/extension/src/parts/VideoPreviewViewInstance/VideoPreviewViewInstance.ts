import type { ViewContext, VirtualDomViewInstance } from '@lvce-editor/api'
import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import { getVideoErrorMessage } from '../GetVideoErrorMessage/GetVideoErrorMessage.ts'
import { getVideoUrl } from '../GetVideoUrl/GetVideoUrl.ts'
import { render, type VideoPreviewRenderState } from '../RenderVideoPreview/RenderVideoPreview.ts'

interface VideoPreviewViewContext extends ViewContext {
  readonly uri?: string
}

interface SavedState {
  readonly uri?: unknown
}

export interface VideoPreviewViewInstance extends VirtualDomViewInstance {
  readonly handleAudioError: (code: unknown, message: unknown) => void
  readonly handleVideoError: (code: unknown, message: unknown) => void
  readonly render: () => readonly VirtualDomNode[]
  readonly saveState: () => unknown
}

const getSavedState = (context: ViewContext | undefined): SavedState | undefined => {
  if (!context?.state || typeof context.state !== 'object') {
    return undefined
  }
  return context.state
}

const getUri = (context: VideoPreviewViewContext | undefined): string => {
  if (typeof context?.uri === 'string') {
    return context.uri
  }
  const savedState = getSavedState(context)
  return typeof savedState?.uri === 'string' ? savedState.uri : ''
}

type GetVideoUrl = (uri: string) => Promise<string>

export const createInstanceWithGetVideoUrl = async (
  context: ViewContext | undefined,
  getUrl: GetVideoUrl,
): Promise<VideoPreviewViewInstance> => {
  const uri = getUri(context)
  let videoErrorMessage = ''
  let state: VideoPreviewRenderState = {
    errorMessage: uri ? '' : 'Failed to load video',
    mediaType: 'video',
    url: uri ? await getUrl(uri) : '',
  }

  return {
    handleAudioError(code: unknown, message: unknown): void {
      state = {
        ...state,
        errorMessage: videoErrorMessage || getVideoErrorMessage(code, message),
      }
    },
    handleVideoError(code: unknown, message: unknown): void {
      const errorMessage = getVideoErrorMessage(code, message)
      if (uri.toLowerCase().endsWith('.webm')) {
        videoErrorMessage = errorMessage
        state = {
          ...state,
          mediaType: 'audio',
        }
        return
      }
      state = {
        ...state,
        errorMessage,
      }
    },
    render(): readonly VirtualDomNode[] {
      return render(state)
    },
    saveState(): unknown {
      return {
        uri,
      }
    },
  }
}

export const createInstance = (context?: ViewContext): Promise<VideoPreviewViewInstance> => {
  return createInstanceWithGetVideoUrl(context, getVideoUrl)
}
