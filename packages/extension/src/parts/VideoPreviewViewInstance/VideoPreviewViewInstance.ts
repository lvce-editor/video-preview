import type { ViewContext, VirtualDomViewInstance } from '@lvce-editor/api'
import type { VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import type { VideoPreviewRenderState } from '../VideoPreviewRenderState/VideoPreviewRenderState.ts'
import { getMediaType } from '../GetMediaType/GetMediaType.ts'
import { getVideoErrorMessage } from '../GetVideoErrorMessage/GetVideoErrorMessage.ts'
import { getVideoUrl } from '../GetVideoUrl/GetVideoUrl.ts'
import { MediaFileNotFoundError } from '../MediaFileNotFoundError/MediaFileNotFoundError.ts'
import { render } from '../RenderVideoPreview/RenderVideoPreview.ts'

export interface VideoPreviewComponentState extends VideoPreviewRenderState {
  readonly videoErrorMessage: string
}

interface VideoPreviewViewContext extends ViewContext {
  readonly uri?: string
}

interface SavedState {
  readonly uri?: unknown
}

export interface VideoPreviewViewInstance extends VirtualDomViewInstance {
  readonly getComponentState: () => VideoPreviewComponentState
  readonly handleAudioError: (code: unknown, message: unknown) => void
  readonly handleVideoError: (code: unknown, message: unknown) => void
  readonly render: () => readonly VirtualDomNode[]
  readonly saveState: () => unknown
  readonly setComponentState: (state: VideoPreviewComponentState) => void
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
  let state: VideoPreviewComponentState = { ...(await getInitialState(uri, getUrl)), videoErrorMessage: '' }

  return {
    getComponentState(): VideoPreviewComponentState {
      return state
    },
    handleAudioError(code: unknown, message: unknown): void {
      const { videoErrorMessage } = state
      state = {
        ...state,
        errorMessage: videoErrorMessage || getVideoErrorMessage(code, message),
      }
    },
    handleVideoError(code: unknown, message: unknown): void {
      const errorMessage = getVideoErrorMessage(code, message)
      if (uri.toLowerCase().endsWith('.webm')) {
        state = {
          ...state,
          mediaType: 'audio',
          videoErrorMessage: errorMessage,
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
    setComponentState(newState: VideoPreviewComponentState): void {
      state = newState
    },
  }
}

export const createInstance = (context?: ViewContext): Promise<VideoPreviewViewInstance> => {
  return createInstanceWithGetVideoUrl(context, getVideoUrl)
}
