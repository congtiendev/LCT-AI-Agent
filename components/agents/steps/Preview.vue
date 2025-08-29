<template>
    <section>
        <div class=" space-y-6 ">
            <div class="flex justify-start">
                <div class="w-full">
                    <div
                        class="rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-white/[0.03]">
                        <!-- Header -->
                        <div
                            class="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-200 px-4 py-3 gap-3 sm:gap-0 dark:border-gray-800">
                            <div class="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                                    <path
                                        d="M5.0625 5.99976L2.0625 9.00003L5.0625 12M12.9375 5.99976L15.9375 9.00003L12.9375 12M10.3329 2.99994L7.66626 14.9999"
                                        stroke="currentColor" stroke-width="1.5" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                </svg>
                                <span class="text-sm">Login form code</span>
                            </div>
                            <button @click="copyCode"
                                class="flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-950 dark:hover:text-white/90">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <path
                                        d="M11.3 11.3H5.7c-.6 0-1-.4-1-1V4.7M11.3 11.3v1c0 .6-.4 1-1 1H3.7c-.6 0-1-.4-1-1V5.7c0-.6.4-1 1-1h1M11.3 11.3h1c.6 0 1-.4 1-1V3.7c0-.6-.4-1-1-1H5.7c-.6 0-1 .4-1 1v1"
                                        stroke="currentColor" stroke-width="1.5" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                </svg>
                                {{ copyButtonText }}
                            </button>
                        </div>

                        <!-- Code Content -->
                        <div class="overflow-y-auto p-4 max-h-[40vh] custom-scrollbar">
                            <pre
                                class="text-xs sm:text-sm"><code class="language-html">{{ plainCodeContent }}</code></pre>
                        </div>
                    </div>

                    <div class="mt-3">
                        <p class="text-sm text-gray-500 dark:text-gray-400">
                            Here is the code for login form with google and github authentication as described.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <ChatBox v-if="showChat" :initial-x="400" :initial-y="200" :initial-width="350" :initial-height="550"
        :min-width="300" :min-height="200" :max-width="600" :max-height="800" @close="showChat = false" />
</template>

<script setup lang="ts">
// Reactive data
const showChat = ref(true)
const pageName = ref('Code Generator')
const userInput = ref('')
const copyButtonText = ref('Copy')

// Plain code content (không có HTML tags)
const plainCodeContent = ref(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Login Form</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      margin: 0;
    }
    .login-form {
      background: white;
      padding: 2rem;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }
  </style>
</head>
<body>
  <div class="login-form">
    <h2>Login</h2>
    <button>Login with Google</button>
    <button>Login with GitHub</button>
  </div>
</body>
</html>`)

// Methods
const copyCode = async () => {
    try {
        await navigator.clipboard.writeText(plainCodeContent.value)
        copyButtonText.value = 'Copied!'
        setTimeout(() => {
            copyButtonText.value = 'Copy'
        }, 2000)
    } catch (err) {
        console.error('Failed to copy:', err)
    }
}

const sendMessage = () => {
    if (userInput.value.trim()) {
        console.log('Sending message:', userInput.value)
        // Add your send message logic here
        userInput.value = ''
    }
}
</script>