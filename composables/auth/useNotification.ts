// composables/useNotification.ts
import Swal from 'sweetalert2'

export const useNotification = () => {
  // Success notification
  const showSuccess = (message: string) => {
    return Swal.fire({
      title: 'Thành công!',
      text: message,
      icon: 'success',
      confirmButtonText: 'OK',
      confirmButtonColor: '#10B981',
      timer: 3000,
      timerProgressBar: true,
    })
  }

  // Error notification
  const showError = (message: string) => {
    return Swal.fire({
      title: 'Lỗi!',
      text: message,
      icon: 'error',
      confirmButtonText: 'OK',
      confirmButtonColor: '#EF4444',
    })
  }

  // Warning notification
  const showWarning = (message: string) => {
    return Swal.fire({
      title: 'Cảnh báo!',
      text: message,
      icon: 'warning',
      confirmButtonText: 'OK',
      confirmButtonColor: '#F59E0B',
    })
  }

  // Info notification
  const showInfo = (message: string) => {
    return Swal.fire({
      title: 'Thông báo!',
      text: message,
      icon: 'info',
      confirmButtonText: 'OK',
      confirmButtonColor: '#3B82F6',
    })
  }

  // Confirmation dialog
  const showConfirm = (title: string, message: string) => {
    return Swal.fire({
      title,
      text: message,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Xác nhận',
      cancelButtonText: 'Hủy',
      confirmButtonColor: '#10B981',
      cancelButtonColor: '#6B7280',
    })
  }

  // Delete confirmation
  const showDeleteConfirm = (itemName: string = 'mục này') => {
    return Swal.fire({
      title: 'Xác nhận xóa',
      html: `Bạn có chắc chắn muốn xóa <strong>${itemName}</strong>?<br><small style="color: #6B7280;">Hành động này không thể hoàn tác!</small>`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Xóa',
      cancelButtonText: 'Hủy',
      confirmButtonColor: '#EF4444',
      cancelButtonColor: '#6B7280',
    })
  }

  // Loading notification
  const showLoading = (message: string = 'Đang xử lý...') => {
    Swal.fire({
      title: message,
      allowOutsideClick: false,
      allowEscapeKey: false,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading()
      },
    })
  }

  // Toast notification
  const showToast = (
    message: string,
    type: 'success' | 'error' | 'warning' | 'info' = 'success'
  ) => {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      },
    })

    return Toast.fire({
      icon: type,
      title: message,
    })
  }

  // Simple notification (replaces alert)
  const showNotification = (
    message: string,
    type: 'success' | 'error' | 'warning' | 'info' = 'success'
  ) => {
    switch (type) {
      case 'success':
        return showSuccess(message)
      case 'error':
        return showError(message)
      case 'warning':
        return showWarning(message)
      case 'info':
        return showInfo(message)
      default:
        return showSuccess(message)
    }
  }

  // Close any open notification
  const closeNotification = () => {
    Swal.close()
  }

  return {
    // Basic notifications
    showSuccess,
    showError,
    showWarning,
    showInfo,

    // Dialogs
    showConfirm,
    showDeleteConfirm,
    showLoading,
    showToast,

    // Utility
    showNotification,
    closeNotification,

    // Direct access to Swal
    swal: Swal,
  }
}
