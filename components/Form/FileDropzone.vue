<template>
    <div class="space-y-6 border-t border-gray-100  dark:border-gray-800">
        <!-- Overlay khi drag file -->
        <div v-if="isDragOver"
            class="fixed inset-0 backdrop-blur-xs flex items-center justify-center z-50 pointer-events-none">
            <div class="bg-white dark:bg-gray-800 rounded-xl p-8 border-2 border-dashed border-brand-500 shadow-xl">
                <div class="flex flex-col items-center text-center">
                    <div class="w-16 h-16 bg-brand-500 rounded-full flex items-center justify-center mb-4">
                        <svg class="w-8 h-8 text-white fill-current" viewBox="0 0 29 28">
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M14.5019 3.91699C14.2852 3.91699 14.0899 4.00891 13.953 4.15589L8.57363 9.53186C8.28065 9.82466 8.2805 10.2995 8.5733 10.5925C8.8661 10.8855 9.34097 10.8857 9.63396 10.5929L13.7519 6.47752V18.667C13.7519 19.0812 14.0877 19.417 14.5019 19.417C14.9161 19.417 15.2519 19.0812 15.2519 18.667V6.48234L19.3653 10.5929C19.6583 10.8857 20.1332 10.8855 20.426 10.5925C20.7188 10.2995 20.7186 9.82463 20.4256 9.53184L15.0838 4.19378C14.9463 4.02488 14.7367 3.91699 14.5019 3.91699ZM5.91626 18.667C5.91626 18.2528 5.58047 17.917 5.16626 17.917C4.75205 17.917 4.41626 18.2528 4.41626 18.667V21.8337C4.41626 23.0763 5.42362 24.0837 6.66626 24.0837H22.3339C23.5766 24.0837 24.5839 23.0763 24.5839 21.8337V18.667C24.5839 18.2528 24.2482 17.917 23.8339 17.917C23.4197 17.917 23.0839 18.2528 23.0839 18.667V21.8337C23.0839 22.2479 22.7482 22.5837 22.3339 22.5837H6.66626C6.25205 22.5837 5.91626 22.2479 5.91626 21.8337V18.667Z" />
                        </svg>
                    </div>
                    <h3 class="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                        Drop files here
                    </h3>
                    <p class="text-gray-600 dark:text-gray-400">
                        Release to upload your files
                    </p>
                </div>
            </div>
        </div>

        <div ref="dropzoneRef" @click="openFileDialog" @dragover.prevent="onDragOver" @dragleave.prevent="onDragLeave"
            @drop.prevent="onDrop"
            class="dropzone hover:border-brand-500! dark:hover:border-brand-500! rounded-xl border border-dashed! border-gray-300! bg-gray-50 p-7 lg:p-10 dark:border-gray-700! dark:bg-gray-900 dz-clickable transition-all duration-200"
            :class="{
                'border-brand-500! bg-brand-50 dark:bg-brand-900/20 scale-[1.02] shadow-lg': isDragOver,
                'hover:scale-[1.01] hover:shadow-md': !isDragOver
            }">
            <div class="dz-message m-0!">
                <div class="mb-[22px] flex justify-center">
                    <div class="flex h-[68px] w-[68px] items-center justify-center rounded-full bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-gray-400 transition-all duration-200"
                        :class="{ 'bg-brand-500 text-white transform scale-110': isDragOver }">
                        <svg class="fill-current transition-all duration-200" width="29" height="28" viewBox="0 0 29 28"
                            fill="none" xmlns="http://www.w3.org/2000/svg" :class="{ 'animate-bounce': isDragOver }">
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M14.5019 3.91699C14.2852 3.91699 14.0899 4.00891 13.953 4.15589L8.57363 9.53186C8.28065 9.82466 8.2805 10.2995 8.5733 10.5925C8.8661 10.8855 9.34097 10.8857 9.63396 10.5929L13.7519 6.47752V18.667C13.7519 19.0812 14.0877 19.417 14.5019 19.417C14.9161 19.417 15.2519 19.0812 15.2519 18.667V6.48234L19.3653 10.5929C19.6583 10.8857 20.1332 10.8855 20.426 10.5925C20.7188 10.2995 20.7186 9.82463 20.4256 9.53184L15.0838 4.19378C14.9463 4.02488 14.7367 3.91699 14.5019 3.91699ZM5.91626 18.667C5.91626 18.2528 5.58047 17.917 5.16626 17.917C4.75205 17.917 4.41626 18.2528 4.41626 18.667V21.8337C4.41626 23.0763 5.42362 24.0837 6.66626 24.0837H22.3339C23.5766 24.0837 24.5839 23.0763 24.5839 21.8337V18.667C24.5839 18.2528 24.2482 17.917 23.8339 17.917C23.4197 17.917 23.0839 18.2528 23.0839 18.667V21.8337C23.0839 22.2479 22.7482 22.5837 22.3339 22.5837H6.66626C6.25205 22.5837 5.91626 22.2479 5.91626 21.8337V18.667Z"
                                fill=""></path>
                        </svg>
                    </div>
                </div>

                <h4 class="text-theme-xl mb-3 font-semibold text-gray-800 dark:text-white/90 transition-colors duration-200"
                    :class="{ 'text-brand-600 dark:text-brand-400': isDragOver }">
                    {{ isDragOver ? 'Drop your files here' : title }}
                </h4>
                <span
                    class="mx-auto mb-5 block w-full max-w-[290px] text-sm text-gray-700 dark:text-gray-400 transition-colors duration-200"
                    :class="{ 'text-brand-600 dark:text-brand-400': isDragOver }">
                    {{ isDragOver ? 'Release to upload your files' : description }}
                </span>

                <span class="text-theme-sm text-brand-500 font-medium underline transition-all duration-200"
                    :class="{ 'text-brand-600 no-underline': isDragOver }">
                    {{ browseText }}
                </span>
            </div>
        </div>

        <!-- File input ẩn -->
        <input ref="fileInputRef" type="file" :multiple="multiple" :accept="accept" @change="onFileSelect"
            class="hidden" />

        <!-- Hiển thị file đã chọn -->
        <div v-if="selectedFiles.length > 0" class="space-y-2">
            <h5 class="font-medium text-gray-800 dark:text-white">Selected Files:</h5>
            <div class="space-y-2">
                <div v-for="(file, index) in selectedFiles" :key="index"
                    class="flex items-center justify-between bg-gray-100 dark:bg-gray-800 rounded-lg p-3 transition-all duration-200 hover:bg-gray-200 dark:hover:bg-gray-700">
                    <div class="flex items-center space-x-3">
                        <div class="w-8 h-8 bg-brand-500 rounded flex items-center justify-center">
                            <svg class="w-4 h-4 text-white fill-current" viewBox="0 0 20 20">
                                <path
                                    d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" />
                            </svg>
                        </div>
                        <div>
                            <p class="text-sm font-medium text-gray-800 dark:text-white">{{ file.name }}</p>
                            <p class="text-xs text-gray-500">{{ formatFileSize(file.size) }}</p>
                        </div>
                    </div>
                    <button @click="removeFile(index)"
                        class="text-red-500 hover:text-red-700 p-1 rounded transition-colors duration-200 hover:bg-red-50 dark:hover:bg-red-900/20"
                        :aria-label="`Remove ${file.name}`">
                        <svg class="w-4 h-4 fill-current" viewBox="0 0 20 20">
                            <path
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

// Props interface
interface Props {
    accept?: string
    multiple?: boolean
    maxFileSize?: number // in bytes
    title?: string
    description?: string
    browseText?: string
    enablePaste?: boolean
}

// Props với default values
const props = withDefaults(defineProps<Props>(), {
    accept: 'image/*',
    multiple: true,
    maxFileSize: 10 * 1024 * 1024, // 10MB
    title: 'Drag & Drop File Here',
    description: 'Drag and drop your PNG, JPG, WebP, SVG images here or browse',
    browseText: 'Browse File',
    enablePaste: true
})

// Emits
const emit = defineEmits<{
    filesSelected: [files: File[]]
    fileAdded: [file: File]
    fileRemoved: [file: File, index: number]
    error: [message: string]
}>()

// Refs
const dropzoneRef = ref<HTMLDivElement>()
const fileInputRef = ref<HTMLInputElement>()
const selectedFiles = ref<File[]>([])
const isDragOver = ref(false)

// Methods
const openFileDialog = () => {
    fileInputRef.value?.click()
}

const onDragOver = (event: DragEvent) => {
    event.preventDefault()
    isDragOver.value = true
}

const onDragLeave = (event: DragEvent) => {
    event.preventDefault()
    // Chỉ set false khi rời khỏi dropzone hoàn toàn
    if (!dropzoneRef.value?.contains(event.relatedTarget as Node)) {
        isDragOver.value = false
    }
}

const onDrop = (event: DragEvent) => {
    event.preventDefault()
    isDragOver.value = false

    const files = Array.from(event.dataTransfer?.files || [])
    handleFiles(files)
}

const onFileSelect = (event: Event) => {
    const target = event.target as HTMLInputElement
    const files = Array.from(target.files || [])
    handleFiles(files)

    // Reset input value để có thể chọn lại cùng file
    target.value = ''
}

const handleFiles = (files: File[]) => {
    const validFiles: File[] = []

    for (const file of files) {
        if (validateFile(file)) {
            validFiles.push(file)
        }
    }

    if (validFiles.length > 0) {
        if (props.multiple) {
            selectedFiles.value.push(...validFiles)
        } else {
            selectedFiles.value = [validFiles[0]]
        }

        emit('filesSelected', validFiles)
        validFiles.forEach(file => emit('fileAdded', file))
    }
}

const validateFile = (file: File): boolean => {
    // Kiểm tra kích thước file
    if (file.size > props.maxFileSize) {
        emit('error', `File "${file.name}" is too large. Maximum size is ${formatFileSize(props.maxFileSize)}.`)
        return false
    }

    // Kiểm tra định dạng file nếu có accept
    if (props.accept && props.accept !== '*') {
        const acceptedTypes = props.accept.split(',').map(type => type.trim())
        const isAccepted = acceptedTypes.some(type => {
            if (type.startsWith('.')) {
                // Extension check
                return file.name.toLowerCase().endsWith(type.toLowerCase())
            } else if (type.includes('/*')) {
                // MIME type wildcard check
                const baseType = type.split('/')[0]
                return file.type.startsWith(baseType + '/')
            } else {
                // Exact MIME type check
                return file.type === type
            }
        })

        if (!isAccepted) {
            emit('error', `File "${file.name}" is not an accepted file type. Accepted types: ${props.accept}`)
            return false
        }
    }

    return true
}

const removeFile = (index: number) => {
    const removedFile = selectedFiles.value[index]
    selectedFiles.value.splice(index, 1)
    emit('fileRemoved', removedFile, index)
}

const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

// Global drag events để detect drag trên toàn bộ window
const handleGlobalDragEnter = (e: DragEvent) => {
    e.preventDefault()
    if (e.dataTransfer?.types.includes('Files')) {
        isDragOver.value = true
    }
}

const handleGlobalDragOver = (e: DragEvent) => {
    e.preventDefault()
}

const handleGlobalDragLeave = (e: DragEvent) => {
    e.preventDefault()
    // Chỉ ẩn overlay khi drag ra khỏi window hoàn toàn
    if (!e.relatedTarget || (e.relatedTarget as Node).nodeType === Node.DOCUMENT_NODE) {
        isDragOver.value = false
    }
}

const handleGlobalDrop = (e: DragEvent) => {
    e.preventDefault()
    isDragOver.value = false

    // Nếu drop không phải trên dropzone thì không xử lý
    if (!dropzoneRef.value?.contains(e.target as Node)) {
        return
    }
}

// Paste functionality
const handlePaste = (event: ClipboardEvent) => {
    if (!props.enablePaste) return

    const items = event.clipboardData?.items
    if (!items) return

    const files: File[] = []

    for (let i = 0; i < items.length; i++) {
        const item = items[i]
        if (item.kind === 'file') {
            const file = item.getAsFile()
            if (file) {
                files.push(file)
            }
        }
    }

    if (files.length > 0) {
        event.preventDefault()
        handleFiles(files)
    }
}

// Lifecycle
onMounted(() => {
    if (props.enablePaste) {
        document.addEventListener('paste', handlePaste)
    }

    // Global drag events
    document.addEventListener('dragenter', handleGlobalDragEnter)
    document.addEventListener('dragover', handleGlobalDragOver)
    document.addEventListener('dragleave', handleGlobalDragLeave)
    document.addEventListener('drop', handleGlobalDrop)
})

onUnmounted(() => {
    if (props.enablePaste) {
        document.removeEventListener('paste', handlePaste)
    }

    // Cleanup global drag events
    document.removeEventListener('dragenter', handleGlobalDragEnter)
    document.removeEventListener('dragover', handleGlobalDragOver)
    document.removeEventListener('dragleave', handleGlobalDragLeave)
    document.removeEventListener('drop', handleGlobalDrop)
})

// Expose methods for parent component
defineExpose({
    clearFiles: () => {
        selectedFiles.value = []
    },
    getFiles: () => selectedFiles.value,
    addFiles: (files: File[]) => handleFiles(files)
})
</script>