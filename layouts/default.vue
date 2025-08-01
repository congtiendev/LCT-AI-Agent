@click.outside="sidebarToggle = false"<template>
    <div class="flex h-screen overflow-hidden" :class="{ 'dark': isDarkMode }">
        <!-- Preloader -->
        <div v-if="isLoaded"
            class="fixed left-0 top-0 z-[999999] flex h-screen w-screen items-center justify-center bg-white dark:bg-black">
            <div class="h-16 w-16 animate-spin rounded-full border-4 border-solid border-blue-500 border-t-transparent">
            </div>
        </div>

        <!-- Sidebar -->
        <aside :class="[
            'sidebar fixed top-0 left-0 z-[9999] flex h-screen w-[290px] flex-col overflow-y-auto border-r bg-white px-5 transition-all duration-300 lg:static lg:translate-x-0',
            'border-gray-200 dark:border-gray-800 dark:bg-gray-900',
            sidebarToggle ? 'translate-x-0 lg:w-[90px]' : '-translate-x-full'
        ]" @click.outside="sidebarToggle = false">
            <!-- Sidebar Header -->
            <div :class="sidebarToggle ? 'justify-center' : 'justify-between'"
                class="sidebar-header flex items-center gap-2 pt-8 pb-7">
                <NuxtLink to="/">
                    <span class="logo" :class="sidebarToggle ? 'hidden' : ''">
                        <img class="dark:hidden" src="/images/logo/logo.svg" alt="Logo" />
                        <img class="hidden dark:block" src="/images/logo/logo-dark.svg" alt="Logo" />
                    </span>
                    <img class="logo-icon" :class="sidebarToggle ? 'lg:block' : 'hidden'"
                        src="/images/logo/logo-icon.svg" alt="Logo" />
                </NuxtLink>
            </div>

            <!-- Sidebar Menu -->
            <div class="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
                <nav>
                    <!-- Menu Group -->
                    <div>
                        <h3 class="mb-4 text-xs leading-[20px] text-gray-400 uppercase">
                            <span class="menu-group-title" :class="sidebarToggle ? 'lg:hidden' : ''">
                                MENU
                            </span>
                            <svg :class="sidebarToggle ? 'lg:block hidden' : 'hidden'"
                                class="menu-group-icon mx-auto fill-current" width="24" height="24" viewBox="0 0 24 24"
                                fill="none">
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                    d="M5.99915 10.2451C6.96564 10.2451 7.74915 11.0286 7.74915 11.9951V12.0051C7.74915 12.9716 6.96564 13.7551 5.99915 13.7551C5.03265 13.7551 4.24915 12.9716 4.24915 12.0051V11.9951C4.24915 11.0286 5.03265 10.2451 5.99915 10.2451ZM17.9991 10.2451C18.9656 10.2451 19.7491 11.0286 19.7491 11.9951V12.0051C19.7491 12.9716 18.9656 13.7551 17.9991 13.7551C17.0326 13.7551 16.2491 12.9716 16.2491 12.0051V11.9951C16.2491 11.0286 17.0326 10.2451 17.9991 10.2451ZM13.7491 11.9951C13.7491 11.0286 12.9656 10.2451 11.9991 10.2451C11.0326 10.2451 10.2491 11.0286 10.2491 11.9951V12.0051C10.2491 12.9716 11.0326 13.7551 11.9991 13.7551C12.9656 13.7551 13.7491 12.9716 13.7491 12.0051V11.9951Z"
                                    fill="" />
                            </svg>
                        </h3>

                        <ul class="mb-6 flex flex-col gap-4">
                            <!-- Dashboard Menu Item -->
                            <li>
                                <button @click="toggleMenuItem('Dashboard')"
                                    class="flex items-center gap-3 rounded-lg px-3 py-2.5 font-medium transition-colors duration-200 relative group w-full text-left"
                                    :class="isMenuActive('Dashboard') ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400' : 'text-gray-700 hover:bg-gray-100 hover:text-gray-800 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300'">
                                    <svg :class="isMenuActive('Dashboard') ? 'fill-blue-700 dark:fill-blue-400' : 'fill-gray-500 group-hover:fill-gray-700 dark:fill-gray-400 dark:group-hover:fill-gray-300'"
                                        width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <path fill-rule="evenodd" clip-rule="evenodd"
                                            d="M5.5 3.25C4.25736 3.25 3.25 4.25736 3.25 5.5V8.99998C3.25 10.2426 4.25736 11.25 5.5 11.25H9C10.2426 11.25 11.25 10.2426 11.25 8.99998V5.5C11.25 4.25736 10.2426 3.25 9 3.25H5.5ZM4.75 5.5C4.75 5.08579 5.08579 4.75 5.5 4.75H9C9.41421 4.75 9.75 5.08579 9.75 5.5V8.99998C9.75 9.41419 9.41421 9.74998 9 9.74998H5.5C5.08579 9.74998 4.75 9.41419 4.75 8.99998V5.5ZM5.5 12.75C4.25736 12.75 3.25 13.7574 3.25 15V18.5C3.25 19.7426 4.25736 20.75 5.5 20.75H9C10.2426 20.75 11.25 19.7427 11.25 18.5V15C11.25 13.7574 10.2426 12.75 9 12.75H5.5ZM4.75 15C4.75 14.5858 5.08579 14.25 5.5 14.25H9C9.41421 14.25 9.75 14.5858 9.75 15V18.5C9.75 18.9142 9.41421 19.25 9 19.25H5.5C5.08579 19.25 4.75 18.9142 4.75 18.5V15ZM12.75 5.5C12.75 4.25736 13.7574 3.25 15 3.25H18.5C19.7426 3.25 20.75 4.25736 20.75 5.5V8.99998C20.75 10.2426 19.7426 11.25 18.5 11.25H15C13.7574 11.25 12.75 10.2426 12.75 8.99998V5.5ZM15 4.75C14.5858 4.75 14.25 5.08579 14.25 5.5V8.99998C14.25 9.41419 14.5858 9.74998 15 9.74998H18.5C18.9142 9.74998 19.25 9.41419 19.25 8.99998V5.5C19.25 5.08579 18.9142 4.75 18.5 4.75H15ZM15 12.75C13.7574 12.75 12.75 13.7574 12.75 15V18.5C12.75 19.7426 13.7574 20.75 15 20.75H18.5C19.7426 20.75 20.75 19.7427 20.75 18.5V15C20.75 13.7574 19.7426 12.75 18.5 12.75H15ZM14.25 15C14.25 14.5858 14.5858 14.25 15 14.25H18.5C18.9142 14.25 19.25 14.5858 19.25 15V18.5C19.25 18.9142 18.9142 19.25 18.5 19.25H15C14.5858 19.25 14.25 18.9142 14.25 18.5V15Z"
                                            fill="" />
                                    </svg>
                                    <span class="block" :class="sidebarToggle ? 'lg:hidden' : ''">
                                        Dashboard
                                    </span>
                                    <svg class="absolute top-1/2 right-2.5 -translate-y-1/2 stroke-current transition-transform duration-200"
                                        :class="[
                                            selectedMenu === 'Dashboard' ? 'rotate-180 stroke-blue-700 dark:stroke-blue-400' : 'stroke-gray-500 group-hover:stroke-gray-700 dark:stroke-gray-400 dark:group-hover:stroke-gray-300',
                                            sidebarToggle ? 'lg:hidden' : ''
                                        ]" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                        <path d="M4.79175 7.39584L10.0001 12.6042L15.2084 7.39585" stroke=""
                                            stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                </button>

                                <!-- Dropdown Menu -->
                                <div class="translate transform overflow-hidden"
                                    :class="selectedMenu === 'Dashboard' ? 'block' : 'hidden'">
                                    <ul :class="sidebarToggle ? 'lg:hidden' : 'flex'"
                                        class="menu-dropdown mt-2 flex flex-col gap-1 pl-9">
                                        <li>
                                            <NuxtLink to="/ecommerce"
                                                class="flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-200 relative group"
                                                :class="$route.name === 'ecommerce' ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300'">
                                                eCommerce
                                            </NuxtLink>
                                        </li>
                                        <li>
                                            <NuxtLink to="/analytics"
                                                class="flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-200 relative group"
                                                :class="$route.name === 'analytics' ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300'">
                                                Analytics
                                                <span class="absolute right-3 flex items-center gap-1">
                                                    <span class="rounded px-1.5 py-0.5 text-xs font-medium"
                                                        :class="$route.name === 'analytics' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'">
                                                        Pro
                                                    </span>
                                                </span>
                                            </NuxtLink>
                                        </li>
                                        <li>
                                            <NuxtLink to="/marketing"
                                                class="flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-200 relative group"
                                                :class="$route.name === 'marketing' ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300'">
                                                Marketing
                                                <span class="absolute right-3 flex items-center gap-1">
                                                    <span class="rounded px-1.5 py-0.5 text-xs font-medium"
                                                        :class="$route.name === 'marketing' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'">
                                                        Pro
                                                    </span>
                                                </span>
                                            </NuxtLink>
                                        </li>
                                    </ul>
                                </div>
                            </li>

                            <!-- Calendar Menu Item -->
                            <li>
                                <NuxtLink to="/calendar"
                                    class="flex items-center gap-3 rounded-lg px-3 py-2.5 font-medium transition-colors duration-200 group"
                                    :class="$route.name === 'calendar' ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400' : 'text-gray-700 hover:bg-gray-100 hover:text-gray-800 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300'">
                                    <svg :class="$route.name === 'calendar' ? 'fill-blue-700 dark:fill-blue-400' : 'fill-gray-500 group-hover:fill-gray-700 dark:fill-gray-400 dark:group-hover:fill-gray-300'"
                                        width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <path fill-rule="evenodd" clip-rule="evenodd"
                                            d="M8 2C8.41421 2 8.75 2.33579 8.75 2.75V3.75H15.25V2.75C15.25 2.33579 15.5858 2 16 2C16.4142 2 16.75 2.33579 16.75 2.75V3.75H18.5C19.7426 3.75 20.75 4.75736 20.75 6V9V19C20.75 20.2426 19.7426 21.25 18.5 21.25H5.5C4.25736 21.25 3.25 20.2426 3.25 19V9V6C3.25 4.75736 4.25736 3.75 5.5 3.75H7.25V2.75C7.25 2.33579 7.58579 2 8 2ZM8 5.25H5.5C5.08579 5.25 4.75 5.58579 4.75 6V8.25H19.25V6C19.25 5.58579 18.9142 5.25 18.5 5.25H16H8ZM19.25 9.75H4.75V19C4.75 19.4142 5.08579 19.75 5.5 19.75H18.5C18.9142 19.75 19.25 19.4142 19.25 19V9.75Z"
                                            fill="" />
                                    </svg>
                                    <span class="block" :class="sidebarToggle ? 'lg:hidden' : ''">
                                        Calendar
                                    </span>
                                </NuxtLink>
                            </li>

                            <!-- Profile Menu Item -->
                            <li>
                                <NuxtLink to="/profile"
                                    class="flex items-center gap-3 rounded-lg px-3 py-2.5 font-medium transition-colors duration-200 group"
                                    :class="$route.name === 'profile' ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400' : 'text-gray-700 hover:bg-gray-100 hover:text-gray-800 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300'">
                                    <svg :class="$route.name === 'profile' ? 'fill-blue-700 dark:fill-blue-400' : 'fill-gray-500 group-hover:fill-gray-700 dark:fill-gray-400 dark:group-hover:fill-gray-300'"
                                        width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <path fill-rule="evenodd" clip-rule="evenodd"
                                            d="M12 3.5C7.30558 3.5 3.5 7.30558 3.5 12C3.5 14.1526 4.3002 16.1184 5.61936 17.616C6.17279 15.3096 8.24852 13.5955 10.7246 13.5955H13.2746C15.7509 13.5955 17.8268 15.31 18.38 17.6167C19.6996 16.119 20.5 14.153 20.5 12C20.5 7.30558 16.6944 3.5 12 3.5ZM17.0246 18.8566V18.8455C17.0246 16.7744 15.3457 15.0955 13.2746 15.0955H10.7246C8.65354 15.0955 6.97461 16.7744 6.97461 18.8455V18.856C8.38223 19.8895 10.1198 20.5 12 20.5C13.8798 20.5 15.6171 19.8898 17.0246 18.8566ZM2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12ZM11.9991 7.25C10.8847 7.25 9.98126 8.15342 9.98126 9.26784C9.98126 10.3823 10.8847 11.2857 11.9991 11.2857C13.1135 11.2857 14.0169 10.3823 14.0169 9.26784C14.0169 8.15342 13.1135 7.25 11.9991 7.25ZM8.48126 9.26784C8.48126 7.32499 10.0563 5.75 11.9991 5.75C13.9419 5.75 15.5169 7.32499 15.5169 9.26784C15.5169 11.2107 13.9419 12.7857 11.9991 12.7857C10.0563 12.7857 8.48126 11.2107 8.48126 9.26784Z"
                                            fill="" />
                                    </svg>
                                    <span class="block" :class="sidebarToggle ? 'lg:hidden' : ''">
                                        User Profile
                                    </span>
                                </NuxtLink>
                            </li>
                        </ul>
                    </div>

                    <!-- Support Group -->
                    <div>
                        <h3 class="mb-4 text-xs leading-[20px] text-gray-400 uppercase">
                            <span class="menu-group-title" :class="sidebarToggle ? 'lg:hidden' : ''">
                                Support
                            </span>
                        </h3>

                        <ul class="mb-6 flex flex-col gap-4">
                            <!-- Chat Menu Item -->
                            <li>
                                <NuxtLink to="/chat"
                                    class="flex items-center gap-3 rounded-lg px-3 py-2.5 font-medium transition-colors duration-200 group"
                                    :class="$route.name === 'chat' ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400' : 'text-gray-700 hover:bg-gray-100 hover:text-gray-800 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300'">
                                    <svg :class="$route.name === 'chat' ? 'fill-blue-700 dark:fill-blue-400' : 'fill-gray-500 group-hover:fill-gray-700 dark:fill-gray-400 dark:group-hover:fill-gray-300'"
                                        width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <path fill-rule="evenodd" clip-rule="evenodd"
                                            d="M4.00002 12.0957C4.00002 7.67742 7.58174 4.0957 12 4.0957C16.4183 4.0957 20 7.67742 20 12.0957C20 16.514 16.4183 20.0957 12 20.0957H5.06068L6.34317 18.8132C6.48382 18.6726 6.56284 18.4818 6.56284 18.2829C6.56284 18.084 6.48382 17.8932 6.34317 17.7526C4.89463 16.304 4.00002 14.305 4.00002 12.0957ZM12 2.5957C6.75332 2.5957 2.50002 6.849 2.50002 12.0957C2.50002 14.4488 3.35633 16.603 4.77303 18.262L2.71969 20.3154C2.50519 20.5299 2.44103 20.8525 2.55711 21.1327C2.6732 21.413 2.94668 21.5957 3.25002 21.5957H12C17.2467 21.5957 21.5 17.3424 21.5 12.0957C21.5 6.849 17.2467 2.5957 12 2.5957Z"
                                            fill="" />
                                    </svg>
                                    <span class="block" :class="sidebarToggle ? 'lg:hidden' : ''">
                                        Chat
                                    </span>
                                </NuxtLink>
                            </li>
                        </ul>
                    </div>
                </nav>

                <!-- Promo Box -->
                <div :class="sidebarToggle ? 'lg:hidden' : ''"
                    class="mx-auto mb-10 w-full max-w-60 rounded-2xl bg-gray-50 px-4 py-5 text-center dark:bg-white/[0.03]">
                    <h3 class="mb-2 font-semibold text-gray-900 dark:text-white">
                        #1 Tailwind CSS Dashboard
                    </h3>
                    <p class="text-sm mb-4 text-gray-500 dark:text-gray-400">
                        Leading Tailwind CSS Admin Template with 400+ UI Component and Pages.
                    </p>
                    <a href="https://tailadmin.com/pricing" target="_blank" rel="nofollow"
                        class="bg-blue-500 text-sm hover:bg-blue-600 flex items-center justify-center rounded-lg p-3 font-medium text-white">
                        Purchase Plan
                    </a>
                </div>
            </div>
        </aside>

        <!-- Content Area -->
        <div class="relative flex flex-1 flex-col overflow-x-hidden overflow-y-auto bg-gray-50 dark:bg-gray-900">
            <!-- Small Device Overlay -->
            <div v-if="sidebarToggle" class="fixed z-[9] h-screen w-full bg-gray-900/50 block lg:hidden"
                @click="sidebarToggle = false"></div>

            <!-- Main Content -->
            <main>
                <!-- Header -->
                <header
                    class="sticky top-0 z-[99999] flex w-full bg-white border-gray-200 lg:border-b dark:border-gray-800 dark:bg-gray-900">
                    <div class="flex grow flex-col items-center justify-between lg:flex-row lg:px-6">
                        <div
                            class="flex w-full items-center justify-between gap-2 border-b border-gray-200 px-3 py-3 sm:gap-4 lg:justify-normal lg:border-b-0 lg:px-0 lg:py-4 dark:border-gray-800">
                            <!-- Hamburger Toggle -->
                            <button
                                :class="sidebarToggle ? 'lg:bg-transparent dark:lg:bg-transparent bg-gray-100 dark:bg-gray-800' : ''"
                                class="z-[99999] flex h-10 w-10 items-center justify-center rounded-lg border-gray-200 text-gray-500 lg:h-11 lg:w-11 lg:border dark:border-gray-800 dark:text-gray-400"
                                @click.stop="sidebarToggle = !sidebarToggle">
                                <svg class="hidden fill-current lg:block" width="16" height="12" viewBox="0 0 16 12"
                                    fill="none">
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                        d="M0.583252 1C0.583252 0.585788 0.919038 0.25 1.33325 0.25H14.6666C15.0808 0.25 15.4166 0.585786 15.4166 1C15.4166 1.41421 15.0808 1.75 14.6666 1.75L1.33325 1.75C0.919038 1.75 0.583252 1.41422 0.583252 1ZM0.583252 11C0.583252 10.5858 0.919038 10.25 1.33325 10.25L14.6666 10.25C15.0808 10.25 15.4166 10.5858 15.4166 11C15.4166 11.4142 15.0808 11.75 14.6666 11.75L1.33325 11.75C0.919038 11.75 0.583252 11.4142 0.583252 11ZM1.33325 5.25C0.919038 5.25 0.583252 5.58579 0.583252 6C0.583252 6.41421 0.919038 6.75 1.33325 6.75L7.99992 6.75C8.41413 6.75 8.74992 6.41421 8.74992 6C8.74992 5.58579 8.41413 5.25 7.99992 5.25L1.33325 5.25Z"
                                        fill="" />
                                </svg>

                                <svg :class="sidebarToggle ? 'hidden' : 'block lg:hidden'"
                                    class="fill-current lg:hidden" width="24" height="24" viewBox="0 0 24 24"
                                    fill="none">
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                        d="M3.25 6C3.25 5.58579 3.58579 5.25 4 5.25L20 5.25C20.4142 5.25 20.75 5.58579 20.75 6C20.75 6.41421 20.4142 6.75 20 6.75L4 6.75C3.58579 6.75 3.25 6.41422 3.25 6ZM3.25 18C3.25 17.5858 3.58579 17.25 4 17.25L20 17.25C20.4142 17.25 20.75 17.5858 20.75 18C20.75 18.4142 20.4142 18.75 20 18.75L4 18.75C3.58579 18.75 3.25 18.4142 3.25 18ZM4 11.25C3.58579 11.25 3.25 11.5858 3.25 12C3.25 12.4142 3.58579 12.75 4 12.75L12 12.75C12.4142 12.75 12.75 12.4142 12.75 12C12.75 11.5858 12.4142 11.25 12 11.25L4 11.25Z"
                                        fill="" />
                                </svg>

                                <svg :class="sidebarToggle ? 'block lg:hidden' : 'hidden'" class="fill-current"
                                    width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                        d="M6.21967 7.28131C5.92678 6.98841 5.92678 6.51354 6.21967 6.22065C6.51256 5.92775 6.98744 5.92775 7.28033 6.22065L11.999 10.9393L16.7176 6.22078C17.0105 5.92789 17.4854 5.92788 17.7782 6.22078C18.0711 6.51367 18.0711 6.98855 17.7782 7.28144L13.0597 12L17.7782 16.7186C18.0711 17.0115 18.0711 17.4863 17.7782 17.7792C17.4854 18.0721 17.0105 18.0721 16.7176 17.7792L11.999 13.0607L7.28033 17.7794C6.98744 18.0722 6.51256 18.0722 6.21967 17.7794C5.92678 17.4865 5.92678 17.0116 6.21967 16.7187L10.9384 12L6.21967 7.28131Z"
                                        fill="" />
                                </svg>
                            </button>

                            <NuxtLink to="/" class="lg:hidden">
                                <img class="dark:hidden" src="/images/logo/logo.svg" alt="Logo" />
                                <img class="hidden dark:block" src="/images/logo/logo-dark.svg" alt="Logo" />
                            </NuxtLink>

                            <!-- Application nav menu button -->
                            <button
                                class="z-[99999] flex h-10 w-10 items-center justify-center rounded-lg text-gray-700 hover:bg-gray-100 lg:hidden dark:text-gray-400 dark:hover:bg-gray-800"
                                :class="menuToggle ? 'bg-gray-100 dark:bg-gray-800' : ''"
                                @click.stop="menuToggle = !menuToggle">
                                <svg class="fill-current" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                        d="M5.99902 10.4951C6.82745 10.4951 7.49902 11.1667 7.49902 11.9951V12.0051C7.49902 12.8335 6.82745 13.5051 5.99902 13.5051C5.1706 13.5051 4.49902 12.8335 4.49902 12.0051V11.9951C4.49902 11.1667 5.1706 10.4951 5.99902 10.4951ZM17.999 10.4951C18.8275 10.4951 19.499 11.1667 19.499 11.9951V12.0051C19.499 12.8335 18.8275 13.5051 17.999 13.5051C17.1706 13.5051 16.499 12.8335 16.499 12.0051V11.9951C16.499 11.1667 17.1706 10.4951 17.999 10.4951ZM13.499 11.9951C13.499 11.1667 12.8275 10.4951 11.999 10.4951C11.1706 10.4951 10.499 11.1667 10.499 11.9951V12.0051C10.499 12.8335 11.1706 13.5051 11.999 13.5051C12.8275 13.5051 13.499 12.8335 13.499 12.0051V11.9951Z"
                                        fill="" />
                                </svg>
                            </button>

                            <!-- Search Form -->
                            <div class="hidden lg:block">
                                <form @submit.prevent="handleSearch">
                                    <div class="relative">
                                        <span class="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2">
                                            <svg class="fill-gray-500 dark:fill-gray-400" width="20" height="20"
                                                viewBox="0 0 20 20" fill="none">
                                                <path fill-rule="evenodd" clip-rule="evenodd"
                                                    d="M3.04175 9.37363C3.04175 5.87693 5.87711 3.04199 9.37508 3.04199C12.8731 3.04199 15.7084 5.87693 15.7084 9.37363C15.7084 12.8703 12.8731 15.7053 9.37508 15.7053C5.87711 15.7053 3.04175 12.8703 3.04175 9.37363ZM9.37508 1.54199C5.04902 1.54199 1.54175 5.04817 1.54175 9.37363C1.54175 13.6991 5.04902 17.2053 9.37508 17.2053C11.2674 17.2053 13.003 16.5344 14.357 15.4176L17.177 18.238C17.4699 18.5309 17.9448 18.5309 18.2377 18.238C18.5306 17.9451 18.5306 17.4703 18.2377 17.1774L15.418 14.3573C16.5365 13.0033 17.2084 11.2669 17.2084 9.37363C17.2084 5.04817 13.7011 1.54199 9.37508 1.54199Z"
                                                    fill="" />
                                            </svg>
                                        </span>
                                        <input v-model="searchQuery" type="text" placeholder="Search or type command..."
                                            class="dark:bg-dark-900 shadow-sm focus:border-blue-300 focus:ring-blue-500/10 dark:focus:border-blue-800 h-11 w-full rounded-lg border border-gray-200 bg-transparent py-2.5 pr-14 pl-12 text-sm text-gray-800 placeholder:text-gray-400 focus:ring-3 focus:outline-hidden xl:w-[430px] dark:border-gray-800 dark:bg-gray-900 dark:bg-white/[0.03] dark:text-white/90 dark:placeholder:text-white/30" />
                                        <button type="submit"
                                            class="absolute top-1/2 right-2.5 inline-flex -translate-y-1/2 items-center gap-0.5 rounded-lg border border-gray-200 bg-gray-50 px-[7px] py-[4.5px] text-xs -tracking-[0.2px] text-gray-500 dark:border-gray-800 dark:bg-white/[0.03] dark:text-gray-400">
                                            <span> ⌘ </span>
                                            <span> K </span>
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>

                        <!-- Header Actions -->
                        <div :class="menuToggle ? 'flex' : 'hidden'"
                            class="shadow-md w-full items-center justify-between gap-4 px-5 py-4 lg:flex lg:justify-end lg:px-0 lg:shadow-none">
                            <div class="flex items-center gap-2 sm:gap-3">
                                <!-- Dark Mode Toggle -->
                                <button
                                    class="hover:text-gray-900 relative flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
                                    @click="toggleDarkMode">
                                    <svg v-if="isDarkMode" class="block" width="20" height="20" viewBox="0 0 20 20"
                                        fill="none">
                                        <path fill-rule="evenodd" clip-rule="evenodd"
                                            d="M9.99998 1.5415C10.4142 1.5415 10.75 1.87729 10.75 2.2915V3.5415C10.75 3.95572 10.4142 4.2915 9.99998 4.2915C9.58577 4.2915 9.24998 3.95572 9.24998 3.5415V2.2915C9.24998 1.87729 9.58577 1.5415 9.99998 1.5415ZM10.0009 6.79327C8.22978 6.79327 6.79402 8.22904 6.79402 10.0001C6.79402 11.7712 8.22978 13.207 10.0009 13.207C11.772 13.207 13.2078 11.7712 13.2078 10.0001C13.2078 8.22904 11.772 6.79327 10.0009 6.79327ZM5.29402 10.0001C5.29402 7.40061 7.40135 5.29327 10.0009 5.29327C12.6004 5.29327 14.7078 7.40061 14.7078 10.0001C14.7078 12.5997 12.6004 14.707 10.0009 14.707C7.40135 14.707 5.29402 12.5997 5.29402 10.0001Z"
                                            fill="currentColor" />
                                    </svg>
                                    <svg v-else class="block" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                        <path
                                            d="M17.4547 11.97L18.1799 12.1611C18.265 11.8383 18.1265 11.4982 17.8401 11.3266C17.5538 11.1551 17.1885 11.1934 16.944 11.4207L17.4547 11.97ZM8.0306 2.5459L8.57989 3.05657C8.80718 2.81209 8.84554 2.44682 8.67398 2.16046C8.50243 1.8741 8.16227 1.73559 7.83948 1.82066L8.0306 2.5459Z"
                                            fill="currentColor" />
                                    </svg>
                                </button>

                                <!-- Notifications -->
                                <div class="relative" ref="notificationContainer">
                                    <button
                                        class="hover:text-gray-900 relative flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
                                        @click="toggleNotifications">
                                        <span v-if="hasNotifications"
                                            class="absolute top-0.5 right-0 z-1 h-2 w-2 rounded-full bg-orange-400">
                                            <span
                                                class="absolute -z-1 inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-75"></span>
                                        </span>
                                        <svg class="fill-current" width="20" height="20" viewBox="0 0 20 20"
                                            fill="none">
                                            <path fill-rule="evenodd" clip-rule="evenodd"
                                                d="M10.75 2.29248C10.75 1.87827 10.4143 1.54248 10 1.54248C9.58583 1.54248 9.25004 1.87827 9.25004 2.29248V2.83613C6.08266 3.20733 3.62504 5.9004 3.62504 9.16748V14.4591H3.33337C2.91916 14.4591 2.58337 14.7949 2.58337 15.2091C2.58337 15.6234 2.91916 15.9591 3.33337 15.9591H4.37504H15.625H16.6667C17.0809 15.9591 17.4167 15.6234 17.4167 15.2091C17.4167 14.7949 17.0809 14.4591 16.6667 14.4591H16.375V9.16748C16.375 5.9004 13.9174 3.20733 10.75 2.83613V2.29248ZM14.875 14.4591V9.16748C14.875 6.47509 12.6924 4.29248 10 4.29248C7.30765 4.29248 5.12504 6.47509 5.12504 9.16748V14.4591H14.875ZM8.00004 17.7085C8.00004 18.1228 8.33583 18.4585 8.75004 18.4585H11.25C11.6643 18.4585 12 18.1228 12 17.7085C12 17.2943 11.6643 16.9585 11.25 16.9585H8.75004C8.33583 16.9585 8.00004 17.2943 8.00004 17.7085Z"
                                                fill="" />
                                        </svg>
                                    </button>

                                    <!-- Notification Dropdown -->
                                    <div v-if="showNotificationDropdown" ref="notificationDropdown"
                                        class="shadow-lg dark:bg-gray-900 absolute -right-[240px] mt-[17px] flex h-[480px] w-[350px] flex-col rounded-2xl border border-gray-200 bg-white p-3 sm:w-[361px] lg:right-0 dark:border-gray-800">
                                        <div
                                            class="mb-3 flex items-center justify-between border-b border-gray-100 pb-3 dark:border-gray-800">
                                            <h5 class="text-lg font-semibold text-gray-800 dark:text-white/90">
                                                Notification
                                            </h5>
                                            <button @click="showNotificationDropdown = false"
                                                class="text-gray-500 dark:text-gray-400">
                                                <svg class="fill-current" width="24" height="24" viewBox="0 0 24 24"
                                                    fill="none">
                                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                                        d="M6.21967 7.28131C5.92678 6.98841 5.92678 6.51354 6.21967 6.22065C6.51256 5.92775 6.98744 5.92775 7.28033 6.22065L11.999 10.9393L16.7176 6.22078C17.0105 5.92789 17.4854 5.92788 17.7782 6.22078C18.0711 6.51367 18.0711 6.98855 17.7782 7.28144L13.0597 12L17.7782 16.7186C18.0711 17.0115 18.0711 17.4863 17.7782 17.7792C17.4854 18.0721 17.0105 18.0721 16.7176 17.7792L11.999 13.0607L7.28033 17.7794C6.98744 18.0722 6.51256 18.0722 6.21967 17.7794C5.92678 17.4865 5.92678 17.0116 6.21967 16.7187L10.9384 12L6.21967 7.28131Z"
                                                        fill="" />
                                                </svg>
                                            </button>
                                        </div>

                                        <ul class="custom-scrollbar flex h-auto flex-col overflow-y-auto">
                                            <li>
                                                <a class="flex gap-3 rounded-lg border-b border-gray-100 p-3 px-4.5 py-3 hover:bg-gray-100 dark:border-gray-800 dark:hover:bg-white/5"
                                                    href="#">
                                                    <span class="relative z-1 block h-10 w-full max-w-10 rounded-full">
                                                        <img src="/images/user/user-02.jpg" alt="User"
                                                            class="overflow-hidden rounded-full" />
                                                        <span
                                                            class="bg-green-500 absolute right-0 bottom-0 z-10 h-2.5 w-full max-w-2.5 rounded-full border-[1.5px] border-white dark:border-gray-900"></span>
                                                    </span>
                                                    <span class="block">
                                                        <span
                                                            class="text-sm mb-1.5 block text-gray-500 dark:text-gray-400">
                                                            <span
                                                                class="font-medium text-gray-800 dark:text-white/90">Terry
                                                                Franci</span>
                                                            requests permission to change
                                                            <span
                                                                class="font-medium text-gray-800 dark:text-white/90">Project
                                                                - Nganter App</span>
                                                        </span>
                                                        <span
                                                            class="text-xs flex items-center gap-2 text-gray-500 dark:text-gray-400">
                                                            <span>Project</span>
                                                            <span class="h-1 w-1 rounded-full bg-gray-400"></span>
                                                            <span>5 min ago</span>
                                                        </span>
                                                    </span>
                                                </a>
                                            </li>

                                            <li>
                                                <a class="flex gap-3 rounded-lg border-b border-gray-100 p-3 px-4.5 py-3 hover:bg-gray-100 dark:border-gray-800 dark:hover:bg-white/5"
                                                    href="#">
                                                    <span class="relative z-1 block h-10 w-full max-w-10 rounded-full">
                                                        <img src="/images/user/user-03.jpg" alt="User"
                                                            class="overflow-hidden rounded-full" />
                                                        <span
                                                            class="bg-green-500 absolute right-0 bottom-0 z-10 h-2.5 w-full max-w-2.5 rounded-full border-[1.5px] border-white dark:border-gray-900"></span>
                                                    </span>
                                                    <span class="block">
                                                        <span
                                                            class="text-sm mb-1.5 block text-gray-500 dark:text-gray-400">
                                                            <span
                                                                class="font-medium text-gray-800 dark:text-white/90">Alena
                                                                Franci</span>
                                                            requests permission to change
                                                            <span
                                                                class="font-medium text-gray-800 dark:text-white/90">Project
                                                                - Nganter App</span>
                                                        </span>
                                                        <span
                                                            class="text-xs flex items-center gap-2 text-gray-500 dark:text-gray-400">
                                                            <span>Project</span>
                                                            <span class="h-1 w-1 rounded-full bg-gray-400"></span>
                                                            <span>8 min ago</span>
                                                        </span>
                                                    </span>
                                                </a>
                                            </li>

                                            <li>
                                                <a class="flex gap-3 rounded-lg border-b border-gray-100 p-3 px-4.5 py-3 hover:bg-gray-100 dark:border-gray-800 dark:hover:bg-white/5"
                                                    href="#">
                                                    <span class="relative z-1 block h-10 w-full max-w-10 rounded-full">
                                                        <img src="/images/user/user-04.jpg" alt="User"
                                                            class="overflow-hidden rounded-full" />
                                                        <span
                                                            class="bg-green-500 absolute right-0 bottom-0 z-10 h-2.5 w-full max-w-2.5 rounded-full border-[1.5px] border-white dark:border-gray-900"></span>
                                                    </span>
                                                    <span class="block">
                                                        <span
                                                            class="text-sm mb-1.5 block text-gray-500 dark:text-gray-400">
                                                            <span
                                                                class="font-medium text-gray-800 dark:text-white/90">Jocelyn
                                                                Kenter</span>
                                                            requests permission to change
                                                            <span
                                                                class="font-medium text-gray-800 dark:text-white/90">Project
                                                                - Nganter App</span>
                                                        </span>
                                                        <span
                                                            class="text-xs flex items-center gap-2 text-gray-500 dark:text-gray-400">
                                                            <span>Project</span>
                                                            <span class="h-1 w-1 rounded-full bg-gray-400"></span>
                                                            <span>15 min ago</span>
                                                        </span>
                                                    </span>
                                                </a>
                                            </li>

                                            <li>
                                                <a class="flex gap-3 rounded-lg border-b border-gray-100 p-3 px-4.5 py-3 hover:bg-gray-100 dark:border-gray-800 dark:hover:bg-white/5"
                                                    href="#">
                                                    <span class="relative z-1 block h-10 w-full max-w-10 rounded-full">
                                                        <img src="/images/user/user-05.jpg" alt="User"
                                                            class="overflow-hidden rounded-full" />
                                                        <span
                                                            class="bg-red-500 absolute right-0 bottom-0 z-10 h-2.5 w-full max-w-2.5 rounded-full border-[1.5px] border-white dark:border-gray-900"></span>
                                                    </span>
                                                    <span class="block">
                                                        <span
                                                            class="text-sm mb-1.5 block text-gray-500 dark:text-gray-400">
                                                            <span
                                                                class="font-medium text-gray-800 dark:text-white/90">Brandon
                                                                Philips</span>
                                                            requests permission to change
                                                            <span
                                                                class="font-medium text-gray-800 dark:text-white/90">Project
                                                                - Nganter App</span>
                                                        </span>
                                                        <span
                                                            class="text-xs flex items-center gap-2 text-gray-500 dark:text-gray-400">
                                                            <span>Project</span>
                                                            <span class="h-1 w-1 rounded-full bg-gray-400"></span>
                                                            <span>1 hr ago</span>
                                                        </span>
                                                    </span>
                                                </a>
                                            </li>

                                            <li>
                                                <a class="flex gap-3 rounded-lg border-b border-gray-100 p-3 px-4.5 py-3 hover:bg-gray-100 dark:border-gray-800 dark:hover:bg-white/5"
                                                    href="#">
                                                    <span class="relative z-1 block h-10 w-full max-w-10 rounded-full">
                                                        <img src="/images/user/user-02.jpg" alt="User"
                                                            class="overflow-hidden rounded-full" />
                                                        <span
                                                            class="bg-green-500 absolute right-0 bottom-0 z-10 h-2.5 w-full max-w-2.5 rounded-full border-[1.5px] border-white dark:border-gray-900"></span>
                                                    </span>
                                                    <span class="block">
                                                        <span
                                                            class="text-sm mb-1.5 block text-gray-500 dark:text-gray-400">
                                                            <span
                                                                class="font-medium text-gray-800 dark:text-white/90">Terry
                                                                Franci</span>
                                                            requests permission to change
                                                            <span
                                                                class="font-medium text-gray-800 dark:text-white/90">Project
                                                                - Nganter App</span>
                                                        </span>
                                                        <span
                                                            class="text-xs flex items-center gap-2 text-gray-500 dark:text-gray-400">
                                                            <span>Project</span>
                                                            <span class="h-1 w-1 rounded-full bg-gray-400"></span>
                                                            <span>5 min ago</span>
                                                        </span>
                                                    </span>
                                                </a>
                                            </li>
                                        </ul>

                                        <a href="#"
                                            class="text-sm shadow-sm mt-3 flex justify-center rounded-lg border border-gray-300 bg-white p-3 font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200">
                                            View All Notification
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <!-- User Area -->
                            <div class="relative" ref="userDropdownContainer">
                                <button class="flex items-center text-gray-700 dark:text-gray-400"
                                    @click="toggleUserDropdown">
                                    <span class="mr-3 h-11 w-11 overflow-hidden rounded-full">
                                        <img src="/images/user/owner.jpg" alt="User" />
                                    </span>
                                    <span class="text-sm mr-1 block font-medium">
                                        {{ user.name }}
                                    </span>
                                    <svg :class="showUserDropdown && 'rotate-180'"
                                        class="stroke-gray-500 dark:stroke-gray-400" width="18" height="20"
                                        viewBox="0 0 18 20" fill="none">
                                        <path d="M4.3125 8.65625L9 13.3437L13.6875 8.65625" stroke="" stroke-width="1.5"
                                            stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                </button>

                                <!-- User Dropdown -->
                                <div v-if="showUserDropdown" ref="userDropdown"
                                    class="shadow-lg dark:bg-gray-900 absolute right-0 mt-[17px] flex w-[260px] flex-col rounded-2xl border border-gray-200 bg-white p-3 dark:border-gray-800">
                                    <div>
                                        <span class="text-sm block font-medium text-gray-700 dark:text-gray-400">
                                            {{ user.name }}
                                        </span>
                                        <span class="text-xs mt-0.5 block text-gray-500 dark:text-gray-400">
                                            {{ user.email }}
                                        </span>
                                    </div>

                                    <ul
                                        class="flex flex-col gap-1 border-b border-gray-200 pt-4 pb-3 dark:border-gray-800">
                                        <li>
                                            <NuxtLink to="/profile"
                                                class="group text-sm flex items-center gap-3 rounded-lg px-3 py-2 font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300">
                                                <svg class="fill-gray-500 group-hover:fill-gray-700 dark:fill-gray-400 dark:group-hover:fill-gray-300"
                                                    width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                                        d="M12 3.5C7.30558 3.5 3.5 7.30558 3.5 12C3.5 14.1526 4.3002 16.1184 5.61936 17.616C6.17279 15.3096 8.24852 13.5955 10.7246 13.5955H13.2746C15.7509 13.5955 17.8268 15.31 18.38 17.6167C19.6996 16.119 20.5 14.153 20.5 12C20.5 7.30558 16.6944 3.5 12 3.5Z"
                                                        fill="" />
                                                </svg>
                                                Edit profile
                                            </NuxtLink>
                                        </li>
                                        <li>
                                            <NuxtLink to="/settings"
                                                class="group text-sm flex items-center gap-3 rounded-lg px-3 py-2 font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300">
                                                <svg class="fill-gray-500 group-hover:fill-gray-700 dark:fill-gray-400 dark:group-hover:fill-gray-300"
                                                    width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                                        d="M10.4858 3.5L13.5182 3.5C13.9233 3.5 14.2518 3.82851 14.2518 4.23377C14.2518 5.9529 16.1129 7.02795 17.602 6.1682C17.9528 5.96567 18.4014 6.08586 18.6039 6.43667L20.1203 9.0631C20.3229 9.41407 20.2027 9.86286 19.8517 10.0655C18.3625 10.9253 18.3625 13.0747 19.8517 13.9345C20.2026 14.1372 20.3229 14.5859 20.1203 14.9369L18.6039 17.5634C18.4013 17.9142 17.9528 18.0344 17.602 17.8318C16.1129 16.9721 14.2518 18.0471 14.2518 19.7663C14.2518 20.1715 13.9233 20.5 13.5182 20.5H10.4858C10.0804 20.5 9.75182 20.1714 9.75182 19.766C9.75182 18.0461 7.88983 16.9717 6.40067 17.8314C6.04945 18.0342 5.60037 17.9139 5.39767 17.5628L3.88167 14.937C3.67903 14.586 3.79928 14.1372 4.15026 13.9346C5.63949 13.0748 5.63946 10.9253 4.15025 10.0655C3.79926 9.86282 3.67901 9.41401 3.88165 9.06303L5.39764 6.43725C5.60034 6.08617 6.04943 5.96581 6.40065 6.16858C7.88982 7.02836 9.75182 5.9539 9.75182 4.23399C9.75182 3.82862 10.0804 3.5 10.4858 3.5Z"
                                                        fill="" />
                                                </svg>
                                                Account settings
                                            </NuxtLink>
                                        </li>
                                    </ul>
                                    <button @click="handleLogout"
                                        class="group text-sm mt-3 flex items-center gap-3 rounded-lg px-3 py-2 font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300">
                                        <svg class="fill-gray-500 group-hover:fill-gray-700 dark:group-hover:fill-gray-300"
                                            width="24" height="24" viewBox="0 0 24 24" fill="none">
                                            <path fill-rule="evenodd" clip-rule="evenodd"
                                                d="M15.1007 19.247C14.6865 19.247 14.3507 18.9112 14.3507 18.497L14.3507 14.245H12.8507V18.497C12.8507 19.7396 13.8581 20.747 15.1007 20.747H18.5007C19.7434 20.747 20.7507 19.7396 20.7507 18.497L20.7507 5.49609C20.7507 4.25345 19.7433 3.24609 18.5007 3.24609H15.1007C13.8581 3.24609 12.8507 4.25345 12.8507 5.49609V9.74501L14.3507 9.74501V5.49609C14.3507 5.08188 14.6865 4.74609 15.1007 4.74609L18.5007 4.74609C18.9149 4.74609 19.2507 5.08188 19.2507 5.49609L19.2507 18.497C19.2507 18.9112 18.9149 19.247 18.5007 19.247H15.1007Z"
                                                fill="" />
                                        </svg>
                                        Sign out
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                <!-- Page Content -->
                <div class="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
                    <slot />
                </div>
            </main>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// Template refs
const notificationContainer = ref(null)
const notificationDropdown = ref(null)
const userDropdownContainer = ref(null)
const userDropdown = ref(null)

// Reactive data
const isDarkMode = ref(false)
const isLoaded = ref(true)
const sidebarToggle = ref(false)
const menuToggle = ref(false)
const selectedMenu = ref('')
const searchQuery = ref('')
const hasNotifications = ref(true)
const showNotificationDropdown = ref(false)
const showUserDropdown = ref(false)

// User data
const user = ref({
    name: 'Musharof Chowdhury',
    email: 'musharof@example.com'
})

// Methods
const toggleDarkMode = () => {
    isDarkMode.value = !isDarkMode.value
}

const toggleMenuItem = (menuName) => {
    selectedMenu.value = selectedMenu.value === menuName ? '' : menuName
}

const isMenuActive = (menuName) => {
    const route = useRoute()
    return selectedMenu.value === menuName ||
        (menuName === 'Dashboard' && ['ecommerce', 'analytics', 'marketing', 'crm', 'stocks', 'saas'].includes(route.name))
}

const handleSearch = () => {
    // Handle search logic
    console.log('Searching for:', searchQuery.value)
}

const toggleNotifications = () => {
    showNotificationDropdown.value = !showNotificationDropdown.value
    hasNotifications.value = false
}

const toggleUserDropdown = () => {
    showUserDropdown.value = !showUserDropdown.value
}

const handleLogout = () => {
    // Handle logout logic
    console.log('Logging out...')
    showUserDropdown.value = false
}

// Click outside handler
const handleClickOutside = (event) => {
    // Check notification dropdown
    if (showNotificationDropdown.value &&
        notificationContainer.value &&
        !notificationContainer.value.contains(event.target)) {
        showNotificationDropdown.value = false
    }

    // Check user dropdown
    if (showUserDropdown.value &&
        userDropdownContainer.value &&
        !userDropdownContainer.value.contains(event.target)) {
        showUserDropdown.value = false
    }
}

// Watch for dark mode changes
watch(isDarkMode, (newValue) => {
    if (process.client) {
        const htmlElement = document.documentElement
        if (newValue) {
            htmlElement.classList.add('dark')
        } else {
            htmlElement.classList.remove('dark')
        }
        // Also save to localStorage
        localStorage.setItem('darkMode', JSON.stringify(newValue))
    }
})

// Initialize on mounted
onMounted(() => {
    // Initialize dark mode from localStorage
    if (process.client) {
        const savedDarkMode = localStorage.getItem('darkMode')
        if (savedDarkMode) {
            isDarkMode.value = JSON.parse(savedDarkMode)
        } else {
            // Check system preference if no saved preference
            isDarkMode.value = window.matchMedia('(prefers-color-scheme: dark)').matches
        }

        // Apply dark mode class immediately
        const htmlElement = document.documentElement
        if (isDarkMode.value) {
            htmlElement.classList.add('dark')
        } else {
            htmlElement.classList.remove('dark')
        }

        // Add click outside event listener
        document.addEventListener('click', handleClickOutside)
    }

    // Hide preloader after 500ms
    setTimeout(() => {
        isLoaded.value = false
    }, 500)
})

// Cleanup on unmounted
onUnmounted(() => {
    if (process.client) {
        document.removeEventListener('click', handleClickOutside)
    }
})
</script>

<style scoped>
/* Custom scrollbar styles only */
.custom-scrollbar::-webkit-scrollbar {
    width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
    background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
    background: rgba(156, 163, 175, 0.5);
    border-radius: 3px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: rgba(156, 163, 175, 0.7);
}

.no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
}

.no-scrollbar::-webkit-scrollbar {
    display: none;
}
</style>