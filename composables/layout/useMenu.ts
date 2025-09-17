// composables/useMenu.ts
export interface MenuItem {
  id: string
  label: string
  icon: string
  type: 'link' | 'dropdown'
  route?: string
  children?: MenuItem[]
  badge?: {
    text: string
    color: 'blue' | 'green' | 'orange' | 'red' | 'gray'
  }
  permission?: string | string[] | boolean
}

export interface MenuGroup {
  id: string
  title: string
  icon?: string
  items: MenuItem[]
  permission?: string | string[] | boolean
}

export interface MenuState {
  // Data
  menuGroups: MenuGroup[]
  filteredMenuGroups: ComputedRef<MenuGroup[]>

  // State
  selectedMenu: Ref<string>
  sidebarOpen: Ref<boolean>
  mobileMenuOpen: Ref<boolean>
  userPermissions: Ref<string[]>

  // Actions
  openMenu: (menuId: string) => void
  closeMenu: () => void
  toggleMenu: (menuId: string) => void
  toggleSidebar: () => void
  toggleMobileMenu: () => void
  closeAll: () => void
  setUserPermissions: (permissions: string[]) => void

  // Getters - NEW: Separated functions
  isMenuOpen: (menuId: string) => boolean
  isParentDropdownActive: (menuId: string) => boolean
  isChildMenuActive: (menuId: string) => boolean
  isLinkMenuActive: (menuId: string) => boolean
  isMenuActive: (menuId: string) => boolean // Deprecated but kept for compatibility
  hasPermission: (permission: string | string[] | boolean) => boolean
  getIcon: (iconName: string) => string
}

export const useMenu = (): MenuState => {
  // ===== Menu Configuration =====
  const menuGroups: MenuGroup[] = [
    {
      id: 'main',
      title: 'MENU',
      icon: 'dots',
      permission: true,
      items: [
        {
          id: 'dashboard',
          label: 'Dashboard',
          icon: 'dashboard',
          route: '/',
          type: 'link',
          permission: 'dashboard.view',
        },
        {
          id: 'ai-agent-management',
          label: 'AI Agent',
          icon: 'bot',
          type: 'dropdown',
          permission: true,
          children: [
            {
              id: 'ai-agent-index',
              label: 'Agent Management',
              icon: '',
              type: 'link',
              route: '/ai-agent',
              permission: true,
            },
            {
              id: 'ai-agent-create',
              label: 'Create Agent',
              icon: '',
              type: 'link',
              route: '/ai-agent/create',
              permission: true,
            },
          ],
        },
        {
          id: 'document-management',
          label: 'Documents',
          icon: 'docs',
          type: 'dropdown',
          permission: true,
          children: [
            {
              id: 'document-index',
              label: 'Document Management',
              icon: '',
              type: 'link',
              route: '/documents',
              permission: true,
            },
          ],
        },
        {
          id: 'profile',
          label: 'Profile',
          icon: 'user',
          type: 'link',
          route: '/profile',
          permission: true,
        },
      ],
    },
    {
      id: 'support',
      title: 'SUPPORT',
      permission: true,
      items: [
        {
          id: 'chat',
          label: 'Chat',
          icon: 'chat',
          type: 'link',
          route: '/chat',
          permission: 'chat.access',
        },
      ],
    },
  ]

  // ===== Icons Map =====
  const iconComponents: Record<string, string> = {
    dots: `<path fill-rule="evenodd" clip-rule="evenodd" d="M5.99915 10.2451C6.96564 10.2451 7.74915 11.0286 7.74915 11.9951V12.0051C7.74915 12.9716 6.96564 13.7551 5.99915 13.7551C5.03265 13.7551 4.24915 12.9716 4.24915 12.0051V11.9951C4.24915 11.0286 5.03265 10.2451 5.99915 10.2451ZM17.9991 10.2451C18.9656 10.2451 19.7491 11.0286 19.7491 11.9951V12.0051C19.7491 12.9716 18.9656 13.7551 17.9991 13.7551C17.0326 13.7551 16.2491 12.9716 16.2491 12.0051V11.9951C16.2491 11.0286 17.0326 10.2451 17.9991 10.2451ZM13.7491 11.9951C13.7491 11.0286 12.9656 10.2451 11.9991 10.2451C11.0326 10.2451 10.2491 11.0286 10.2491 11.9951V12.0051C10.2491 12.9716 11.0326 13.7551 11.9991 13.7551C12.9656 13.7551 13.7491 12.9716 13.7491 12.0051V11.9951Z" fill=""/>`,

    dashboard: `<path fill-rule="evenodd" clip-rule="evenodd" d="M5.5 3.25C4.25736 3.25 3.25 4.25736 3.25 5.5V8.99998C3.25 10.2426 4.25736 11.25 5.5 11.25H9C10.2426 11.25 11.25 10.2426 11.25 8.99998V5.5C11.25 4.25736 10.2426 3.25 9 3.25H5.5ZM4.75 5.5C4.75 5.08579 5.08579 4.75 5.5 4.75H9C9.41421 4.75 9.75 5.08579 9.75 5.5V8.99998C9.75 9.41419 9.41421 9.74998 9 9.74998H5.5C5.08579 9.74998 4.75 9.41419 4.75 8.99998V5.5ZM5.5 12.75C4.25736 12.75 3.25 13.7574 3.25 15V18.5C3.25 19.7426 4.25736 20.75 5.5 20.75H9C10.2426 20.75 11.25 19.7427 11.25 18.5V15C11.25 13.7574 10.2426 12.75 9 12.75H5.5ZM4.75 15C4.75 14.5858 5.08579 14.25 5.5 14.25H9C9.41421 14.25 9.75 14.5858 9.75 15V18.5C9.75 18.9142 9.41421 19.25 9 19.25H5.5C5.08579 19.25 4.75 18.9142 4.75 18.5V15ZM12.75 5.5C12.75 4.25736 13.7574 3.25 15 3.25H18.5C19.7426 3.25 20.75 4.25736 20.75 5.5V8.99998C20.75 10.2426 19.7426 11.25 18.5 11.25H15C13.7574 11.25 12.75 10.2426 12.75 8.99998V5.5ZM15 4.75C14.5858 4.75 14.25 5.08579 14.25 5.5V8.99998C14.25 9.41419 14.5858 9.74998 15 9.74998H18.5C18.9142 9.74998 19.25 9.41419 19.25 8.99998V5.5C19.25 5.08579 18.9142 4.75 18.5 4.75H15ZM15 12.75C13.7574 12.75 12.75 13.7574 12.75 15V18.5C12.75 19.7426 13.7574 20.75 15 20.75H18.5C19.7426 20.75 20.75 19.7427 20.75 18.5V15C20.75 13.7574 19.7426 12.75 18.5 12.75H15ZM14.25 15C14.25 14.5858 14.5858 14.25 15 14.25H18.5C18.9142 14.25 19.25 14.5858 19.25 15V18.5C19.25 18.9142 18.9142 19.25 18.5 19.25H15C14.5858 19.25 14.25 18.9142 14.25 18.5V15Z" fill=""/>`,

    user: `<path fill-rule="evenodd" clip-rule="evenodd" d="M12 3.5C7.30558 3.5 3.5 7.30558 3.5 12C3.5 14.1526 4.3002 16.1184 5.61936 17.616C6.17279 15.3096 8.24852 13.5955 10.7246 13.5955H13.2746C15.7509 13.5955 17.8268 15.31 18.38 17.6167C19.6996 16.119 20.5 14.153 20.5 12C20.5 7.30558 16.6944 3.5 12 3.5ZM17.0246 18.8566V18.8455C17.0246 16.7744 15.3457 15.0955 13.2746 15.0955H10.7246C8.65354 15.0955 6.97461 16.7744 6.97461 18.8455V18.856C8.38223 19.8895 10.1198 20.5 12 20.5C13.8798 20.5 15.6171 19.8898 17.0246 18.8566ZM2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12ZM11.9991 7.25C10.8847 7.25 9.98126 8.15342 9.98126 9.26784C9.98126 10.3823 10.8847 11.2857 11.9991 11.2857C13.1135 11.2857 14.0169 10.3823 14.0169 9.26784C14.0169 8.15342 13.1135 7.25 11.9991 7.25ZM8.48126 9.26784C8.48126 7.32499 10.0563 5.75 11.9991 5.75C13.9419 5.75 15.5169 7.32499 15.5169 9.26784C15.5169 11.2107 13.9419 12.7857 11.9991 12.7857C10.0563 12.7857 8.48126 11.2107 8.48126 9.26784Z" fill=""/>`,

    chat: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-message-circle-more-icon lucide-message-circle-more"><path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719"/><path d="M8 12h.01"/><path d="M12 12h.01"/><path d="M16 12h.01"/></svg>`,

    bot: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-bot-message-square-icon lucide-bot-message-square"><path d="M12 6V2H8"/><path d="M15 11v2"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="M20 16a2 2 0 0 1-2 2H8.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 4 20.286V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2z"/><path d="M9 11v2"/></svg>`,
    docs: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-file-text-icon lucide-file-text"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/></svg>`,
  }

  // ===== State =====
  const selectedMenu = ref<string>('')
  const sidebarOpen = ref<boolean>(false)
  const mobileMenuOpen = ref<boolean>(false)
  const userPermissions = ref<string[]>([])

  // ===== Router =====
  const route = useRoute()

  // ===== Helper Functions =====

  // Helper: Find menu item by ID (including children)
  const findMenuItemById = (
    targetId: string
  ): { item: MenuItem; parent?: MenuItem } | null => {
    for (const group of menuGroups) {
      for (const item of group.items) {
        // Check main item
        if (item.id === targetId) {
          return { item }
        }

        // Check children
        if (item.children) {
          for (const child of item.children) {
            if (child.id === targetId) {
              return { item: child, parent: item }
            }
          }
        }
      }
    }
    return null
  }

  // Helper: Tìm menu item theo route
  const findMenuByRoute = (targetRoute: string): MenuItem | null => {
    for (const group of menuGroups) {
      for (const item of group.items) {
        // Check main item
        if (item.route && item.route === targetRoute) {
          return item
        }

        // Check children
        if (item.children) {
          for (const child of item.children) {
            if (child.route && child.route === targetRoute) {
              return item // Return parent for dropdown state
            }
          }
        }
      }
    }
    return null
  }

  // ===== Actions =====
  const openMenu = (menuId: string): void => {
    selectedMenu.value = menuId
  }

  const closeMenu = (): void => {
    selectedMenu.value = ''
  }

  const toggleMenu = (menuId: string): void => {
    if (selectedMenu.value === menuId) {
      closeMenu()
    } else {
      openMenu(menuId)
    }
  }

  const toggleSidebar = (): void => {
    sidebarOpen.value = !sidebarOpen.value
  }

  const toggleMobileMenu = (): void => {
    mobileMenuOpen.value = !mobileMenuOpen.value
  }

  const closeAll = (): void => {
    selectedMenu.value = ''
    sidebarOpen.value = false
    mobileMenuOpen.value = false
  }

  const setUserPermissions = (permissions: string[]): void => {
    userPermissions.value = permissions
  }

  // ===== Getters =====
  const isMenuOpen = (menuId: string): boolean => {
    return selectedMenu.value === menuId
  }

  const hasPermission = (permission: string | string[] | boolean): boolean => {
    // Nếu permission là true, luôn cho phép
    if (permission === true) return true

    // Nếu permission là false, luôn từ chối
    if (permission === false) return false

    // Nếu chưa set permissions (mảng rỗng), mặc định cho phép tất cả
    if (userPermissions.value.length === 0) return true

    // Nếu permission là string
    if (typeof permission === 'string') {
      return userPermissions.value.includes(permission)
    }

    // Nếu permission là array, kiểm tra có ít nhất 1 quyền
    if (Array.isArray(permission)) {
      return permission.some((p) => userPermissions.value.includes(p))
    }

    return false
  }

  // ===== NEW: SEPARATED ACTIVE FUNCTIONS =====

  // 1. Hàm check parent dropdown active (CHỈ khi có child active)
  const isParentDropdownActive = (menuId: string): boolean => {
    const currentPath = route.path
    const menuResult = findMenuItemById(menuId)

    if (!menuResult || menuResult.parent) {
      return false // Chỉ dành cho parent items
    }

    const { item: targetItem } = menuResult

    if (targetItem.type !== 'dropdown') {
      return false // Chỉ dành cho dropdown
    }

    // Kiểm tra có child nào active không
    const hasActiveChild = targetItem.children?.some(
      (child) => child.route && child.route === currentPath
    )

    return !!hasActiveChild
  }

  // 2. Hàm check child menu active (CHỈ child)
  const isChildMenuActive = (menuId: string): boolean => {
    const currentPath = route.path
    const menuResult = findMenuItemById(menuId)

    if (!menuResult || !menuResult.parent) {
      return false // Chỉ dành cho child items
    }

    const { item: targetItem } = menuResult
    const isActive = !!(targetItem.route && targetItem.route === currentPath)

    return isActive
  }

  // 3. Hàm check link menu active (CHỈ single links)
  const isLinkMenuActive = (menuId: string): boolean => {
    const currentPath = route.path
    const menuResult = findMenuItemById(menuId)

    if (!menuResult || menuResult.parent) {
      return false // Chỉ dành cho top-level items
    }

    const { item: targetItem } = menuResult

    if (targetItem.type !== 'link') {
      return false // Chỉ dành cho link items
    }

    const isActive = !!(targetItem.route && targetItem.route === currentPath)

    return isActive
  }

  // 4. Hàm tổng hợp cũ (deprecated but kept for backward compatibility)
  const isMenuActive = (menuId: string): boolean => {
    const menuResult = findMenuItemById(menuId)
    if (!menuResult) return false

    const { parent, item } = menuResult

    if (parent) {
      return isChildMenuActive(menuId)
    } else if (item.type === 'dropdown') {
      return isParentDropdownActive(menuId)
    } else if (item.type === 'link') {
      return isLinkMenuActive(menuId)
    }

    return false
  }

  // ===== Auto-manage dropdown state based on current route =====
  const updateMenuStateFromRoute = (): void => {
    const currentPath = route.path
    const activeMenuItem = findMenuByRoute(currentPath)

    if (activeMenuItem && activeMenuItem.type === 'dropdown') {
      // Mở dropdown nếu đang ở child route
      const hasActiveChild = activeMenuItem.children?.some(
        (child) => child.route && child.route === currentPath
      )

      if (hasActiveChild) {
        selectedMenu.value = activeMenuItem.id
      }
    }
  }

  // ===== Filtered Menu Groups based on permissions =====
  const filteredMenuGroups = computed<MenuGroup[]>(() => {
    return menuGroups
      .filter((group) => hasPermission(group.permission ?? true))
      .map((group) => ({
        ...group,
        items: group.items
          .filter((item) => hasPermission(item.permission ?? true))
          .map((item) => ({
            ...item,
            children: item.children?.filter((child) =>
              hasPermission(child.permission ?? true)
            ),
          }))
          .filter(
            (item) =>
              !item.children || (item.children && item.children.length > 0)
          ),
      }))
      .filter((group) => group.items.length > 0)
  })

  const getIcon = (iconName: string): string => {
    return iconComponents[iconName] || ''
  }

  // ===== Watchers =====

  // Watch route changes to update menu state
  watch(
    () => route.path,
    (newPath) => {
      console.log('🌐 Route changed to:', newPath)
      // Close mobile menu on route change
      mobileMenuOpen.value = false
      // Update menu state based on new route
      updateMenuStateFromRoute()
    },
    { immediate: true }
  )

  // ===== Auto close mobile menu on desktop =====
  const handleResize = (): void => {
    if (process.client && window.innerWidth >= 1024) {
      mobileMenuOpen.value = false
    }
  }

  onMounted(() => {
    if (process.client) {
      window.addEventListener('resize', handleResize)
      // Initialize menu state based on current route
      updateMenuStateFromRoute()
    }
  })

  onUnmounted(() => {
    if (process.client) {
      window.removeEventListener('resize', handleResize)
    }
  })

  return {
    // Data
    menuGroups,
    filteredMenuGroups,

    // State
    selectedMenu,
    sidebarOpen,
    mobileMenuOpen,
    userPermissions,

    // Actions
    openMenu,
    closeMenu,
    toggleMenu,
    toggleSidebar,
    toggleMobileMenu,
    closeAll,
    setUserPermissions,

    // Getters - NEW: Separated functions
    isMenuOpen,
    isParentDropdownActive,
    isChildMenuActive,
    isLinkMenuActive,
    isMenuActive, // Deprecated but kept for compatibility
    hasPermission,
    getIcon,
  }
}
