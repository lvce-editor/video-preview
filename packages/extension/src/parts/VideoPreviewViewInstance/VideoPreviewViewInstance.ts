import type { ViewContext, VirtualDomViewInstance } from '@lvce-editor/api'
import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import type { VideoPreviewRenderState } from '../VideoPreviewRenderState/VideoPreviewRenderState.ts'
import { getMediaType } from '../GetMediaType/GetMediaType.ts'
import { getVideoErrorMessage } from '../GetVideoErrorMessage/GetVideoErrorMessage.ts'
import { getVideoUrl } from '../GetVideoUrl/GetVideoUrl.ts'
import { MediaFileNotFoundError } from '../MediaFileNotFoundError/MediaFileNotFoundError.ts'
import { render } from '../RenderVideoPreview/RenderVideoPreview.ts'

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

const getInitialState = async (uri: string, getUrl: GetVideoUrl): Promise<VideoPreviewRenderState> => {
  const mediaType = getMediaType(uri)
  if (!uri) {
    return {
      errorMessage: 'Failed to load video',
      mediaType,
      url: '',
    }
  }
  try {
    return {
      errorMessage: '',
      mediaType,
      url: await getUrl(uri),
    }
  } catch (error) {
    if (!(error instanceof MediaFileNotFoundError)) {
      throw error
    }
    return {
      errorMessage: error.message,
      mediaType,
      url: '',
    }
  }
}

export const createInstanceWithGetVideoUrl = async (
  context: ViewContext | undefined,
  getUrl: GetVideoUrl,
): Promise<VideoPreviewViewInstance> => {
  const uri = getUri(context)
  let videoErrorMessage = ''
  let state = await getInitialState(uri, getUrl)

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
