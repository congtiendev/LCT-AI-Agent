// composables/useConstants.ts
import { FILE_ICONS } from '~/constants/global'

export const useConstants = () => {
  const getFileIcon = (filename: string) => {
    const ext = filename.split('.').pop()?.toLowerCase()
    return FILE_ICONS[ext as keyof typeof FILE_ICONS] || FILE_ICONS.default
  }
  return { FILE_ICONS, getFileIcon }
}
