// composables/useClickOutside.ts
import type { Ref } from 'vue'

export interface ClickOutsideOptions {
  ignore?: Ref<HTMLElement | null>[]
  capture?: boolean
}

export const useClickOutside = () => {
  const handleClickOutside = (
    containers: Ref<HTMLElement | null>[],
    callbacks: (() => void)[],
    options: ClickOutsideOptions = {}
  ) => {
    return (event: Event): void => {
      const target = event.target as HTMLElement
      if (!target) return

      containers.forEach((container, index) => {
        if (!container.value) return

        // Check if click is inside container
        const isInsideContainer = container.value.contains(target)

        // Check if click is inside ignored elements
        const isInsideIgnored =
          options.ignore?.some((ignoreRef) =>
            ignoreRef.value?.contains(target)
          ) ?? false

        if (!isInsideContainer && !isInsideIgnored && callbacks[index]) {
          callbacks[index]()
        }
      })
    }
  }

  const setupClickOutside = (
    containers: Ref<HTMLElement | null>[],
    callbacks: (() => void)[],
    options: ClickOutsideOptions = {}
  ): (() => void) => {
    if (!process.client) return () => {}

    const handler = handleClickOutside(containers, callbacks, options)

    onMounted(() => {
      document.addEventListener('click', handler, {
        capture: options.capture ?? false,
      })
    })

    onUnmounted(() => {
      document.removeEventListener('click', handler, {
        capture: options.capture ?? false,
      })
    })

    // Return cleanup function for manual cleanup if needed
    return () => {
      document.removeEventListener('click', handler, {
        capture: options.capture ?? false,
      })
    }
  }

  const useClickOutsideElement = (
    elementRef: Ref<HTMLElement | null>,
    callback: () => void,
    options: ClickOutsideOptions = {}
  ): void => {
    setupClickOutside([elementRef], [callback], options)
  }

  return {
    setupClickOutside,
    useClickOutsideElement,
    handleClickOutside,
  }
}
