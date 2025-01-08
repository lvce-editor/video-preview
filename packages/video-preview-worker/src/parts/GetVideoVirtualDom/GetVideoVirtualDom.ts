import * as VirtualDomElements from '../VirtualDomElements/VirtualDomElements.ts'

export const getVideoVirtualDom = (src: string, time: number) => {
  return [
    {
      type: VirtualDomElements.Div,
      className: 'App',
      childCount: 1,
    },
    {
      type: VirtualDomElements.Div,
      className: 'VideoContent',
      childCount: 1,
    },
    {
      type: VirtualDomElements.Video,
      className: 'VideoElement',
      src,
      controls: true,
      currentTime: time,
      onTimeUpdate: 'handleTimeUpdate',
      onError: 'handleError',
      onLoadedData: 'handleLoadedData',
    },
  ]
}
