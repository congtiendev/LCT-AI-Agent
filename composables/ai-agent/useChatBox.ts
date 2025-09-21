import { ref, reactive, computed, onMounted, onUnmounted, nextTick } from 'vue'
import type { AgentChat } from '~/types/agents'
interface ChatBoxProps {
  initialWidth?: number
  initialHeight?: number
  minWidth?: number
  minHeight?: number
  maxWidth?: number
  maxHeight?: number
  startExpanded?: boolean
}

interface Position {
  x: number
  y: number
}

export const useChatBox = (props: ChatBoxProps = {}) => {
  // Default props
  const defaultProps = {
    initialWidth: 360,
    initialHeight: 520,
    minWidth: 320,
    minHeight: 400,
    maxWidth: 500,
    maxHeight: 700,
    startExpanded: false,
  }

  const config = { ...defaultProps, ...props }

  // Refs
  const chatWindow = ref<HTMLElement | null>(null)
  const chatBubble = ref<HTMLElement | null>(null)
  const header = ref<HTMLElement | null>(null)
  const messagesArea = ref<HTMLElement | null>(null)

  // State
  const isExpanded = ref(config.startExpanded)
  const isDragging = ref(false)
  const isResizing = ref(false)
  const isDraggingBubble = ref(false)

  // Position calculations
  const getInitialWindowPosition = (): Position => {
    const padding = 24
    return {
      x: window.innerWidth - config.initialWidth - padding,
      y: window.innerHeight - config.initialHeight - padding,
    }
  }

  const getInitialBubblePosition = (): Position => {
    const padding = 24
    return {
      x: window.innerWidth - 68 - padding,
      y: window.innerHeight - 68 - padding,
    }
  }

  // Window position and size
  const windowX = ref(0)
  const windowY = ref(0)
  const windowWidth = ref(config.initialWidth)
  const windowHeight = ref(config.initialHeight)

  // Bubble position
  const bubbleX = ref(0)
  const bubbleY = ref(0)

  // Drag tracking
  let hasDragged = false
  const dragThreshold = 5 // pixels

  // Drag states
  const dragStart = reactive({ x: 0, y: 0, windowX: 0, windowY: 0 })
  const bubbleDragStart = reactive({
    x: 0,
    y: 0,
    bubbleX: 0,
    bubbleY: 0,
    startX: 0,
    startY: 0,
  })
  const resizeStart = reactive({
    x: 0,
    y: 0,
    windowX: 0,
    windowY: 0,
    windowWidth: 0,
    windowHeight: 0,
    direction: '',
  })

  // Messages and chat state
  const agentChatStore = useAgentChatStore()
  const { currentChatList, agentInsightProcessList, loading, error } =
    storeToRefs(agentChatStore)
  const { chatWithAgent, addMessage: storeAddMessage } = agentChatStore

  const unreadCount = ref(3)
  const newMessage = ref('')
  const isTyping = ref(false)
  const messages = computed(() => {
    return currentChatList.value
  })

  // Computed styles
  const windowStyle = computed(() => ({
    left: `${windowX.value}px`,
    top: `${windowY.value}px`,
    width: `${windowWidth.value}px`,
  }))

  const bubbleStyle = computed(() => ({
    left: `${bubbleX.value}px`,
    top: `${bubbleY.value}px`,
  }))

  // Initialize positions
  const initializePositions = () => {
    const windowPos = getInitialWindowPosition()
    const bubblePos = getInitialBubblePosition()

    windowX.value = windowPos.x
    windowY.value = windowPos.y
    bubbleX.value = bubblePos.x
    bubbleY.value = bubblePos.y
  }

  // Chat actions
  const expandChat = () => {
    isExpanded.value = true
    unreadCount.value = 0

    nextTick(() => {
      if (messagesArea.value) {
        messagesArea.value.scrollTop = messagesArea.value.scrollHeight
      }
    })
  }

  const minimizeToChat = () => {
    isExpanded.value = false
  }

  const closeToChat = () => {
    isExpanded.value = false
  }

  // Handle bubble click - only expand if not dragged
  const handleBubbleClick = (e: MouseEvent) => {
    if (!hasDragged) {
      expandChat()
    }
  }

  // Window dragging
  const startDrag = (e: MouseEvent) => {
    e.preventDefault()
    isDragging.value = true
    dragStart.x = e.clientX
    dragStart.y = e.clientY
    dragStart.windowX = windowX.value
    dragStart.windowY = windowY.value

    document.addEventListener('mousemove', drag)
    document.addEventListener('mouseup', stopDrag)
  }

  const drag = (e: MouseEvent) => {
    if (!isDragging.value) return

    const deltaX = e.clientX - dragStart.x
    const deltaY = e.clientY - dragStart.y

    const newX = dragStart.windowX + deltaX
    const newY = dragStart.windowY + deltaY

    windowX.value = Math.max(
      0,
      Math.min(newX, window.innerWidth - windowWidth.value)
    )
    windowY.value = Math.max(
      0,
      Math.min(newY, window.innerHeight - windowHeight.value)
    )
  }

  const stopDrag = () => {
    isDragging.value = false
    document.removeEventListener('mousemove', drag)
    document.removeEventListener('mouseup', stopDrag)
  }

  // Bubble dragging
  const startDragBubble = (e: MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    isDraggingBubble.value = true
    hasDragged = false

    bubbleDragStart.x = e.clientX
    bubbleDragStart.y = e.clientY
    bubbleDragStart.bubbleX = bubbleX.value
    bubbleDragStart.bubbleY = bubbleY.value
    bubbleDragStart.startX = e.clientX
    bubbleDragStart.startY = e.clientY

    document.addEventListener('mousemove', dragBubble)
    document.addEventListener('mouseup', stopDragBubble)
    document.addEventListener('dragstart', preventDragStart)
  }

  const dragBubble = (e: MouseEvent) => {
    if (!isDraggingBubble.value) return

    const deltaX = e.clientX - bubbleDragStart.x
    const deltaY = e.clientY - bubbleDragStart.y

    // Check if we've moved beyond the drag threshold
    const totalDelta =
      Math.abs(e.clientX - bubbleDragStart.startX) +
      Math.abs(e.clientY - bubbleDragStart.startY)
    if (totalDelta > dragThreshold) {
      hasDragged = true
    }

    const newX = Math.max(
      0,
      Math.min(bubbleDragStart.bubbleX + deltaX, window.innerWidth - 68)
    )
    const newY = Math.max(
      0,
      Math.min(bubbleDragStart.bubbleY + deltaY, window.innerHeight - 68)
    )

    bubbleX.value = newX
    bubbleY.value = newY
  }

  const stopDragBubble = () => {
    isDraggingBubble.value = false
    document.removeEventListener('mousemove', dragBubble)
    document.removeEventListener('mouseup', stopDragBubble)
    document.removeEventListener('dragstart', preventDragStart)

    // Only snap to edges if we actually dragged
    if (hasDragged) {
      setTimeout(() => {
        const centerX = bubbleX.value + 34
        const screenCenterX = window.innerWidth / 2

        if (centerX < screenCenterX) {
          bubbleX.value = 24
        } else {
          bubbleX.value = window.innerWidth - 92
        }
      }, 100)
    }

    // Reset drag flag after a short delay to prevent immediate expansion
    setTimeout(() => {
      hasDragged = false
    }, 200)
  }

  const preventDragStart = (e: DragEvent) => {
    e.preventDefault()
  }

  // Resizing functions
  const startResize = (direction: string, event: MouseEvent) => {
    isResizing.value = true
    resizeStart.x = event.clientX
    resizeStart.y = event.clientY
    resizeStart.windowX = windowX.value
    resizeStart.windowY = windowY.value
    resizeStart.windowWidth = windowWidth.value
    resizeStart.windowHeight = windowHeight.value
    resizeStart.direction = direction

    document.addEventListener('mousemove', resize)
    document.addEventListener('mouseup', stopResize)
    event.preventDefault()
  }

  const resize = (e: MouseEvent) => {
    if (!isResizing.value) return

    const deltaX = e.clientX - resizeStart.x
    const deltaY = e.clientY - resizeStart.y
    const direction = resizeStart.direction

    let newX = resizeStart.windowX
    let newY = resizeStart.windowY
    let newWidth = resizeStart.windowWidth
    let newHeight = resizeStart.windowHeight

    if (direction.includes('e')) {
      newWidth = Math.max(
        config.minWidth,
        Math.min(config.maxWidth, resizeStart.windowWidth + deltaX)
      )
    }
    if (direction.includes('w')) {
      const widthChange =
        Math.max(
          config.minWidth,
          Math.min(config.maxWidth, resizeStart.windowWidth - deltaX)
        ) - resizeStart.windowWidth
      newWidth = resizeStart.windowWidth + widthChange
      newX = resizeStart.windowX - widthChange
    }
    if (direction.includes('s')) {
      newHeight = Math.max(
        config.minHeight,
        Math.min(config.maxHeight, resizeStart.windowHeight + deltaY)
      )
    }
    if (direction.includes('n')) {
      const heightChange =
        Math.max(
          config.minHeight,
          Math.min(config.maxHeight, resizeStart.windowHeight - deltaY)
        ) - resizeStart.windowHeight
      newHeight = resizeStart.windowHeight + heightChange
      newY = resizeStart.windowY - heightChange
    }

    const maxX = window.innerWidth - newWidth
    const maxY = window.innerHeight - newHeight

    newX = Math.max(0, Math.min(newX, maxX))
    newY = Math.max(0, Math.min(newY, maxY))

    newWidth = Math.min(newWidth, window.innerWidth - newX)
    newHeight = Math.min(newHeight, window.innerHeight - newY)

    windowX.value = newX
    windowY.value = newY
    windowWidth.value = newWidth
    windowHeight.value = newHeight
  }

  const stopResize = () => {
    isResizing.value = false
    document.removeEventListener('mousemove', resize)
    document.removeEventListener('mouseup', stopResize)
  }

  // Message functions
  const sendMessage = (agentId: string, userId: string) => {
    if (!newMessage.value.trim()) return
    chatWithAgent(agentId, newMessage.value)
    newMessage.value = ''
    nextTick(() => {
      if (messagesArea.value) {
        messagesArea.value.scrollTop = messagesArea.value.scrollHeight
      }
    })

    // Show typing indicator
    setTimeout(() => {
      isTyping.value = true
    }, 500)

    // Simulate response with typing
    setTimeout(() => {
      isTyping.value = false

      const responses = [
        'Cảm ơn bạn đã nhắn tin! 😊',
        'Mình hiểu rồi, thanks bạn! 👍',
        'Ôkê, noted! ✨',
        'Sounds good to me! 🚀',
        'Mình sẽ nhớ điều này! 💝',
        'Tuyệt vời! 🎉',
        'Được rồi nhé! 😄',
      ]

      setTimeout(() => {
        addMessage(
          agentId,
          userId,
          responses[Math.floor(Math.random() * responses.length)]
        )

        if (!isExpanded.value) {
          unreadCount.value++
        }

        nextTick(() => {
          if (messagesArea.value && isExpanded.value) {
            messagesArea.value.scrollTop = messagesArea.value.scrollHeight
          }
        })
      }, 200)
    }, 2000)
  }

  const formatTime = (timestamp: Date): string => {
    return new Intl.DateTimeFormat('vi-VN', {
      hour: '2-digit',
      minute: '2-digit',
    }).format(timestamp)
  }

  // Handle window resize
  const handleWindowResize = () => {
    if (bubbleX.value + 68 > window.innerWidth) {
      bubbleX.value = window.innerWidth - 92
    }
    if (bubbleY.value + 68 > window.innerHeight) {
      bubbleY.value = window.innerHeight - 92
    }

    if (windowX.value + windowWidth.value > window.innerWidth) {
      windowX.value = window.innerWidth - windowWidth.value
    }
    if (windowY.value + windowHeight.value > window.innerHeight) {
      windowY.value = window.innerHeight - windowHeight.value
    }
  }

  // Lifecycle
  const setupEventListeners = () => {
    window.addEventListener('resize', handleWindowResize)
  }

  const cleanupEventListeners = () => {
    window.removeEventListener('resize', handleWindowResize)
    document.removeEventListener('mousemove', drag)
    document.removeEventListener('mouseup', stopDrag)
    document.removeEventListener('mousemove', dragBubble)
    document.removeEventListener('mouseup', stopDragBubble)
    document.removeEventListener('dragstart', preventDragStart)
    document.removeEventListener('mousemove', resize)
    document.removeEventListener('mouseup', stopResize)
  }

  const initialize = () => {
    initializePositions()
    setupEventListeners()
  }

  // Custom message functions for external use
  const addMessage = (
    senderId: string,
    receiverId: string,
    message: string
  ) => {
    storeAddMessage(senderId, receiverId, message)
    nextTick(() => {
      if (messagesArea.value && isExpanded.value) {
        messagesArea.value.scrollTop = messagesArea.value.scrollHeight
      }
    })
    if (!isExpanded.value) {
      unreadCount.value++
    }
  }

  const clearMessages = () => {}

  const setUnreadCount = (count: number) => {
    unreadCount.value = count
  }

  // Return all reactive data and methods
  return {
    // Refs
    chatWindow,
    chatBubble,
    header,
    messagesArea,

    // State
    isExpanded,
    isDragging,
    isResizing,
    isDraggingBubble,
    windowX,
    windowY,
    windowWidth,
    windowHeight,
    bubbleX,
    bubbleY,
    unreadCount,
    newMessage,
    isTyping,
    messages,

    // Computed
    windowStyle,
    bubbleStyle,

    // Methods - Chat actions
    expandChat,
    minimizeToChat,
    closeToChat,
    handleBubbleClick,

    // Methods - Dragging
    startDrag,
    startDragBubble,

    // Methods - Resizing
    startResize: (direction: string) => (event: MouseEvent) =>
      startResize(direction, event),

    // Methods - Messages
    sendMessage,
    formatTime,
    addMessage,
    clearMessages,
    setUnreadCount,

    // Lifecycle
    initialize,
    cleanup: cleanupEventListeners,

    // Config
    config,
  }
}
