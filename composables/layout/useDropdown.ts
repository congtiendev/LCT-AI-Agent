// composables/useDropdown.ts
export interface DropdownState {
  isOpen: Readonly<Ref<boolean>>
  toggle: () => void
  open: () => void
  close: () => void
  setOpen: (value: boolean) => void
}

export interface DropdownOptions {
  initialState?: boolean
  closeOnEscape?: boolean
  closeOnClickOutside?: boolean
  preventBodyScroll?: boolean
}

export const useDropdown = () => {
  const createDropdown = (options: DropdownOptions = {}): DropdownState => {
    const {
      initialState = false,
      closeOnEscape = true,
      closeOnClickOutside = true,
      preventBodyScroll = false,
    } = options

    const isOpen = ref<boolean>(initialState)

    const toggle = (): void => {
      isOpen.value = !isOpen.value
    }

    const open = (): void => {
      isOpen.value = true
    }

    const close = (): void => {
      isOpen.value = false
    }

    const setOpen = (value: boolean): void => {
      isOpen.value = value
    }

    // Handle escape key
    const handleEscape = (event: KeyboardEvent): void => {
      if (event.key === 'Escape' && isOpen.value) {
        close()
      }
    }

    // Handle body scroll prevention
    watch(isOpen, (newValue: boolean) => {
      if (preventBodyScroll && process.client) {
        if (newValue) {
          document.body.style.overflow = 'hidden'
        } else {
          document.body.style.overflow = ''
        }
      }
    })

    // Setup event listeners
    onMounted(() => {
      if (closeOnEscape && process.client) {
        document.addEventListener('keydown', handleEscape)
      }
    })

    onUnmounted(() => {
      if (closeOnEscape && process.client) {
        document.removeEventListener('keydown', handleEscape)
      }

      // Cleanup body scroll
      if (preventBodyScroll && process.client) {
        document.body.style.overflow = ''
      }
    })

    return {
      isOpen: readonly(isOpen),
      toggle,
      open,
      close,
      setOpen,
    }
  }

  const createMultipleDropdowns = (
    count: number,
    options: DropdownOptions = {}
  ): DropdownState[] => {
    return Array.from({ length: count }, () => createDropdown(options))
  }

  return {
    createDropdown,
    createMultipleDropdowns,
  }
}
