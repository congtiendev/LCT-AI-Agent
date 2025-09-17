<template>
    <div class="relative h-[calc(100vh-146px)] px-4 xl:flex xl:px-0">
        <!-- Mobile Chat Header  -->
        <div
            class="my-6 flex items-center justify-between rounded-2xl border border-gray-200 bg-white p-3 xl:hidden dark:border-gray-800 dark:bg-gray-900">
            <h4 class="pl-2 text-lg font-medium text-gray-800 dark:text-white/90">
                Chats History
            </h4>
            <button @click="isSidebarOpen = true"
                class="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-gray-300 text-gray-700 dark:border-gray-700 dark:text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M4 6L20 6M4 18L20 18M4 12L20 12" stroke="currentColor" stroke-width="1.5"
                        stroke-linecap="round" stroke-linejoin="round"></path>
                </svg>
            </button>
        </div>

        <div class="flex-1 xl:py-10">
            <div class="relative mx-auto flex max-w-[720px] flex-col">
                <div ref="chatContainer"
                    class="custom-scrollbar relative z-20 max-h-[50vh] flex-1 space-y-7 overflow-y-auto pb-10 lg:pb-7">
                    <!-- Dynamic Chat Messages -->
                    <div v-for="(msg, index) in messages" :key="index" class="space-y-7">
                        <!-- User Message -->
                        <div v-if="msg.type === 'user'" class="flex justify-end">
                            <div
                                class="shadow-theme-xs bg-brand-100 dark:bg-brand-500/20 max-w-[480px] rounded-xl rounded-tr-xs px-4 py-3">
                                <p class="text-left text-sm font-normal text-gray-800 dark:text-white/90">
                                    {{ msg.content }}
                                </p>
                            </div>
                        </div>

                        <!-- AI Response -->
                        <div v-if="msg.type === 'ai'" class="flex justify-start">
                            <div>
                                <div
                                    class="shadow-theme-xs max-w-[480px] rounded-xl rounded-tl-xs bg-gray-100 px-4 py-3 dark:bg-white/5">
                                    <!-- Typing indicator -->
                                    <div v-if="msg.isTyping && !msg.displayContent"
                                        class="flex items-center gap-1 py-2">
                                        <div class="flex space-x-1">
                                            <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                                                style="animation-delay: 0ms"></div>
                                            <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                                                style="animation-delay: 150ms"></div>
                                            <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                                                style="animation-delay: 300ms"></div>
                                        </div>
                                    </div>

                                    <!-- Typed content -->
                                    <div v-if="msg.displayContent"
                                        class="text-sm leading-5 text-gray-800 dark:text-white/90">
                                        <span v-html="formatMessage(msg.displayContent)"></span>
                                        <span v-if="msg.isTyping"
                                            class="inline-block w-2 h-5 bg-gray-600 dark:bg-gray-300 ml-1 animate-pulse"></span>
                                    </div>
                                </div>

                                <!-- Copy button - only show when message is complete -->
                                <div v-if="!msg.isTyping && msg.displayContent" class="mt-3">
                                    <button @click="copyToClipboard(msg.content, index)"
                                        class="flex h-8 items-center gap-1 rounded-full border border-gray-100 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:text-gray-500 dark:border-white/5 dark:bg-gray-900 dark:text-gray-400 dark:hover:text-white/90">
                                        <svg v-if="copiedMessageId !== index" xmlns="http://www.w3.org/2000/svg"
                                            width="20" height="20" viewBox="0 0 20 20" fill="none">
                                            <path
                                                d="M14.1567 14.1628H7.08803C6.39768 14.1628 5.83803 13.6031 5.83803 12.9128V5.8441M14.1567 14.1628L14.1567 15.416C14.1567 16.1064 13.5971 16.666 12.9067 16.666H4.58478C3.89442 16.666 3.33478 16.1064 3.33478 15.416V7.0941C3.33478 6.40374 3.89442 5.8441 4.58478 5.8441H5.83803M14.1567 14.1628H15.4152C16.1056 14.1628 16.6652 13.6031 16.6652 12.9128L16.6652 4.58392C16.6652 3.89357 16.1056 3.33392 15.4152 3.33392H7.08803C6.39768 3.33392 5.83803 3.89357 5.83803 4.58392V5.8441"
                                                stroke="currentColor" stroke-width="1.5" stroke-linecap="round"
                                                stroke-linejoin="round"></path>
                                        </svg>
                                        <svg v-if="copiedMessageId === index" xmlns="http://www.w3.org/2000/svg"
                                            width="20" height="20" viewBox="0 0 20 20" fill="none">
                                            <path d="M16.6663 5L7.49967 14.1667L3.33301 10" stroke="currentColor"
                                                stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                                            </path>
                                        </svg>
                                        <span>{{ copiedMessageId === index ? 'Copied' : 'Copy' }}</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Loading indicator when generating response -->
                    <div v-if="isGeneratingResponse" class="flex justify-start">
                        <div
                            class="shadow-theme-xs max-w-[480px] rounded-xl rounded-tl-xs bg-gray-100 px-4 py-3 dark:bg-white/5">
                            <div class="flex items-center gap-2 py-2">
                                <div class="flex space-x-1">
                                    <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                                        style="animation-delay: 0ms"></div>
                                    <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                                        style="animation-delay: 150ms"></div>
                                    <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                                        style="animation-delay: 300ms"></div>
                                </div>
                                <span class="text-xs text-gray-500 dark:text-gray-400">AI đang suy nghĩ...</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Fixed Input Wrapper -->
                <div
                    class="fixed bottom-5 left-1/2 z-20 w-full -translate-x-1/2 transform px-4 sm:px-6 lg:bottom-10 lg:px-8">
                    <!-- Container with max width -->
                    <div
                        class="mx-auto w-full max-w-[720px] rounded-2xl border border-gray-200 bg-white p-5 shadow-xs dark:border-gray-800 dark:bg-gray-800">
                        <!-- Textarea -->
                        <textarea v-model="message" placeholder="Type your prompt here..."
                            class="h-20 w-full resize-none border-none bg-transparent p-0 font-normal text-gray-800 outline-none placeholder:text-gray-400 focus:ring-0 dark:text-white"></textarea>

                        <!-- Bottom Section -->
                        <div class="flex items-center justify-between pt-2">
                            <button @click="handleAttach"
                                class="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                                <!-- Attach Icon -->
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none">
                                    <path
                                        d="M14.4194 11.7679L15.4506 10.7367C17.1591 9.02811 17.1591 6.25802 15.4506 4.54947C13.742 2.84093 10.9719 2.84093 9.2634 4.54947L8.2322 5.58067M11.77 14.4172L10.7365 15.4507C9.02799 17.1592 6.2579 17.1592 4.54935 15.4507C2.84081 13.7422 2.84081 10.9721 4.54935 9.26352L5.58285 8.23002M11.7677 8.23232L8.2322 11.7679"
                                        stroke="currentColor" stroke-width="1.5" stroke-linecap="round"
                                        stroke-linejoin="round"></path>
                                </svg>
                                Attach
                            </button>

                            <!-- Send Button -->
                            <button @click="sendMessage"
                                class="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-gray-900 text-white transition hover:bg-gray-800 dark:bg-white/90 dark:text-gray-800 dark:hover:bg-gray-900 dark:hover:text-white/90">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none">
                                    <path d="M9.99674 3.33252L9.99675 16.667M5 8.32918L9.99984 3.33252L15 8.32918"
                                        stroke="currentColor" stroke-width="1.5" stroke-linecap="round"
                                        stroke-linejoin="round"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Backdrop -->
        <div v-show="isSidebarOpen" @click="isSidebarOpen = false"
            class="fixed inset-0 z-[99999] bg-black/50 xl:hidden dark:bg-black/80">
            <div class="absolute top-4 right-[300px]">
                <button
                    class="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-gray-800 transition hover:bg-gray-100 dark:bg-gray-800 dark:text-white/90 dark:hover:bg-white/3 hover:dark:text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M6.75104 17.249L17.249 6.75111M6.75104 6.75098L17.249 17.2489" stroke="currentColor"
                            stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                    </svg>
                </button>
            </div>
        </div>

        <!-- Sidebar -->
        <aside
            :class="isSidebarOpen ? 'flex fixed xl:static top-0 right-0 z-999999 h-screen bg-white dark:bg-gray-900' : 'hidden xl:flex'"
            class="z-50 w-[280px] flex-col border-l border-gray-200 bg-white p-6 ease-in-out dark:border-gray-800 dark:bg-gray-900">
            <button @click="createNewChat"
                class="bg-brand-500 hover:bg-brand-600 flex w-full items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-medium text-white transition">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M5 10.0002H15.0006M10.0002 5V15.0006" stroke="white" stroke-width="1.5"
                        stroke-linecap="round" stroke-linejoin="round"></path>
                </svg>
                New Chat
            </button>

            <div class="mt-5">
                <form @submit.prevent="searchChats">
                    <div class="relative">
                        <span class="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2">
                            <svg class="fill-gray-500 dark:fill-gray-400" width="20" height="20" viewBox="0 0 20 20"
                                fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                    d="M3.04199 9.37381C3.04199 5.87712 5.87735 3.04218 9.37533 3.04218C12.8733 3.04218 15.7087 5.87712 15.7087 9.37381C15.7087 12.8705 12.8733 15.7055 9.37533 15.7055C5.87735 15.7055 3.04199 12.8705 3.04199 9.37381ZM9.37533 1.54218C5.04926 1.54218 1.54199 5.04835 1.54199 9.37381C1.54199 13.6993 5.04926 17.2055 9.37533 17.2055C11.2676 17.2055 13.0032 16.5346 14.3572 15.4178L17.1773 18.2381C17.4702 18.531 17.945 18.5311 18.2379 18.2382C18.5308 17.9453 18.5309 17.4704 18.238 17.1775L15.4182 14.3575C16.5367 13.0035 17.2087 11.2671 17.2087 9.37381C17.2087 5.04835 13.7014 1.54218 9.37533 1.54218Z"
                                    fill=""></path>
                            </svg>
                        </span>
                        <input type="text" v-model="searchQuery" placeholder="Search..."
                            class="dark:bg-dark-900 shadow-theme-xs focus:border-brand-300 focus:ring-brand-500/10 dark:focus:border-brand-800 h-11 w-full rounded-lg border border-gray-300 bg-transparent py-2.5 pr-3.5 pl-[42px] text-sm text-gray-800 placeholder:text-gray-400 focus:ring-3 focus:outline-hidden dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30">
                    </div>
                </form>
            </div>

            <!-- Chat Items -->
            <div class="custom-scrollbar mt-6 h-full flex-1 space-y-3 overflow-y-auto text-sm">
                <!-- Today Section -->
                <div>
                    <p class="mb-3 pl-3 text-xs text-gray-400 uppercase">Today</p>
                    <ul class="space-y-1">
                        <li v-for="chat in todayChats" :key="chat.id"
                            class="group relative rounded-full px-3 py-1.5 hover:bg-gray-50 dark:hover:bg-gray-950">
                            <div class="flex cursor-pointer items-center justify-between">
                                <a href="#" @click.prevent="selectChat(chat)"
                                    class="block truncate text-sm text-gray-700 dark:text-gray-400">
                                    {{ chat.title }}
                                </a>
                                <!-- 3-dot menu button -->
                                <div class="relative">
                                    <button @click="toggleChatMenu(chat.id)"
                                        class="invisible ml-2 rounded-full p-1 text-gray-700 group-hover:visible hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"
                                            viewBox="0 0 18 18" fill="none">
                                            <path d="M4.5 9.00384L4.5 8.99634M13.5 9.00384V8.99634M9 9.00384V8.99634"
                                                stroke="currentColor" stroke-width="3" stroke-linecap="round"
                                                stroke-linejoin="round"></path>
                                        </svg>
                                    </button>

                                    <!-- Dropdown menu -->
                                    <div v-show="openChatMenuId === chat.id"
                                        class="absolute right-0 z-20 mt-1 w-32 rounded-lg border border-gray-200 bg-white p-1 shadow-xs dark:border-gray-800 dark:bg-gray-900">
                                        <ul class="text-sm text-gray-700 dark:text-gray-400">
                                            <li>
                                                <button @click="renameChat(chat)"
                                                    class="block w-full rounded-md px-3 py-1.5 text-left hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-gray-800 dark:hover:text-white/90">
                                                    Rename
                                                </button>
                                            </li>
                                            <li>
                                                <button @click="deleteChat(chat)"
                                                    class="block w-full rounded-md px-3 py-1.5 text-left hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-gray-800 dark:hover:text-white/90">
                                                    Delete
                                                </button>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>

                <!-- Yesterday Section -->
                <div class="relative">
                    <p class="mb-3 pl-3 text-xs text-gray-400 uppercase">Yesterday</p>
                    <ul class="space-y-1">
                        <li v-for="chat in yesterdayChats" :key="chat.id"
                            class="group relative rounded-full px-3 py-1.5 hover:bg-gray-50 dark:hover:bg-gray-950">
                            <div class="flex cursor-pointer items-center justify-between">
                                <a href="#" @click.prevent="selectChat(chat)"
                                    class="block truncate text-sm text-gray-700 dark:text-gray-400">
                                    {{ chat.title }}
                                </a>
                                <ChatDropdown :chat="chat" @rename="renameChat" @delete="deleteChat" />
                            </div>
                        </li>
                    </ul>
                    <div v-if="!showMore"
                        class="pointer-events-none absolute bottom-0 left-0 z-10 h-8 w-full bg-gradient-to-t from-white to-transparent dark:from-gray-900">
                    </div>
                </div>

                <!-- Show More Content -->
                <div v-show="showMore">
                    <div class="relative pl-3">
                        <p class="mb-3 text-xs text-gray-400 uppercase">Last Week</p>
                        <ul class="space-y-1">
                            <li v-for="chat in lastWeekChats" :key="chat.id"
                                class="group relative rounded-full px-3 py-1.5 hover:bg-gray-50 dark:hover:bg-gray-950">
                                <div class="flex cursor-pointer items-center justify-between">
                                    <a href="#" @click.prevent="selectChat(chat)"
                                        class="block truncate text-sm text-gray-700 dark:text-gray-400">
                                        {{ chat.title }}
                                    </a>
                                    <ChatDropdown :chat="chat" @rename="renameChat" @delete="deleteChat" />
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                <!-- Show more toggle -->
                <div class="mt-4 pl-3">
                    <button @click="showMore = !showMore"
                        class="text-primary-500 flex w-full items-center justify-between text-xs font-medium text-gray-400">
                        <span>{{ showMore ? 'Show less...' : 'Show more...' }}</span>
                        <svg :class="{ 'rotate-180': showMore }" class="ml-2 transition-transform"
                            xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M3.83331 6.41669L7.99998 10.5834L12.1666 6.41669" stroke="currentColor"
                                stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"></path>
                        </svg>
                    </button>
                </div>
            </div>
        </aside>
    </div>
</template>

<script setup>
import { ref, nextTick } from 'vue'

// Reactive data
const isSidebarOpen = ref(false)
const copied = ref(false)
const showMore = ref(false)
const message = ref('')
const searchQuery = ref('')
const openChatMenuId = ref(null)
const copiedMessageId = ref(null)
const isGeneratingResponse = ref(false)
const chatContainer = ref(null)

// Chat messages array
const messages = ref([
    {
        type: 'user',
        content: 'Can you generate some random, creative, and engaging placeholder text for me? It doesn\'t need to follow any specific structure—just something fun or interesting to fill space temporarily.'
    },
    {
        type: 'ai',
        content: 'Đây là một đoạn văn bản mẫu thú vị và sáng tạo. Tôi có thể tạo ra nhiều nội dung khác nhau tùy theo yêu cầu của bạn.\n\nVí dụ như: các câu chuyện ngắn, mô tả sản phẩm, nội dung marketing, hay chỉ đơn giản là placeholder text để test giao diện.',
        displayContent: '',
        isTyping: false
    },
    {
        type: 'user',
        content: 'I\'m looking for a block of random, imaginative text—something quirky or unexpected to use as placeholder content.'
    },
    {
        type: 'ai',
        content: 'Trong một thế giới nơi những chiếc máy tính có thể mơ mộng, có một con robot nhỏ tên là Pixel. Mỗi sáng, Pixel thức dậy và nhảy múa trong khu vườn số liệu, nơi những cây thông tin mọc cao vút và những bông hoa algorithm nở rộ.\n\nCâu chuyện này có thể là một placeholder text tuyệt vời cho các dự án sáng tạo của bạn!',
        displayContent: '',
        isTyping: false
    }
])

// Predefined responses for static chat
const staticResponses = [
    'Xin chào! Tôi là AI assistant, tôi có thể giúp gì cho bạn hôm nay? Hãy đặt câu hỏi hoặc yêu cầu hỗ trợ bất kỳ điều gì bạn cần.',

    'Đây là một câu trả lời mẫu với hiệu ứng typing rất thú vị. Văn bản sẽ xuất hiện từ từ, tạo cảm giác như AI đang thực sự "gõ" phản hồi.\n\nBạn có thể thấy hiệu ứng này hoạt động rất mượt mà và tự nhiên, giống như trải nghiệm chat với Claude.',

    'Tôi có thể giúp bạn với nhiều tác vụ khác nhau như:\n\n• Viết nội dung sáng tạo\n• Giải thích khái niệm phức tạp\n• Hỗ trợ lập trình và code\n• Dịch thuật đa ngôn ngữ\n• Phân tích và tóm tắt thông tin\n\nHãy thử đặt một câu hỏi cụ thể nhé!',

    'Điều thú vị về hiệu ứng typing này là nó tạo ra cảm giác tương tác tự nhiên hơn. Người dùng có thể theo dõi từng từ xuất hiện, tạo cảm giác như đang có một cuộc trò chuyện thực sự.\n\nĐây là cách mà nhiều AI chatbot hiện đại hoạt động để cải thiện trải nghiệm người dùng.',

    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.\n\nNhưng thay vì dùng Lorem ipsum, tôi có thể tạo nội dung Tiếng Việt thú vị và có ý nghĩa hơn nhiều!',
]

// Mock data - thay thế bằng data thực từ API/store
const todayChats = ref([
    { id: 1, title: 'Write a follow-up email to a clien' },
    { id: 2, title: 'Generate responsive login form layout' },
    { id: 3, title: 'Create a warning state modal' },
    { id: 4, title: 'Suggest color palette for dark theme' }
])

const yesterdayChats = ref([
    { id: 5, title: 'Improve login page accessibility' },
    { id: 6, title: 'Create a warning state modal with animation' },
    { id: 7, title: 'Add password visibility toggle' },
    { id: 8, title: 'Write validation logic for login form...' },
    { id: 9, title: 'Fix mobile responsiveness of login UI...' }
])

const lastWeekChats = ref([
    { id: 10, title: 'Improve login page accessi...' },
    { id: 11, title: 'Improve login page accessi...' }
])

// Methods
const copyToClipboard = async (text, messageIndex = null) => {
    try {
        await navigator.clipboard.writeText(text)
        if (messageIndex !== null) {
            copiedMessageId.value = messageIndex
            setTimeout(() => {
                copiedMessageId.value = null
            }, 2000)
        } else {
            copied.value = true
            setTimeout(() => {
                copied.value = false
            }, 2000)
        }
    } catch (err) {
        console.error('Failed to copy text: ', err)
    }
}

const scrollToBottom = () => {
    nextTick(() => {
        if (chatContainer.value) {
            chatContainer.value.scrollTop = chatContainer.value.scrollHeight
        }
    })
}

const typewriterEffect = async (message, speed = 30) => {
    const content = message.content
    message.displayContent = ''
    message.isTyping = true

    // Delay before starting to type (simulate thinking time)
    await new Promise(resolve => setTimeout(resolve, 500))

    for (let i = 0; i <= content.length; i++) {
        message.displayContent = content.slice(0, i)
        scrollToBottom()

        // Variable speed for more natural typing
        const currentSpeed = content[i] === '\n' ? speed * 3 :
            content[i] === '.' ? speed * 2 :
                content[i] === ',' ? speed * 1.5 : speed

        await new Promise(resolve => setTimeout(resolve, currentSpeed))
    }

    message.isTyping = false
    scrollToBottom()
}

const sendMessage = async () => {
    if (!message.value.trim()) return

    // Add user message
    const userMessage = {
        type: 'user',
        content: message.value.trim()
    }
    messages.value.push(userMessage)

    // Clear input
    const currentMessage = message.value.trim()
    message.value = ''

    // Scroll to bottom
    scrollToBottom()

    // Show generating response indicator
    isGeneratingResponse.value = true

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000))

    // Hide generating response indicator
    isGeneratingResponse.value = false

    // Get random response
    const randomResponse = staticResponses[Math.floor(Math.random() * staticResponses.length)]

    // Add AI response
    const aiMessage = {
        type: 'ai',
        content: randomResponse,
        displayContent: '',
        isTyping: false
    }

    messages.value.push(aiMessage)
    scrollToBottom()

    // Start typewriter effect
    await typewriterEffect(aiMessage)
}

const formatMessage = (content) => {
    // Convert line breaks to <br> tags and handle basic formatting
    return content
        .replace(/\n/g, '<br>')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/`(.*?)`/g, '<code class="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-xs">$1</code>')
}

const handleAttach = () => {
    // Xử lý đính kèm file
    console.log('Attach file clicked')
}

// Initialize typing animation for existing messages
const initializeExistingMessages = async () => {
    for (let i = 0; i < messages.value.length; i++) {
        const msg = messages.value[i]
        if (msg.type === 'ai' && !msg.displayContent) {
            await new Promise(resolve => setTimeout(resolve, 1000))
            await typewriterEffect(msg, 20) // Faster for demo
        }
    }
}

// Auto-initialize existing messages on mount
setTimeout(() => {
    initializeExistingMessages()
}, 500)

const createNewChat = () => {
    // Tạo cuộc trò chuyện mới
    console.log('Creating new chat')
}

const searchChats = () => {
    // Tìm kiếm cuộc trò chuyện
    console.log('Searching chats:', searchQuery.value)
}

const selectChat = (chat) => {
    // Chọn cuộc trò chuyện
    console.log('Selected chat:', chat)
    isSidebarOpen.value = false // Đóng sidebar trên mobile
    openChatMenuId.value = null // Đóng menu dropdown
}

const toggleChatMenu = (chatId) => {
    openChatMenuId.value = openChatMenuId.value === chatId ? null : chatId
}

const renameChat = (chat) => {
    // Đổi tên cuộc trò chuyện
    console.log('Renaming chat:', chat)
    openChatMenuId.value = null
}

const deleteChat = (chat) => {
    // Xóa cuộc trò chuyện
    console.log('Deleting chat:', chat)
    openChatMenuId.value = null
}
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
    width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
    background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
    background: #d1d5db;
    border-radius: 3px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: #9ca3af;
}

.dark .custom-scrollbar::-webkit-scrollbar-thumb {
    background: #4b5563;
}

.dark .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: #6b7280;
}

.shadow-theme-xs {
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}

/* Typing cursor animation */
@keyframes blink {

    0%,
    50% {
        opacity: 1;
    }

    51%,
    100% {
        opacity: 0;
    }
}

.animate-blink {
    animation: blink 1s infinite;
}

/* Smooth message entrance */
.message-enter-active {
    transition: all 0.3s ease-out;
}

.message-enter-from {
    opacity: 0;
    transform: translateY(10px);
}

/* Bounce animation for typing dots */
@keyframes bounce {

    0%,
    80%,
    100% {
        transform: translateY(0);
    }

    40% {
        transform: translateY(-8px);
    }
}

.animate-bounce {
    animation: bounce 1s infinite;
}

/* Custom scrollbar behavior */
.custom-scrollbar {
    scroll-behavior: smooth;
}

/* Message formatting */
.message-content p:last-child {
    margin-bottom: 0;
}

.message-content code {
    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
}
</style>