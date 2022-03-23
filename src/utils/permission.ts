import { Platform } from 'react-native'
import {
  checkMultiple,
  openSettings,
  PERMISSIONS,
  request,
} from 'react-native-permissions'

type PermissionResult =
  | 'unavailable'
  | 'blocked'
  | 'denied'
  | 'granted'
  | 'limited'

export const requestPermission = async (): Promise<PermissionResult> => {
  const permissions =
    Platform.OS === 'ios' ? PERMISSIONS.IOS : PERMISSIONS.ANDROID

  return request(permissions.CAMERA)
}

export const requestPermissionBLE = async (): Promise<PermissionResult> => {
  if (Platform.OS === 'android') {
    return request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
  } else {
    return 'granted'
  }
}

export const openPermissionSettings = (): void => {
  openSettings().catch(() => {
    // error handling
  })
}

export const checkCameraPermission = async (): Promise<PermissionResult> => {
  const permissions =
    Platform.OS === 'ios' ? PERMISSIONS.IOS : PERMISSIONS.ANDROID

  const statuses = await checkMultiple([permissions.CAMERA])
  return statuses[permissions.CAMERA]
}

export const checkFaceIdPermission = async (): Promise<PermissionResult> => {
  if (Platform.OS !== 'ios') {
    return 'granted'
  }
  const statuses = await checkMultiple([PERMISSIONS.IOS.FACE_ID])
  return statuses[PERMISSIONS.IOS.FACE_ID]
}
