<template>
    <!-- Form -->
    <div class="flex flex-col flex-1 w-full">
        <div class="flex flex-col justify-center flex-1 w-full max-w-xl mx-auto">
            <div>
                <div class="mb-5 sm:mb-8">
                    <p class="text-sm text-center text-gray-100 dark:text-gray-400">
                        {{ $t('auth.createAccountSubtitle') }}
                    </p>
                </div>
                <div>
                    <button
                        class="glass-social w-full inline-flex items-center justify-center gap-3 py-3 text-xs font-normal text-gray-100 transition-all duration-300 rounded-xl px-7  transform hover:-translate-y-1">
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
                    <form>
                        <div class="space-y-5">
                            <!-- Full Name & Username - 2 columns on desktop -->
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <!-- Full Name -->
                                <div>
                                    <label class="mb-1.5 block text-sm font-medium text-gray-100 dark:text-gray-400">
                                        {{ $t('form.fullName') }}<span class="text-error-500">*</span>
                                    </label>
                                    <input type="text" id="fullName" name="fullName"
                                        :placeholder="$t('form.fullNamePlaceholder')"
                                        class="glass-input h-11 w-full rounded-xl border border-white/20 bg-white/5 backdrop-blur-lg px-4 py-2.5 text-sm text-gray-800 shadow-lg placeholder:text-gray-400/80 focus:border-brand-300/50 focus:outline-hidden focus:ring-3 focus:ring-brand-500/20 focus:bg-white/10 dark:border-gray-700/30 dark:bg-white/5 text-white dark:placeholder:text-white/50 dark:focus:border-brand-800/50 transition-all duration-300" />
                                </div>

                                <!-- Username -->
                                <div>
                                    <label class="mb-1.5 block text-sm font-medium text-gray-100 dark:text-gray-400">
                                        {{ $t('form.username') }}<span class="text-error-500">*</span>
                                    </label>
                                    <input type="text" id="username" name="username"
                                        :placeholder="$t('form.usernamePlaceholder')"
                                        class="glass-input h-11 w-full rounded-xl border border-white/20 bg-white/5 backdrop-blur-lg px-4 py-2.5 text-sm text-gray-800 shadow-lg placeholder:text-gray-400/80 focus:border-brand-300/50 focus:outline-hidden focus:ring-3 focus:ring-brand-500/20 focus:bg-white/10 dark:border-gray-700/30 dark:bg-white/5 text-white dark:placeholder:text-white/50 dark:focus:border-brand-800/50 transition-all duration-300" />
                                </div>
                            </div>

                            <!-- Email & Phone - 2 columns on desktop -->
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <!-- Email -->
                                <div>
                                    <label class="mb-1.5 block text-sm font-medium text-gray-100 dark:text-gray-400">
                                        {{ $t('form.email') }}<span class="text-error-500">*</span>
                                    </label>
                                    <input type="email" id="email" name="email"
                                        :placeholder="$t('form.emailPlaceholder')"
                                        class="glass-input h-11 w-full rounded-xl border border-white/20 bg-white/5 backdrop-blur-lg px-4 py-2.5 text-sm text-gray-800 shadow-lg placeholder:text-gray-400/80 focus:border-brand-300/50 focus:outline-hidden focus:ring-3 focus:ring-brand-500/20 focus:bg-white/10 dark:border-gray-700/30 dark:bg-white/5 text-white dark:placeholder:text-white/50 dark:focus:border-brand-800/50 transition-all duration-300" />
                                </div>

                                <!-- Phone -->
                                <div>
                                    <label class="mb-1.5 block text-sm font-medium text-gray-100 dark:text-gray-400">
                                        {{ $t('form.phone') }}<span class="text-error-500">*</span>
                                    </label>
                                    <input type="tel" id="phone" name="phone" :placeholder="$t('form.phonePlaceholder')"
                                        class="glass-input h-11 w-full rounded-xl border border-white/20 bg-white/5 backdrop-blur-lg px-4 py-2.5 text-sm text-gray-800 shadow-lg placeholder:text-gray-400/80 focus:border-brand-300/50 focus:outline-hidden focus:ring-3 focus:ring-brand-500/20 focus:bg-white/10 dark:border-gray-700/30 dark:bg-white/5 text-white dark:placeholder:text-white/50 dark:focus:border-brand-800/50 transition-all duration-300" />
                                </div>
                            </div>

                            <!-- Password & Confirm Password - 2 columns on desktop -->
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <!-- Password -->
                                <div>
                                    <label class="mb-1.5 block text-sm font-medium text-gray-100 dark:text-gray-400">
                                        {{ $t('form.password') }}<span class="text-error-500">*</span>
                                    </label>
                                    <div class="relative">
                                        <input :type="showPassword ? 'text' : 'password'" id="password" name="password"
                                            :placeholder="$t('form.passwordPlaceholder')"
                                            class="glass-input h-11 w-full rounded-xl border border-white/20 bg-white/5 backdrop-blur-lg py-2.5 pl-4 pr-12 text-sm text-gray-800 shadow-lg placeholder:text-gray-400/80 focus:border-brand-300/50 focus:outline-hidden focus:ring-3 focus:ring-brand-500/20 focus:bg-white/10 dark:border-gray-700/30 dark:bg-white/5 text-white dark:focus:border-brand-800/50 transition-all duration-300" />
                                        <button @click="showPassword = !showPassword" type="button"
                                            class="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-full text-gray-400/80 hover:text-gray-600 hover:bg-white/10 dark:text-white/60 dark:hover:text-white/90 dark:hover:bg-white/5 transition-all duration-200 focus:outline-none">
                                            <svg v-if="!showPassword" width="18" height="18" viewBox="0 0 24 24"
                                                fill="none" stroke="currentColor" stroke-width="2">
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
                                </div>

                                <!-- Confirm Password -->
                                <div>
                                    <label class="mb-1.5 block text-sm font-medium text-gray-100 dark:text-gray-400">
                                        {{ $t('form.confirmPassword') }}<span class="text-error-500">*</span>
                                    </label>
                                    <div class="relative">
                                        <input :type="showConfirmPassword ? 'text' : 'password'" id="confirmPassword"
                                            name="confirmPassword" :placeholder="$t('form.confirmPasswordPlaceholder')"
                                            class="glass-input h-11 w-full rounded-xl border border-white/20 bg-white/5 backdrop-blur-lg py-2.5 pl-4 pr-12 text-sm text-gray-800 shadow-lg placeholder:text-gray-400/80 focus:border-brand-300/50 focus:outline-hidden focus:ring-3 focus:ring-brand-500/20 focus:bg-white/10 dark:border-gray-700/30 dark:bg-white/5 text-white dark:focus:border-brand-800/50 transition-all duration-300" />
                                        <button @click="showConfirmPassword = !showConfirmPassword" type="button"
                                            class="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-full text-gray-400/80 hover:text-gray-600 hover:bg-white/10 dark:text-white/60 dark:hover:text-white/90 dark:hover:bg-white/5 transition-all duration-200 focus:outline-none">
                                            <svg v-if="!showConfirmPassword" width="18" height="18" viewBox="0 0 24 24"
                                                fill="none" stroke="currentColor" stroke-width="2">
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
                                </div>
                            </div>

                            <!-- Terms and Conditions - Full width -->
                            <div class="flex items-start">
                                <input type="checkbox" id="agreeTerms" name="agreeTerms"
                                    class="mt-1 h-4 w-4 rounded border-gray-300 text-brand-600 focus:ring-brand-500" />
                                <label for="agreeTerms" class="ml-3 text-sm text-gray-100 dark:text-gray-400">
                                    {{ $t('auth.agreeToTerms') }}
                                    <a href="/terms"
                                        class="text-brand-500 hover:text-brand-600 dark:text-brand-400 transition-colors duration-200">{{
                                            $t('auth.termsAndConditions') }}</a>
                                    {{ $t('common.and') }}
                                    <a href="/privacy"
                                        class="text-brand-500 hover:text-brand-600 dark:text-brand-400 transition-colors duration-200">{{
                                            $t('auth.privacyPolicy') }}</a>
                                </label>
                            </div>

                            <!-- Button - Full width -->
                            <div>
                                <button
                                    class="flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white transition rounded-lg bg-brand-500 shadow-theme-xs hover:bg-brand-600">
                                    {{ $t('auth.createAccount') }}
                                </button>
                            </div>
                        </div>
                    </form>
                    <div class="mt-5 flex items-center justify-center">
                        <p class="text-sm font-normal text-center text-gray-100 dark:text-gray-400 sm:text-start">
                            {{ $t('auth.haveAccount') }}
                            <RouterLink to="/sign-in"
                                class="text-brand-500 hover:text-brand-600 dark:text-brand-400 transition-colors duration-200">
                                {{
                                    $t('auth.signIn') }}</RouterLink>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            showPassword: false,
            showConfirmPassword: false
        }
    }
}
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

.glass-button:hover {
    box-shadow:
        0 12px 40px rgba(59, 130, 246, 0.4),
        0 0 0 1px rgba(255, 255, 255, 0.1),
        inset 0 1px 0 rgba(255, 255, 255, 0.3);
}

.glass-social {
    background: rgba(255, 255, 255, 0.03);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.05);
}

.glass-social:hover {
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

.dark .glass-social:hover {
    background: rgba(255, 255, 255, 0.05);
}
</style>