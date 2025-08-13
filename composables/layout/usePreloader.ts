// composables/usePreloader.ts
export interface PreloaderOptions {
  defaultDelay?: number
  minDisplayTime?: number
  autoHide?: boolean
}

export interface PreloaderState {
  isLoaded: Ref<boolean>
  isVisible: Ref<boolean>
  hidePreloader: (delay?: number) => Promise<void>
  showPreloader: () => void
  setLoaded: (loaded: boolean) => void
}

export const usePreloader = (
  options: PreloaderOptions = {}
): PreloaderState => {
  const { defaultDelay = 500, minDisplayTime = 300, autoHide = true } = options

  const isLoaded = ref<boolean>(true)
  const isVisible = ref<boolean>(true)
  const startTime = ref<number>(Date.now())

  const hidePreloader = async (delay: number = defaultDelay): Promise<void> => {
    const elapsed = Date.now() - startTime.value
    const remainingTime = Math.max(minDisplayTime - elapsed, 0)
    const totalDelay = Math.max(delay, remainingTime)

    return new Promise<void>((resolve) => {
      setTimeout(() => {
        isLoaded.value = false
        isVisible.value = false
        resolve()
      }, totalDelay)
    })
  }

  const showPreloader = (): void => {
    isLoaded.value = true
    isVisible.value = true
    startTime.value = Date.now()
  }

  const setLoaded = (loaded: boolean): void => {
    isLoaded.value = loaded
    if (!loaded) {
      isVisible.value = false
    }
  }

  // Auto hide preloader on route changes
  if (autoHide) {
    const router = useRouter()

    router.beforeEach(() => {
      showPreloader()
    })

    router.afterEach(() => {
      nextTick(() => {
        hidePreloader()
      })
    })
  }

  // Auto hide on mounted if not already hidden
  onMounted(() => {
    if (autoHide && isLoaded.value) {
      hidePreloader()
    }
  })

  return {
    isLoaded: readonly(isLoaded),
    isVisible: readonly(isVisible),
    hidePreloader,
    showPreloader,
    setLoaded,
  }
}
