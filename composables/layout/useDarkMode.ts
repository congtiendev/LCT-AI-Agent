// composables/layout/useDarkMode.ts
export const useDarkMode = () => {
  const isDarkMode = ref<boolean>(false)

  const toggleDarkMode = (): void => {
    isDarkMode.value = !isDarkMode.value
  }

  const initializeDarkMode = (): void => {
    if (process.client) {
      const savedDarkMode = localStorage.getItem('darkMode')
      if (savedDarkMode) {
        isDarkMode.value = JSON.parse(savedDarkMode)
      } else {
        // Check system preference if no saved preference
        isDarkMode.value = window.matchMedia(
          '(prefers-color-scheme: dark)'
        ).matches
      }

      // Apply dark mode class immediately
      const htmlElement = document.documentElement
      if (isDarkMode.value) {
        htmlElement.classList.add('dark')
      } else {
        htmlElement.classList.remove('dark')
      }
    }
  }

  const setDarkMode = (value: boolean): void => {
    isDarkMode.value = value
  }

  // Watch for dark mode changes
  watch(isDarkMode, (newValue: boolean) => {
    if (process.client) {
      const htmlElement = document.documentElement
      if (newValue) {
        htmlElement.classList.add('dark')
      } else {
        htmlElement.classList.remove('dark')
      }
      localStorage.setItem('darkMode', JSON.stringify(newValue))
    }
  })

  return {
    isDarkMode: readonly(isDarkMode),
    toggleDarkMode,
    initializeDarkMode,
    setDarkMode,
  }
}
