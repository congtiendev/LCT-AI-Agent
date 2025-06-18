export const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('vi-VN')
}

export const generateId = () => {
  return Math.random().toString(36).substr(2, 9)
}

export const validateEmail = (email: string) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}
