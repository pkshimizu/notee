type DeviceType = 'Mobile' | 'PC'

export function useDeviceType() {
  const mobile = navigator.userAgent.match(/iPhone|Android.+Mobile/)
  return mobile ? 'Mobile' : 'PC'
}
