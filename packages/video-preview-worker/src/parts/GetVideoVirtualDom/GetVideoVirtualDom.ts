import * as VirtualDomElements from '../VirtualDomElements/VirtualDomElements.ts'

export const getVideoVirtualDom = (src: string, time: number) => {
  return [
    {
      childCount: 1,
      className: 'App',
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      className: 'VideoContent',
      type: VirtualDomElements.Div,
    },
    {
      className: 'VideoElement',
      controls: true,
      currentTime: time,
      onError: 'handleError',
      onLoadedData: 'handleLoadedData',
      onTimeUpdate: 'handleTimeUpdate',
      src,
      type: VirtualDomElements.Video,
    },
  ]
}
