// composables/useNotifications.ts
export interface NotificationUser {
  name: string
  avatar: string
  status: 'online' | 'offline' | 'away' | 'busy'
}

export interface Notification {
  id: string | number
  user: NotificationUser
  message: string
  type: 'Project' | 'System' | 'User' | 'Security' | 'Update' | string
  time: string
  timestamp: Date
  isRead: boolean
  priority: 'low' | 'medium' | 'high' | 'urgent'
  actionUrl?: string
  actions?: NotificationAction[]
}

export interface NotificationAction {
  id: string
  label: string
  action: () => void | Promise<void>
  variant?: 'primary' | 'secondary' | 'danger'
}

export interface NotificationOptions {
  maxNotifications?: number
  autoMarkAsRead?: boolean
  persistToStorage?: boolean
  soundEnabled?: boolean
}

export interface NotificationState {
  hasNotifications: Ref<boolean>
  notifications: Readonly<Ref<readonly Notification[]>>
  unreadCount: Ref<number>
  markAsRead: (id?: string | number) => void
  markAllAsRead: () => void
  addNotification: (
    notification: Omit<Notification, 'id' | 'timestamp' | 'isRead'>
  ) => void
  removeNotification: (id: string | number) => void
  clearAllNotifications: () => void
  getNotificationsByType: (type: string) => Notification[]
  getUnreadNotifications: () => Notification[]
}

export const useNotifications = (
  options: NotificationOptions = {}
): NotificationState => {
  const {
    maxNotifications = 50,
    autoMarkAsRead = false,
    persistToStorage = true,
    soundEnabled = false,
  } = options

  const STORAGE_KEY = 'app_notifications'

  // Initialize with mock data
  const notifications = ref<Notification[]>([
    {
      id: 1,
      user: {
        name: 'Terry Franci',
        avatar: '/images/user/user-02.jpg',
        status: 'online',
      },
      message: 'requests permission to change Project - Nganter App',
      type: 'Project',
      time: '5 min ago',
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      isRead: false,
      priority: 'medium',
      actionUrl: '/projects/nganter-app',
    },
    {
      id: 2,
      user: {
        name: 'Alena Franci',
        avatar: '/images/user/user-03.jpg',
        status: 'online',
      },
      message: 'requests permission to change Project - Nganter App',
      type: 'Project',
      time: '8 min ago',
      timestamp: new Date(Date.now() - 8 * 60 * 1000),
      isRead: false,
      priority: 'medium',
    },
    {
      id: 3,
      user: {
        name: 'Jocelyn Kenter',
        avatar: '/images/user/user-04.jpg',
        status: 'online',
      },
      message: 'requests permission to change Project - Nganter App',
      type: 'Project',
      time: '15 min ago',
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
      isRead: false,
      priority: 'low',
    },
    {
      id: 4,
      user: {
        name: 'Brandon Philips',
        avatar: '/images/user/user-05.jpg',
        status: 'offline',
      },
      message: 'requests permission to change Project - Nganter App',
      type: 'Project',
      time: '1 hr ago',
      timestamp: new Date(Date.now() - 60 * 60 * 1000),
      isRead: false,
      priority: 'low',
    },
  ])

  const hasNotifications = computed<boolean>(() =>
    notifications.value.some((n) => !n.isRead)
  )

  const unreadCount = computed<number>(
    () => notifications.value.filter((n) => !n.isRead).length
  )

  const markAsRead = (id?: string | number): void => {
    if (id) {
      const notification = notifications.value.find((n) => n.id === id)
      if (notification) {
        notification.isRead = true
      }
    } else {
      // Mark all as read if no ID provided
      markAllAsRead()
    }
    saveToStorage()
  }

  const markAllAsRead = (): void => {
    notifications.value.forEach((notification) => {
      notification.isRead = true
    })
    saveToStorage()
  }

  const addNotification = (
    notificationData: Omit<Notification, 'id' | 'timestamp' | 'isRead'>
  ): void => {
    const newNotification: Notification = {
      id: Date.now(),
      timestamp: new Date(),
      isRead: false,
      ...notificationData,
    }

    notifications.value.unshift(newNotification)

    // Limit number of notifications
    if (notifications.value.length > maxNotifications) {
      notifications.value = notifications.value.slice(0, maxNotifications)
    }

    // Play sound if enabled
    if (soundEnabled && process.client) {
      playNotificationSound()
    }

    saveToStorage()
  }

  const removeNotification = (id: string | number): void => {
    const index = notifications.value.findIndex((n) => n.id === id)
    if (index > -1) {
      notifications.value.splice(index, 1)
      saveToStorage()
    }
  }

  const clearAllNotifications = (): void => {
    notifications.value = []
    saveToStorage()
  }

  const getNotificationsByType = (type: string): Notification[] => {
    return notifications.value.filter((n) => n.type === type)
  }

  const getUnreadNotifications = (): Notification[] => {
    return notifications.value.filter((n) => !n.isRead)
  }

  // Storage functions
  const saveToStorage = (): void => {
    if (persistToStorage && process.client) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(notifications.value))
      } catch (error) {
        console.warn('Failed to save notifications to storage:', error)
      }
    }
  }

  const loadFromStorage = (): void => {
    if (persistToStorage && process.client) {
      try {
        const stored = localStorage.getItem(STORAGE_KEY)
        if (stored) {
          const parsedNotifications = JSON.parse(stored)
          // Convert timestamp strings back to Date objects
          notifications.value = parsedNotifications.map((n: any) => ({
            ...n,
            timestamp: new Date(n.timestamp),
          }))
        }
      } catch (error) {
        console.warn('Failed to load notifications from storage:', error)
      }
    }
  }

  const playNotificationSound = (): void => {
    try {
      const audio = new Audio('/sounds/notification.mp3')
      audio.volume = 0.3
      audio.play().catch(() => {
        // Ignore autoplay policy errors
      })
    } catch (error) {
      console.warn('Failed to play notification sound:', error)
    }
  }

  // Auto mark as read when notifications are viewed
  if (autoMarkAsRead) {
    watch(hasNotifications, (hasNew) => {
      if (hasNew) {
        setTimeout(() => {
          markAllAsRead()
        }, 3000) // Mark as read after 3 seconds
      }
    })
  }

  // Initialize
  onMounted(() => {
    loadFromStorage()
  })

  return {
    hasNotifications,
    notifications: readonly(notifications) as Readonly<
      Ref<readonly Notification[]>
    >,
    unreadCount,
    markAsRead,
    markAllAsRead,
    addNotification,
    removeNotification,
    clearAllNotifications,
    getNotificationsByType,
    getUnreadNotifications,
  }
}
