<template>
    <section class="w-full my-5">

        <div class="rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-white/[0.03]">
            <!-- Header -->
            <div
                class="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-200 px-4 py-3 gap-3 sm:gap-0 dark:border-gray-800">
                <div class="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                        class="lucide lucide-message-circle-code-icon lucide-message-circle-code">
                        <path d="m10 9-3 3 3 3" />
                        <path d="m14 15 3-3-3-3" />
                        <path
                            d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719" />
                    </svg>
                    <span class="text-sm">#216x10-17566301</span>
                </div>
                <div class="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                        class="lucide lucide-clock-fading-icon lucide-clock-fading">
                        <path d="M12 2a10 10 0 0 1 7.38 16.75" />
                        <path d="M12 6v6l4 2" />
                        <path d="M2.5 8.875a10 10 0 0 0-.5 3" />
                        <path d="M2.83 16a10 10 0 0 0 2.43 3.4" />
                        <path d="M4.636 5.235a10 10 0 0 1 .891-.857" />
                        <path d="M8.644 21.42a10 10 0 0 0 7.631-.38" />
                    </svg>
                    <span class="text-sm">15:48:20 31/8/2025 ~ <span class="text-red-500">18s</span></span>
                </div>
            </div>
            <div class="flex justify-end px-3 py-3 gap-2">
                <div class="max-w-[480px] rounded-xl rounded-tr-sm bg-primary text-white px-4 py-3 ">
                    <p class="mb-5 text-xs leading-5 ">
                        Lorem ipsum dolor sit amet, consectetur adipiscing
                        elit. Vivamus et varius tortor. Aenean dui magna,
                        vehicula in lacinia non, euismod sed odio. Aliquam
                        erat volutpat.
                    </p>
                    <p class="mb-5 text-xs leading-5">
                        Integer iaculis eu tellus vel tincidunt. Sed sed
                        dictum orci, in pretium erat. Proin ut mi a arcu
                        mollis hendrerit. Ut id est finibus, egestas tellus
                        ac, pharetra ante.
                    </p>
                </div>
            </div>
            <div class="flex gap-3 p-3">
                <div
                    class="w-full rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-white/[0.03]">
                    <!-- Header -->
                    <div
                        class="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-200 px-4 py-3 gap-3 sm:gap-0 dark:border-gray-800">
                        <div class="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round" class="lucide lucide-file-text-icon lucide-file-text">
                                <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
                                <path d="M14 2v4a2 2 0 0 0 2 2h4" />
                                <path d="M10 9H8" />
                                <path d="M16 13H8" />
                                <path d="M16 17H8" />
                            </svg>
                            <span class="text-sm">Topic : Giúp người dùng tra cứu các thông tin liên quan đến
                                sản phẩm</span>
                        </div>
                    </div>
                    <!-- Topic Content -->
                    <div class="overflow-y-auto text-xs p-4 max-h-[40vh] custom-scrollbar">
                        <p ref="topicContentRef" class="topic-content text-pretty">
                            Hướng dẫn: Nếu khách hàng muốn mua hàng, bước đầu tiên bạn cần xác thực thông tin khách
                            hàng trước. Hỏi khách hàng về họ và tên hoặc tên doanh nghiệp, và số điện thoại của họ.
                            Sử dụng thông tin này để kiểm tra xem khách hàng là mới hay cũ trong hệ thống (nội dung
                            phản hồi luôn ngắn gọn súc tích vơi thái độ thân thiện); Sau bước 1 Nếu khách hàng không
                            có trong hệ thống, bạn cần luôn yêu cầu họ cung cấp địa chỉ email và số điện thoại để
                            tạo mới hoặc lấy thông tin khách hàng và luôn trả cho họ mã khách hàng của mình (nội
                            dung phản hồi luôn ngắn gọn súc tích vơi thái độ thân thiện); Ngoài ra topic hỗ trợ
                            người dùng kiểm tra thông tin cá nhân bằng số điện thoại; Nếu khách hàng muốn mua hàng,
                            bước đầu tiên bạn cần xác thực thông tin khách hàng trước. Hỏi khách hàng về họ và tên
                            hoặc tên doanh nghiệp, và số điện thoại của họ. Sử dụng thông tin này để kiểm tra xem
                            khách hàng là mới hay cũ trong hệ thống (nội dung phản hồi luôn ngắn gọn súc tích vơi
                            thái độ thân thiện); Sau bước 1 Nếu khách hàng không có trong hệ thống, bạn cần luôn yêu
                            cầu họ cung cấp địa chỉ email và số điện thoại để tạo mới hoặc lấy thông tin khách hàng
                            và luôn trả cho họ mã khách hàng của mình (nội dung phản hồi luôn ngắn gọn súc tích vơi
                            thái độ thân thiện); Ngoài ra topic hỗ trợ người dùng kiểm tra thông tin cá nhân bằng số
                            điện thoại
                        </p>
                    </div>
                </div>
            </div>
            <div class="flex justify-start px-3 pb-3 gap-2">
                <div class="w-10 h-10 rounded-full overflow-hidden relative border-2 border-white/80">
                    <img src="/images/avatars/chatbot.png" alt="Avatar" class="w-full h-full object-cover" />
                </div>
                <div
                    class="shadow-theme-xs max-w-[480px] rounded-xl rounded-tl-xs bg-gray-100 px-4 py-3 dark:bg-white/5">
                    <p class="mb-5 text-xs leading-5 text-gray-800 dark:text-white/90">
                        Lorem ipsum dolor sit amet, consectetur adipiscing
                        elit. Vivamus et varius tortor. Aenean dui magna,
                        vehicula in lacinia non, euismod sed odio. Aliquam
                        erat volutpat.
                    </p>
                    <p class="mb-5 text-xs leading-5 text-gray-800 dark:text-white/90">
                        Integer iaculis eu tellus vel tincidunt. Sed sed
                        dictum orci, in pretium erat. Proin ut mi a arcu
                        mollis hendrerit. Ut id est finibus, egestas tellus
                        ac, pharetra ante.
                    </p>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
const topicContentRef = ref<HTMLElement>()
let typewriterInterval: ReturnType<typeof setInterval> | null = null
const startTypewriter = () => {
    if (!topicContentRef.value) return

    const fullText = topicContentRef.value.textContent || ''
    let currentText = ''
    let charIndex = 0

    topicContentRef.value.innerHTML = '<span class="cursor">|</span>'

    typewriterInterval = setInterval(() => {
        if (charIndex < fullText.length) {
            currentText += fullText[charIndex]
            topicContentRef.value!.innerHTML = currentText + '<span class="cursor">|</span>'
            charIndex++
        } else {
            topicContentRef.value!.innerHTML = currentText
            if (typewriterInterval) {
                clearInterval(typewriterInterval)
                typewriterInterval = null
            }
        }
    }, 10)
}
onMounted(() => {
    setTimeout(startTypewriter, 500)
})
onUnmounted(() => {
    if (typewriterInterval) {
        clearInterval(typewriterInterval)
    }
})
</script>

<style scoped>
.topic-content {
    min-height: 1rem;
    line-height: 1.5;
}

.cursor {
    color: #3b82f6;
    animation: blink 1s infinite;
}

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
</style>