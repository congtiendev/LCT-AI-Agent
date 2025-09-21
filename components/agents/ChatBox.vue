<template>
    <div class="fixed inset-0 pointer-events-none z-50">
        <!-- Chat Bubble (when minimized or closed) -->
        <Transition name="bubble-fade">
            <div v-if="!isExpanded" ref="chatBubble" :style="bubbleStyle"
                class="absolute w-16 h-16 pointer-events-auto cursor-pointer rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110 active:scale-95"
                :class="{ 'cursor-move': isDraggingBubble, 'z-[9999]': true }" @click="handleBubbleClick"
                @mousedown="startDragBubble">
                <div class="w-full h-full relative flex items-center justify-center">
                    <!-- Avatar -->
                    <div class="w-full h-full rounded-full overflow-hidden relative border-2 border-white/80">
                        <img src="/images/avatars/chatbot.png" alt="Avatar" class="w-full h-full object-cover" />
                    </div>

                    <!-- Unread count badge -->
                    <Transition name="badge-bounce">
                        <div v-if="unreadCount > 0"
                            class="absolute -top-1 -right-1 min-w-6 h-6 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center px-1 shadow-lg animate-bounce-custom">
                            {{ unreadCount > 9 ? '9+' : unreadCount }}
                        </div>
                    </Transition>
                </div>
            </div>
        </Transition>

        <!-- Chat Window (when expanded) -->
        <Transition name="window-slide">
            <div v-if="isExpanded" ref="chatWindow" :style="windowStyle"
                class="absolute bg-white rounded-2xl overflow-hidden pointer-events-auto shadow-2xl border border-black/5 backdrop-blur-lg transition-all duration-300 ease-out z-[99998]"
                :class="{ 'select-none': isDragging || isResizing }">
                <!-- Header -->
                <div ref="header"
                    class="p-4 cursor-move flex items-center justify-between text-white relative overflow-hidden chat-header-gradient shimmer-effect"
                    @mousedown="startDrag">
                    <div class="flex items-center gap-3">
                        <div
                            class="w-10 h-10 rounded-full overflow-hidden relative border-2 border-white/30 animate-float">
                            <img src="/images/avatars/chatbot.png" alt="Avatar" class="w-full h-full object-cover" />
                        </div>
                        <div class="flex flex-col">
                            <div class="font-semibold text-sm leading-tight">InnoAgent hỗ trợ bán hàng</div>
                        </div>
                    </div>

                    <div class="flex items-center gap-1">
                        <button @click="minimizeToChat"
                            class="w-8 h-8 rounded-full flex items-center justify-center bg-white/10 transition-all duration-300 hover:bg-white/20 hover:scale-110 hover:rotate-3 hover:shadow-lg relative overflow-hidden header-btn-ripple"
                            title="Thu nhỏ">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 12H6" />
                            </svg>
                        </button>
                    </div>
                </div>

                <!-- Messages Area -->
                <div class="flex flex-col bg-gray-50" :style="{ height: `${windowHeight - 128}px` }">
                    <div ref="messagesArea" class="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
                        <div v-for="(message, index) in messages" :key="message.id"
                            class="flex flex-col gap-1 opacity-0 animate-message-slide-in"
                            :class="{ 'items-end': message.owner }" :style="{ 'animation-delay': `${index * 0.1}s` }">
                            <div class="inline-block max-w-xs px-4 py-3 rounded-2xl relative transition-all duration-300 hover:scale-105 transform-gpu text-sm"
                                :class="message.owner
                                    ? 'text-white shadow-lg message-gradient animate-gradient-shift hover:shadow-xl hover:-translate-y-1'
                                    : 'bg-white text-gray-800 shadow-sm border border-black/5 hover:shadow-md'">
                                {{ message }}
                                <!-- {{ message.messages.content }} -->
                            </div>
                            <div class="text-xs text-gray-500 px-2 opacity-0 animate-fade-in-delayed">
                                <!-- {{ message.messages.message.created_at }} -->
                            </div>
                        </div>

                        <!-- Typing Indicator -->
                        <Transition name="fade">
                            <div v-if="isTyping" class="flex flex-col gap-1 animate-message-slide-left">
                                <div
                                    class="inline-block bg-gray-100 text-gray-600 px-4 py-2 rounded-2xl border border-gray-200">
                                    <div class="flex items-center gap-1">
                                        <span class="w-2 h-2 bg-gray-400 rounded-full animate-typing-dot"></span>
                                        <span
                                            class="w-2 h-2 bg-gray-400 rounded-full animate-typing-dot-delay-1"></span>
                                        <span
                                            class="w-2 h-2 bg-gray-400 rounded-full animate-typing-dot-delay-2"></span>
                                    </div>
                                </div>
                                <div class="text-xs text-gray-500 px-2">Đang nhập...</div>
                            </div>
                        </Transition>
                    </div>
                </div>

                <!-- Input Area -->
                <div class="p-4 bg-white border-t border-gray-100 relative glow-line">
                    <div class="flex items-center gap-3">
                        <input v-model="newMessage" type="text" placeholder="Nhập tin nhắn..."
                            class="flex-1 px-5 py-3 bg-gray-50 rounded-full border-2 border-transparent outline-none text-sm transition-all duration-300 focus:bg-white focus:border-blue-500 focus:shadow-lg focus:-translate-y-0.5 placeholder-gray-400 focus:placeholder-gray-300 input-focus-slide"
                            @keypress.enter="() => sendMessage(agentId || '', userId || '')" />
                        {{ agentId, userId }}
                        <button @click="() => sendMessage(agentId || '', userId || '')" :disabled="!newMessage.trim()"
                            class="w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 relative overflow-hidden disabled:cursor-not-allowed send-btn-effect"
                            :class="newMessage.trim()
                                ? 'text-white shadow-lg scale-105 rotate-12 animate-send-pulse'
                                : 'text-gray-400 bg-gray-100 hover:bg-gray-200 hover:scale-105'">
                            <svg class="w-5 h-5 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                            </svg>
                        </button>
                    </div>
                </div>

                <!-- Resize Handles -->
                <div class="absolute inset-0 pointer-events-none">
                    <!-- Corner resize handles -->
                    <div class="absolute top-0 left-0 w-3 h-3 cursor-nw-resize pointer-events-auto"
                        @mousedown="startResize('nw')"></div>
                    <div class="absolute top-0 right-0 w-3 h-3 cursor-ne-resize pointer-events-auto"
                        @mousedown="startResize('ne')"></div>
                    <div class="absolute bottom-0 left-0 w-3 h-3 cursor-sw-resize pointer-events-auto"
                        @mousedown="startResize('sw')"></div>
                    <div class="absolute bottom-0 right-0 w-3 h-3 cursor-se-resize pointer-events-auto"
                        @mousedown="startResize('se')"></div>

                    <!-- Edge resize handles -->
                    <div class="absolute top-0 left-3 right-3 h-1 cursor-n-resize pointer-events-auto"
                        @mousedown="startResize('n')"></div>
                    <div class="absolute bottom-0 left-3 right-3 h-1 cursor-s-resize pointer-events-auto"
                        @mousedown="startResize('s')"></div>
                    <div class="absolute left-0 top-3 bottom-3 w-1 cursor-w-resize pointer-events-auto"
                        @mousedown="startResize('w')"></div>
                    <div class="absolute right-0 top-3 bottom-3 w-1 cursor-e-resize pointer-events-auto"
                        @mousedown="startResize('e')"></div>
                </div>
            </div>
        </Transition>
    </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { useChatBox } from '~/composables/ai-agent/useChatBox'

// Props
interface Props {
    initialWidth?: number
    initialHeight?: number
    minWidth?: number
    minHeight?: number
    maxWidth?: number
    maxHeight?: number
    startExpanded?: boolean
    title?: string
    inputPlaceholder?: string
    agentId?: string
    userId?: string
}

const props = withDefaults(defineProps<Props>(), {
    initialWidth: 360,
    initialHeight: 520,
    minWidth: 320,
    minHeight: 400,
    maxWidth: 500,
    maxHeight: 700,
    startExpanded: false,
    title: 'InnoAgent hỗ trợ bán hàng',
    inputPlaceholder: 'Nhập tin nhắn...'
})

// Emits
const emit = defineEmits<{
    messageAdded: [message: { id: number, text: string, owner: boolean, timestamp: Date }]
    chatExpanded: []
    chatMinimized: []
}>()

// Use composable
const {
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

    // Methods
    expandChat,
    minimizeToChat,
    closeToChat,
    handleBubbleClick,
    startDrag,
    startDragBubble,
    startResize,
    sendMessage,
    formatTime,
    addMessage,
    clearMessages,
    setUnreadCount,
    initialize,
    cleanup
} = useChatBox(props)

// Enhanced methods with events
const handleExpandChat = () => {
    expandChat()
    emit('chatExpanded')
}

const handleMinimizeChat = () => {
    minimizeToChat()
    emit('chatMinimized')
}

const handleSendMessage = () => {
    const messageText = newMessage.value
    sendMessage(props.agentId || '', props.userId || '')

    // if (messageText.trim()) {
    //     emit('messageAdded', {
    //         id: Date.now(),
    //         text: messageText,
    //         owner: true,
    //         timestamp: new Date()
    //     })
    // }
}

// Override methods to use enhanced versions
const enhancedHandleBubbleClick = (e: MouseEvent) => {
    handleBubbleClick(e)
    if (isExpanded.value) {
        emit('chatExpanded')
    }
}

// Lifecycle
onMounted(() => {
    initialize()
})

onUnmounted(() => {
    cleanup()
})

// Expose methods for parent component
defineExpose({
    addMessage,
    clearMessages,
    setUnreadCount,
    expandChat: handleExpandChat,
    minimizeToChat: handleMinimizeChat,
    messages,
    isExpanded
})
</script>

<style scoped>
.chat-bubble-gradient {
    background: linear-gradient(135deg, #4a90e2 0%, #6b73d9 20%, #8b5fbf 40%, #a8508a 60%, #c54756 80%, #e53e3e 100%);
}

.chat-header-gradient {
    background: linear-gradient(135deg, #4a90e2 0%, #6b73d9 20%, #8b5fbf 40%, #a8508a 60%, #c54756 80%, #e53e3e 100%);
}

.message-gradient {
    background: linear-gradient(135deg, #4a90e2 0%, #6b73d9 20%, #8b5fbf 40%, #a8508a 60%, #c54756 80%, #e53e3e 100%);
}

.send-btn-effect.active::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, #4a90e2 0%, #6b73d9 20%, #8b5fbf 40%, #a8508a 60%, #c54756 80%, #e53e3e 100%);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    z-index: 0;
    transition: all 0.3s ease-out;
}

.shimmer-effect::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.1), transparent);
    transform: rotate(45deg);
    animation: shimmer 3s infinite;
}

.shimmer-effect:hover::before {
    animation-duration: 1.5s;
}

.header-btn-ripple::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 50%;
    transition: all 0.3s ease-out;
    transform: translate(-50%, -50%);
}

.header-btn-ripple:hover::before {
    width: 40px;
    height: 40px;
}

.glow-line::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(74, 144, 226, 0.3), transparent);
    animation: lineGlow 3s ease-in-out infinite;
}

.input-focus-slide:focus::placeholder {
    transform: translateX(4px);
}



/* Custom Animations */
@keyframes shimmer {
    0% {
        transform: translateX(-100%) rotate(45deg);
    }

    100% {
        transform: translateX(100%) rotate(45deg);
    }
}

@keyframes lineGlow {

    0%,
    100% {
        opacity: 0.3;
        transform: scaleX(0.5);
    }

    50% {
        opacity: 1;
        transform: scaleX(1);
    }
}

@keyframes pulse-custom {

    0%,
    100% {
        opacity: 1;
    }

    50% {
        opacity: 0.5;
    }
}

@keyframes bounce-custom {

    0%,
    20%,
    53%,
    80%,
    100% {
        transform: translate3d(0, 0, 0);
    }

    40%,
    43% {
        transform: translate3d(0, -8px, 0);
    }

    70% {
        transform: translate3d(0, -4px, 0);
    }

    90% {
        transform: translate3d(0, -2px, 0);
    }
}

@keyframes float {

    0%,
    100% {
        transform: translateY(0px);
    }

    50% {
        transform: translateY(-3px);
    }
}

@keyframes wiggle {

    0%,
    100% {
        transform: rotate(0deg);
    }

    25% {
        transform: rotate(-3deg) scale(1.05);
    }

    75% {
        transform: rotate(3deg) scale(1.05);
    }
}

@keyframes heartbeat {

    0%,
    100% {
        transform: scale(1);
        opacity: 1;
    }

    50% {
        transform: scale(1.2);
        opacity: 0.8;
    }
}

@keyframes message-slide-in {
    0% {
        opacity: 0;
        transform: translateY(20px);
    }

    100% {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes message-slide-left {
    0% {
        transform: translateX(-30px) scale(0.8);
        opacity: 0;
    }

    100% {
        transform: translateX(0) scale(1);
        opacity: 1;
    }
}

@keyframes gradient-shift {

    0%,
    100% {
        background-position: 0% 50%;
    }

    50% {
        background-position: 100% 50%;
    }
}

@keyframes fade-in-delayed {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}

@keyframes send-pulse {
    0% {
        transform: scale(1.05) rotate(15deg);
    }

    50% {
        transform: scale(1.15) rotate(20deg);
    }

    100% {
        transform: scale(1.05) rotate(15deg);
    }
}

@keyframes typing-dot {

    0%,
    20% {
        transform: translateY(0);
        opacity: 0.4;
    }

    40% {
        transform: translateY(-8px);
        opacity: 1;
    }

    60%,
    100% {
        transform: translateY(0);
        opacity: 0.4;
    }
}

/* Animation classes */
.animate-pulse-custom {
    animation: pulse-custom 2s infinite;
}

.animate-bounce-custom {
    animation: bounce-custom 0.5s ease-out;
}

.animate-float {
    animation: float 3s ease-in-out infinite;
}

.animate-wiggle:hover {
    animation: wiggle 0.5s ease-in-out;
}

.animate-heartbeat {
    animation: heartbeat 2s ease-in-out infinite;
}

.animate-message-slide-in {
    animation: message-slide-in 0.4s ease-out forwards;
}

.animate-message-slide-left {
    animation: message-slide-left 0.3s ease-out;
}

.animate-gradient-shift {
    animation: gradient-shift 4s ease-in-out infinite;
}

.animate-fade-in-delayed {
    animation: fade-in-delayed 0.5s ease-out 0.3s forwards;
}

.animate-send-pulse {
    animation: send-pulse 0.6s ease-out;
}

.animate-typing-dot {
    animation: typing-dot 1.4s ease-in-out infinite;
}

.animate-typing-dot-delay-1 {
    animation: typing-dot 1.4s ease-in-out infinite 0.2s;
}

.animate-typing-dot-delay-2 {
    animation: typing-dot 1.4s ease-in-out infinite 0.4s;
}

/* Vue Transitions */
.bubble-fade-enter-active,
.bubble-fade-leave-active {
    transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.bubble-fade-enter-from,
.bubble-fade-leave-to {
    opacity: 0;
    transform: scale(0.8);
}

.window-slide-enter-active,
.window-slide-leave-active {
    transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.window-slide-enter-from,
.window-slide-leave-to {
    opacity: 0;
    transform: scale(0.9) translateY(20px);
}

.badge-bounce-enter-active {
    animation: bounce-custom 0.5s ease-out;
}

.badge-bounce-leave-active {
    transition: all 0.3s ease-in;
}

.badge-bounce-leave-to {
    opacity: 0;
    transform: scale(0.8);
}

.fade-enter-active,
.fade-leave-active {
    transition: all 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
    transform: translateY(10px);
}
</style>