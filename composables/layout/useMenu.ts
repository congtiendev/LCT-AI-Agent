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

  // Getters
  isMenuOpen: (menuId: string) => boolean
  isMenuActive: (menuId: string) => boolean
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

    chat: `<path fill-rule="evenodd" clip-rule="evenodd" d="M4.00002 12.0957C4.00002 7.67742 7.58174 4.0957 12 4.0957C16.4183 4.0957 20 7.67742 20 12.0957C20 16.514 16.4183 20.0957 12 20.0957H5.06068L6.34317 18.8132C6.48382 18.6726 6.56284 18.4818 6.56284 18.2829C6.56284 18.084 6.48382 17.8932 6.34317 17.7526C4.89463 16.304 4.00002 14.305 4.00002 12.0957ZM12 2.5957C6.75332 2.5957 2.50002 6.849 2.50002 12.0957C2.50002 14.4488 3.35633 16.603 4.77303 18.262L2.71969 20.3154C2.50519 20.5299 2.44103 20.8525 2.55711 21.1327C2.6732 21.413 2.94668 21.5957 3.25002 21.5957H12C17.2467 21.5957 21.5 17.3424 21.5 12.0957C21.5 6.849 17.2467 2.5957 12 2.5957Z" fill=""/>`,

    bot: `<path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/>`,
  }

  // ===== State =====
  const selectedMenu = ref<string>('')
  const sidebarOpen = ref<boolean>(false)
  const mobileMenuOpen = ref<boolean>(false)
  const userPermissions = ref<string[]>([])

  // ===== Router =====
  const route = useRoute()

  // ===== Helper Functions =====

  // Hàm kiểm tra route có match với pattern không
  const isRouteMatching = (routePath: string, currentPath: string): boolean => {
    // Exact match
    if (routePath === currentPath) return true

    // Check if current path starts with route path (cho nested routes)
    if (currentPath.startsWith(routePath + '/') && routePath !== '/') {
      return true
    }

    return false
  }

  // Hàm tìm menu item theo route
  const findMenuByRoute = (targetRoute: string): MenuItem | null => {
    for (const group of menuGroups) {
      for (const item of group.items) {
        // Check main item
        if (item.route && isRouteMatching(item.route, targetRoute)) {
          return item
        }

        // Check children
        if (item.children) {
          for (const child of item.children) {
            if (child.route && isRouteMatching(child.route, targetRoute)) {
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

  // ===== Helper: Find menu item by ID (including children) =====
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

  // ===== FIXED: isMenuActive Function =====
  const isMenuActive = (menuId: string): boolean => {
    const currentPath = route.path
    const routeName = route.name as string

    // 1. Tìm menu item theo ID (bao gồm children)
    const menuResult = findMenuItemById(menuId)
    if (!menuResult) {
      return false
    }

    const { item: targetItem, parent: parentItem } = menuResult

    // 2. Nếu là parent dropdown và có child active
    if (!parentItem && targetItem.type === 'dropdown') {
      // Kiểm tra có child nào active không
      const hasActiveChild = targetItem.children?.some(
        (child) => child.route && isRouteMatching(child.route, currentPath)
      )

      if (hasActiveChild) {
        return true
      }

      // Kiểm tra dropdown có đang mở không
      if (isMenuOpen(menuId)) {
        return true
      }
    }

    // 3. Kiểm tra route match trực tiếp
    if (targetItem.route && isRouteMatching(targetItem.route, currentPath)) {
      return true
    }

    // 4. Kiểm tra theo route name (fallback)
    if (routeName && routeName === menuId) {
      return true
    }

    // 5. Kiểm tra route name với prefix
    if (routeName && routeName.includes(menuId)) {
      return true
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
        (child) => child.route && isRouteMatching(child.route, currentPath)
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

    // Getters
    isMenuOpen,
    isMenuActive,
    hasPermission,
    getIcon,
  }
}
