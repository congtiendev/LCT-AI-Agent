<!-- components/auth/SignInForm.vue -->
<template>
    <!-- Form -->
    <div class="flex flex-col flex-1 w-full">
        <div class="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
            <div>
                <div class="mb-5 sm:mb-8">
                    <p class="text-sm text-center text-gray-100 dark:text-gray-400">
                        {{ $t('auth.subtitle') }}
                    </p>
                </div>
                <div>
                    <button @click="handleGoogleSignIn" :disabled="isLoading"
                        class="glass-social w-full inline-flex items-center justify-center gap-3 py-3 text-xs font-normal text-gray-100 transition-all duration-300 rounded-xl px-7  transform hover:-translate-y-1 disabled:opacity-50">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M18.7511 10.1944C18.7511 9.47495 18.6915 8.94995 18.5626 8.40552H10.1797V11.6527H15.1003C15.0011 12.4597 14.4654 13.675 13.2749 14.4916L13.2582 14.6003L15.9087 16.6126L16.0924 16.6305C17.7788 15.1041 18.7511 12.8583 18.7511 10.1944Z"
                                fill="#4285F4" />
                            <path
                                d="M10.1788 18.75C12.5895 18.75 14.6133 17.9722 16.0915 16.6305L13.274 14.4916C12.5201 15.0068 11.5081 15.3666 10.1788 15.3666C7.81773 15.3666 5.81379 13.8402 5.09944 11.7305L4.99473 11.7392L2.23868 13.8295L2.20264 13.9277C3.67087 16.786 6.68674 18.75 10.1788 18.75Z"
                                fill="#34A853" />
                            <path
                                d="M5.10014 11.7305C4.91165 11.186 4.80257 10.6027 4.80257 9.99992C4.80257 9.3971 4.91165 8.81379 5.09022 8.26935L5.08523 8.1534L2.29464 6.02954L2.20333 6.0721C1.5982 7.25823 1.25098 8.5902 1.25098 9.99992C1.25098 11.4096 1.5982 12.7415 2.20333 13.9277L5.10014 11.7305Z"
                                fill="#FBBC05" />
                            <path
                                d="M10.1789 4.63331C11.8554 4.63331 12.9864 5.34303 13.6312 5.93612L16.1511 3.525C14.6035 2.11528 12.5895 1.25 10.1789 1.25C6.68676 1.25 3.67088 3.21387 2.20264 6.07218L5.08953 8.26943C5.81381 6.15972 7.81776 4.63331 10.1789 4.63331Z"
                                fill="#EB4335" />
                        </svg>
                        {{ $t('auth.signInWith', { provider: 'Google' }) }}
                    </button>
                    <div class="flex py-3 sm:py-5 items-center justify-center">
                        <div class="w-full border-t border-gray-200/30 dark:border-gray-800/50"></div>
                        <span
                            class="glass-divider px-3 py-1 text-gray-400 bg-white/10 dark:bg-gray-900/10 backdrop-blur-sm rounded-full border border-white/20 dark:border-gray-700/30 sm:px-5 sm:py-2">{{
                                $t('common.or') }}</span>
                        <div class="w-full border-t border-gray-200/30 dark:border-gray-800/50"></div>
                    </div>
                    <form @submit.prevent="onSubmit">
                        <div class="space-y-5">
                            <!-- Email/Phone Input -->
                            <div>
                                <label class="mb-1.5 block text-sm font-medium text-gray-100 dark:text-gray-400">
                                    {{ $t('form.emailOrPhone') }}<span class="text-error-500">*</span>
                                </label>
                                <div class="relative">
                                    <input :type="inputType" id="email" name="email" v-model="signInForm.email"
                                        @input="onEmailInput" @blur="validateField('email')"
                                        :placeholder="$t('form.emailOrPhonePlaceholder')" :class="[
                                            'glass-input h-11 w-full rounded-xl border border-white/20 bg-white/5 backdrop-blur-lg px-4 py-2.5 text-sm text-gray-800 shadow-lg placeholder:text-gray-400/80 focus:border-brand-300/50 focus:outline-hidden focus:ring-3 focus:ring-brand-500/20 focus:bg-white/10 dark:border-gray-700/30 dark:bg-white/5 text-white dark:placeholder:text-white/50 dark:focus:border-brand-800/50 transition-all duration-300',
                                            hasFieldError('signIn', 'email') ? 'border-red-400/50 bg-red-500/5' : ''
                                        ]" />

                                    <!-- Input Type Indicator -->
                                    <div v-if="signInForm.email && inputTypeInfo"
                                        class="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center">
                                        <div :class="[
                                            'px-2 py-1 rounded-full text-xs font-medium',
                                            inputTypeInfo.valid
                                                ? 'bg-green-500/20 text-green-400 border border-green-400/30'
                                                : 'bg-orange-500/20 text-orange-400 border border-orange-400/30'
                                        ]">
                                            {{ inputTypeInfo.label }}
                                        </div>
                                    </div>
                                </div>

                                <!-- Field Error -->
                                <div v-if="getFieldError('signIn', 'email')" class="mt-1 text-sm text-red-400">
                                    {{ getFieldError('signIn', 'email') }}
                                </div>

                                <!-- Input Hint -->
                                <div v-if="signInForm.email && inputTypeInfo" class="mt-1 text-xs">
                                    <span v-if="inputTypeInfo.valid" class="text-green-400">
                                        ✓ {{ inputTypeInfo.message }}
                                    </span>
                                    <span v-else class="text-orange-400">
                                        {{ inputTypeInfo.message }}
                                    </span>
                                </div>
                            </div>

                            <!-- Password -->
                            <div>
                                <label class="mb-1.5 block text-sm font-medium text-gray-100 dark:text-gray-400">
                                    {{ $t('form.password') }}<span class="text-error-500">*</span>
                                </label>
                                <div class="relative">
                                    <input :type="showPassword ? 'text' : 'password'" v-model="signInForm.password"
                                        @input="onPasswordInput" @blur="validateField('password')"
                                        :placeholder="$t('form.passwordPlaceholder')" :class="[
                                            'glass-input h-11 w-full rounded-xl border border-white/20 bg-white/5 backdrop-blur-lg py-2.5 pl-4 pr-12 text-sm text-gray-800 shadow-lg placeholder:text-gray-400/80 focus:border-brand-300/50 focus:outline-hidden focus:ring-3 focus:ring-brand-500/20 focus:bg-white/10 dark:border-gray-700/30 dark:bg-white/5 text-white dark:placeholder:text-white/50 dark:focus:border-brand-800/50 transition-all duration-300',
                                            hasFieldError('signIn', 'password') ? 'border-red-400/50 bg-red-500/5' : ''
                                        ]" />
                                    <button @click="showPassword = !showPassword" type="button"
                                        class="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-full text-gray-400/80 hover:text-gray-600 hover:bg-white/10 dark:text-white/60 dark:hover:text-white/90 dark:hover:bg-white/5 transition-all duration-200 focus:outline-none">
                                        <svg v-if="!showPassword" width="18" height="18" viewBox="0 0 24 24" fill="none"
                                            stroke="currentColor" stroke-width="2">
                                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                            <circle cx="12" cy="12" r="3" />
                                        </svg>
                                        <svg v-else width="18" height="18" viewBox="0 0 24 24" fill="none"
                                            stroke="currentColor" stroke-width="2">
                                            <path d="m1 1 22 22" />
                                            <path
                                                d="m9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                                            <path d="m3 3 21 21" />
                                        </svg>
                                    </button>
                                </div>
                                <div v-if="getFieldError('signIn', 'password')" class="mt-1 text-sm text-red-400">
                                    {{ getFieldError('signIn', 'password') }}
                                </div>
                            </div>

                            <!-- Checkbox -->
                            <div class="flex items-center justify-between">
                                <NuxtLink to="/forgot-password"
                                    class="text-sm text-brand-500 hover:text-brand-600 dark:text-brand-400 transition-colors duration-200">
                                    {{ $t('auth.forgotPassword') }}
                                </NuxtLink>
                            </div>

                            <!-- Submit Button -->
                            <div>
                                <button type="submit" :disabled="isLoading || !canSubmit" :class="[
                                    'flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white transition rounded-lg shadow-theme-xs',
                                    isLoading || !canSubmit
                                        ? 'bg-gray-500/50 cursor-not-allowed opacity-50'
                                        : 'bg-brand-500 hover:bg-brand-600 glass-button'
                                ]">
                                    <svg v-if="isLoading" class="animate-spin -ml-1 mr-3 h-4 w-4 text-white"
                                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                            stroke-width="4"></circle>
                                        <path class="opacity-75" fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                                        </path>
                                    </svg>
                                    <span v-if="isLoading">{{ $t('auth.signingIn') }}</span>
                                    <span v-else>{{ $t('auth.signIn') }}</span>
                                </button>
                            </div>
                        </div>
                    </form>

                    <!-- Error Message -->
                    <div v-if="error"
                        class="mt-4 p-3 rounded-lg bg-red-500/10 border border-red-400/30 text-red-400 text-sm backdrop-blur-sm">
                        <div class="flex items-center">
                            <svg class="w-4 h-4 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                    clip-rule="evenodd" />
                            </svg>
                            {{ error }}
                        </div>
                    </div>

                    <!-- Demo Accounts Info -->
                    <div
                        class="mt-4 p-3 rounded-lg bg-blue-500/10 border border-blue-400/30 text-blue-300 text-xs backdrop-blur-sm">
                        <h4 class="font-medium mb-2 flex items-center">
                            <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd"
                                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                    clip-rule="evenodd" />
                            </svg>
                            {{ $t('auth.demoAccount') }}
                        </h4>
                        <div class="space-y-1 text-blue-200/80">
                            <p><strong>Admin:</strong> admin@example.com / 0987654321</p>
                            <p><strong>User:</strong> user@example.com / 0123456789</p>
                            <p><strong>{{ $t('auth.password') }}:</strong> 0123456789</p>
                        </div>
                    </div>

                    <div class="mt-5 flex items-center justify-center">
                        <p class="text-sm font-normal text-center text-gray-100 dark:text-gray-400 sm:text-start">
                            {{ $t('auth.noAccount') }}
                            <NuxtLink to="/sign-up"
                                class="text-brand-500 hover:text-brand-600 dark:text-brand-400 transition-colors duration-200">
                                {{ $t('auth.signUp') }}
                            </NuxtLink>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { getInputType, isEmail, isPhone } from '~/utils/validation'

const {
    signInForm,
    isLoading,
    error,
    handleSignIn,
    handleGoogleSignIn,
    validateSignInForm,
    getFieldError,
    hasFieldError,
    clearFieldError
} = useAuth()

const showPassword = ref(false)

// Detect input type and provide feedback
const inputTypeInfo = computed(() => {
    if (!signInForm.value.email) return null

    const input = signInForm.value.email.trim()
    const type = getInputType(input)

    switch (type) {
        case 'email':
            return {
                valid: true,
                label: 'Email',
                message: 'Email hợp lệ'
            }
        case 'phone':
            return {
                valid: true,
                label: 'SĐT',
                message: 'Số điện thoại hợp lệ'
            }
        default:
            return {
                valid: false,
                label: '?',
                message: 'Nhập email hoặc số điện thoại (VD: 0987654321)'
            }
    }
})

// Dynamic input type for better mobile experience
const inputType = computed(() => {
    if (!signInForm.value.email) return 'text'

    const type = getInputType(signInForm.value.email)
    if (type === 'phone') return 'tel'
    if (type === 'email') return 'email'
    return 'text'
})

// Check if form can be submitted
const canSubmit = computed(() => {
    return signInForm.value.email.length > 0 &&
        signInForm.value.password.length >= 6 &&
        inputTypeInfo.value?.valid
})

// Handle email/phone input changes
const onEmailInput = () => {
    clearFieldError('signIn', 'email')
}

// Handle password input changes
const onPasswordInput = () => {
    clearFieldError('signIn', 'password')
}

// Validate individual field
const validateField = (field: string) => {
    validateSignInForm()
}

// Handle form submission
const onSubmit = async () => {
    if (!validateSignInForm()) {
        return
    }

    await handleSignIn()
}

// Auto-focus first input on mount
onMounted(() => {
    const emailInput = document.getElementById('email')
    if (emailInput) {
        emailInput.focus()
    }
})
</script>

<style scoped>
.glass-input {
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1);
}

.glass-input:focus {
    background: rgba(255, 255, 255, 0.1);
    box-shadow:
        0 0 0 3px rgba(59, 130, 246, 0.15),
        0 8px 32px rgba(0, 0, 0, 0.15),
        inset 0 1px 0 rgba(255, 255, 255, 0.2);
}

/* Fix autofill styles */
.glass-input:-webkit-autofill,
.glass-input:-webkit-autofill:hover,
.glass-input:-webkit-autofill:focus,
.glass-input:-webkit-autofill:active {
    -webkit-box-shadow: 0 0 0 30px rgba(255, 255, 255, 0.05) inset !important;
    -webkit-text-fill-color: white !important;
    background: rgba(255, 255, 255, 0.05) !important;
    backdrop-filter: blur(16px) !important;
    -webkit-backdrop-filter: blur(16px) !important;
    transition: background-color 5000s ease-in-out 0s;
}

/* Dark mode autofill */
.dark .glass-input:-webkit-autofill,
.dark .glass-input:-webkit-autofill:hover,
.dark .glass-input:-webkit-autofill:focus,
.dark .glass-input:-webkit-autofill:active {
    -webkit-box-shadow: 0 0 0 30px rgba(255, 255, 255, 0.03) inset !important;
    -webkit-text-fill-color: white !important;
    background: rgba(255, 255, 255, 0.03) !important;
}

.glass-button {
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    box-shadow:
        0 8px 32px rgba(59, 130, 246, 0.3),
        inset 0 1px 0 rgba(255, 255, 255, 0.2);
}

.glass-button:hover:not(:disabled) {
    box-shadow:
        0 12px 40px rgba(59, 130, 246, 0.4),
        0 0 0 1px rgba(255, 255, 255, 0.1),
        inset 0 1px 0 rgba(255, 255, 255, 0.3);
    transform: translateY(-1px);
}

.glass-social {
    background: rgba(255, 255, 255, 0.03);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.05);
}

.glass-social:hover:not(:disabled) {
    background: rgba(255, 255, 255, 0.08);
    box-shadow:
        0 6px 25px rgba(0, 0, 0, 0.12),
        inset 0 1px 0 rgba(255, 255, 255, 0.1);
}

.glass-divider {
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

/* Dark mode adjustments */
.dark .glass-input {
    background: rgba(255, 255, 255, 0.03);
}

.dark .glass-input:focus {
    background: rgba(255, 255, 255, 0.08);
}

.dark .glass-social {
    background: rgba(255, 255, 255, 0.02);
}

.dark .glass-social:hover:not(:disabled) {
    background: rgba(255, 255, 255, 0.05);
}

/* Input error states */
.glass-input.border-red-400\/50 {
    background: rgba(239, 68, 68, 0.05);
    border-color: rgba(239, 68, 68, 0.5);
}

.glass-input.border-red-400\/50:focus {
    background: rgba(239, 68, 68, 0.08);
    box-shadow:
        0 0 0 3px rgba(239, 68, 68, 0.15),
        0 8px 32px rgba(239, 68, 68, 0.1),
        inset 0 1px 0 rgba(255, 255, 255, 0.1);
}

/* Animation for input type indicator */
.glass-input+div .absolute {
    animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateX(10px);
    }

    to {
        opacity: 1;
        transform: translateX(0);
    }
}
</style>