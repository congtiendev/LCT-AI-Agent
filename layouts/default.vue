<template>
    <div class="flex h-screen overflow-hidden" :class="{ 'dark': isDarkMode }">
        <!-- KLEVERBOT Preloader -->
        <Loading :isLoaded="isLoaded" :isDarkMode="isDarkMode" />

        <!-- Sidebar -->
        <aside :class="[
            'sidebar fixed top-0 left-0 z-[9998] flex h-screen w-[290px] flex-col overflow-y-auto border-r bg-white px-5 transition-all duration-300 lg:static lg:translate-x-0',
            'border-gray-200 dark:border-gray-800 dark:bg-gray-900',
            sidebarOpen ? 'translate-x-0 lg:w-[90px]' : '-translate-x-full'
        ]">
            <!-- Sidebar Header -->
            <div :class="sidebarOpen ? 'justify-center' : 'justify-between'"
                class="sidebar-header flex items-center gap-2 pt-8 pb-7">
                <NuxtLink to="/">
                    <span class="logo" :class="sidebarOpen ? 'hidden' : ''">
                        <img class="dark:hidden" src="/images/logo/logo.png" alt="Logo" />
                        <img class="hidden dark:block" src="/images/logo/logo.png" alt="Logo" />
                    </span>
                    <img class="logo-icon" :class="sidebarOpen ? 'lg:block' : 'hidden'" src="/images/logo/logo.png"
                        alt="Logo" />
                </NuxtLink>
            </div>

            <!-- Sidebar Menu -->
            <div class="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
                <nav>
                    <!-- Menu Groups -->
                    <div v-for="group in filteredMenuGroups" :key="group.id" class="mb-6">
                        <!-- Group Title -->
                        <h3 class="mb-4 text-xs leading-[20px] text-gray-400 uppercase">
                            <span class="menu-group-title" :class="sidebarOpen ? 'lg:hidden' : ''">
                                {{ group.title }}
                            </span>
                            <span v-if="group.icon" :class="sidebarOpen ? 'lg:block hidden' : 'hidden'"
                                class="menu-group-icon mx-auto fill-current" width="24" height="24" viewBox="0 0 24 24"
                                fill="none" v-html="getIcon(group.icon)">
                            </span>
                        </h3>

                        <!-- Group Items -->
                        <ul class="flex flex-col gap-4">
                            <li v-for="item in group.items" :key="item.id">

                                <!-- Dropdown Menu Item -->
                                <div v-if="item.type === 'dropdown'">
                                    <button @click="toggleMenu(item.id)"
                                        class="flex items-center gap-3 rounded-lg px-3 py-2.5 font-medium transition-colors duration-200 relative group w-full text-left"
                                        :class="isMenuActive(item.id)
                                            ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400'
                                            : 'text-gray-700 hover:bg-gray-100 hover:text-gray-800 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300'">

                                        <!-- Icon -->
                                        <svg :class="isMenuActive(item.id)
                                            ? 'fill-blue-700 dark:fill-blue-400'
                                            : 'fill-gray-500 group-hover:fill-gray-700 dark:fill-gray-400 dark:group-hover:fill-gray-300'"
                                            width="24" height="24" viewBox="0 0 24 24" fill="none"
                                            v-html="getIcon(item.icon)">
                                        </svg>

                                        <!-- Label -->
                                        <span class="block" :class="sidebarOpen ? 'lg:hidden' : ''">
                                            {{ item.label }}
                                        </span>

                                        <!-- Dropdown Arrow -->
                                        <svg class="absolute top-1/2 right-2.5 -translate-y-1/2 stroke-current transition-transform duration-200"
                                            :class="[
                                                isMenuOpen(item.id) ? 'rotate-180' : '',
                                                isMenuActive(item.id)
                                                    ? 'stroke-blue-700 dark:stroke-blue-400'
                                                    : 'stroke-gray-500 group-hover:stroke-gray-700 dark:stroke-gray-400 dark:group-hover:stroke-gray-300',
                                                sidebarOpen ? 'lg:hidden' : ''
                                            ]" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                            <path d="M4.79175 7.39584L10.0001 12.6042L15.2084 7.39585" stroke=""
                                                stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                    </button>

                                    <!-- Dropdown Content -->
                                    <div class="translate transform overflow-hidden"
                                        :class="isMenuOpen(item.id) ? 'block' : 'hidden'">
                                        <ul :class="sidebarOpen ? 'lg:hidden' : 'flex'"
                                            class="menu-dropdown mt-2 flex flex-col gap-1 pl-9">
                                            <li v-for="child in item.children" :key="child.id">
                                                <NuxtLink :to="child.route || '#'"
                                                    class="flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-200 relative group"
                                                    :class="isMenuActive(child.id)
                                                        ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400'
                                                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300'">

                                                    {{ child.label }}

                                                    <!-- Badge -->
                                                    <span v-if="child.badge"
                                                        class="absolute right-3 flex items-center gap-1">
                                                        <span class="rounded px-1.5 py-0.5 text-xs font-medium"
                                                            :class="isMenuActive(child.id)
                                                                ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                                                                : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'">
                                                            {{ child.badge.text }}
                                                        </span>
                                                    </span>
                                                </NuxtLink>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                <!-- Single Link Menu Item -->
                                <div v-else>
                                    <NuxtLink :to="item.route || '#'"
                                        class="flex items-center gap-3 rounded-lg px-3 py-2.5 font-medium transition-colors duration-200 group"
                                        :class="isMenuActive(item.id)
                                            ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400'
                                            : 'text-gray-700 hover:bg-gray-100 hover:text-gray-800 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300'">

                                        <!-- Icon -->
                                        <svg :class="isMenuActive(item.id)
                                            ? 'fill-blue-700 dark:fill-blue-400'
                                            : 'fill-gray-500 group-hover:fill-gray-700 dark:fill-gray-400 dark:group-hover:fill-gray-300'"
                                            width="24" height="24" viewBox="0 0 24 24" fill="none"
                                            v-html="getIcon(item.icon)">
                                        </svg>

                                        <!-- Label -->
                                        <span class="block" :class="sidebarOpen ? 'lg:hidden' : ''">
                                            {{ item.label }}
                                        </span>
                                    </NuxtLink>
                                </div>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        </aside>

        <!-- Content Area -->
        <div class="relative flex flex-1 flex-col overflow-x-hidden overflow-y-auto bg-gray-50 dark:bg-gray-900">
            <!-- Small Device Overlay -->
            <div v-if="sidebarOpen" class="fixed z-[9] h-screen w-full bg-gray-900/50 block lg:hidden"
                @click="sidebarOpen = false"></div>

            <!-- Main Content -->
            <main>
                <!-- Header -->
                <header
                    class="sticky top-0 z-[9998] flex w-full bg-white border-gray-200 lg:border-b dark:border-gray-800 dark:bg-gray-900">
                    <div class="flex grow flex-col items-center justify-between lg:flex-row lg:px-6">
                        <div
                            class="flex w-full items-center justify-between gap-2 border-b border-gray-200 px-3 py-3 sm:gap-4 lg:justify-normal lg:border-b-0 lg:px-0 lg:py-4 dark:border-gray-800">

                            <!-- Hamburger Toggle -->
                            <button
                                :class="sidebarOpen ? 'lg:bg-transparent dark:lg:bg-transparent bg-gray-100 dark:bg-gray-800' : ''"
                                class="z-[99999] flex h-10 w-10 items-center justify-center rounded-lg border-gray-200 text-gray-500 lg:h-11 lg:w-11 lg:border dark:border-gray-800 dark:text-gray-400"
                                @click.stop="toggleSidebar">

                                <!-- Desktop hamburger -->
                                <svg class="hidden fill-current lg:block" width="16" height="12" viewBox="0 0 16 12"
                                    fill="none">
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                        d="M0.583252 1C0.583252 0.585788 0.919038 0.25 1.33325 0.25H14.6666C15.0808 0.25 15.4166 0.585786 15.4166 1C15.4166 1.41421 15.0808 1.75 14.6666 1.75L1.33325 1.75C0.919038 1.75 0.583252 1.41422 0.583252 1ZM0.583252 11C0.583252 10.5858 0.919038 10.25 1.33325 10.25L14.6666 10.25C15.0808 10.25 15.4166 10.5858 15.4166 11C15.4166 11.4142 15.0808 11.75 14.6666 11.75L1.33325 11.75C0.919038 11.75 0.583252 11.4142 0.583252 11ZM1.33325 5.25C0.919038 5.25 0.583252 5.58579 0.583252 6C0.583252 6.41421 0.919038 6.75 1.33325 6.75L7.99992 6.75C8.41413 6.75 8.74992 6.41421 8.74992 6C8.74992 5.58579 8.41413 5.25 7.99992 5.25L1.33325 5.25Z"
                                        fill="" />
                                </svg>

                                <!-- Mobile hamburger/close -->
                                <svg :class="sidebarOpen ? 'hidden' : 'block lg:hidden'" class="fill-current lg:hidden"
                                    width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                        d="M3.25 6C3.25 5.58579 3.58579 5.25 4 5.25L20 5.25C20.4142 5.25 20.75 5.58579 20.75 6C20.75 6.41421 20.4142 6.75 20 6.75L4 6.75C3.58579 6.75 3.25 6.41422 3.25 6ZM3.25 18C3.25 17.5858 3.58579 17.25 4 17.25L20 17.25C20.4142 17.25 20.75 17.5858 20.75 18C20.75 18.4142 20.4142 18.75 20 18.75L4 18.75C3.58579 18.75 3.25 18.4142 3.25 18ZM4 11.25C3.58579 11.25 3.25 11.5858 3.25 12C3.25 12.4142 3.58579 12.75 4 12.75L12 12.75C12.4142 12.75 12.75 12.4142 12.75 12C12.75 11.5858 12.4142 11.25 12 11.25L4 11.25Z"
                                        fill="" />
                                </svg>

                                <svg :class="sidebarOpen ? 'block lg:hidden' : 'hidden'" class="fill-current" width="24"
                                    height="24" viewBox="0 0 24 24" fill="none">
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                        d="M6.21967 7.28131C5.92678 6.98841 5.92678 6.51354 6.21967 6.22065C6.51256 5.92775 6.98744 5.92775 7.28033 6.22065L11.999 10.9393L16.7176 6.22078C17.0105 5.92789 17.4854 5.92788 17.7782 6.22078C18.0711 6.51367 18.0711 6.98855 17.7782 7.28144L13.0597 12L17.7782 16.7186C18.0711 17.0115 18.0711 17.4863 17.7782 17.7792C17.4854 18.0721 17.0105 18.0721 16.7176 17.7792L11.999 13.0607L7.28033 17.7794C6.98744 18.0722 6.51256 18.0722 6.21967 17.7794C5.92678 17.4865 5.92678 17.0116 6.21967 16.7187L10.9384 12L6.21967 7.28131Z"
                                        fill="" />
                                </svg>
                            </button>

                            <!-- Mobile Logo -->
                            <NuxtLink to="/" class="lg:hidden">
                                <img class="dark:hidden" src="/images/logo/logo.svg" alt="Logo" />
                                <img class="hidden dark:block" src="/images/logo/logo-dark.svg" alt="Logo" />
                            </NuxtLink>

                            <!-- Mobile menu button -->
                            <button
                                class="z-[99999] flex h-10 w-10 items-center justify-center rounded-lg text-gray-700 hover:bg-gray-100 lg:hidden dark:text-gray-400 dark:hover:bg-gray-800"
                                :class="mobileMenuOpen ? 'bg-gray-100 dark:bg-gray-800' : ''"
                                @click.stop="toggleMobileMenu">
                                <svg class="fill-current" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                        d="M5.99902 10.4951C6.82745 10.4951 7.49902 11.1667 7.49902 11.9951V12.0051C7.49902 12.8335 6.82745 13.5051 5.99902 13.5051C5.1706 13.5051 4.49902 12.8335 4.49902 12.0051V11.9951C4.49902 11.1667 5.1706 10.4951 5.99902 10.4951ZM17.999 10.4951C18.8275 10.4951 19.499 11.1667 19.499 11.9951V12.0051C19.499 12.8335 18.8275 13.5051 17.999 13.5051C17.1706 13.5051 16.499 12.8335 16.499 12.0051V11.9951C16.499 11.1667 17.1706 10.4951 17.999 10.4951ZM13.499 11.9951C13.499 11.1667 12.8275 10.4951 11.999 10.4951C11.1706 10.4951 10.499 11.1667 10.499 11.9951V12.0051C10.499 12.8335 11.1706 13.5051 11.999 13.5051C12.8275 13.5051 13.499 12.8335 13.499 12.0051V11.9951Z"
                                        fill="" />
                                </svg>
                            </button>

                            <!-- Search Form -->
                            <div class="hidden lg:block">
                                <form @submit.prevent="handleSearch(searchQuery)">
                                    <div class="relative">
                                        <span class="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2">
                                            <svg class="fill-gray-500 dark:fill-gray-400" width="20" height="20"
                                                viewBox="0 0 20 20" fill="none">
                                                <path fill-rule="evenodd" clip-rule="evenodd"
                                                    d="M3.04175 9.37363C3.04175 5.87693 5.87711 3.04199 9.37508 3.04199C12.8731 3.04199 15.7084 5.87693 15.7084 9.37363C15.7084 12.8703 12.8731 15.7053 9.37508 15.7053C5.87711 15.7053 3.04175 12.8703 3.04175 9.37363ZM9.37508 1.54199C5.04902 1.54199 1.54175 5.04817 1.54175 9.37363C1.54175 13.6991 5.04902 17.2053 9.37508 17.2053C11.2674 17.2053 13.003 16.5344 14.357 15.4176L17.177 18.238C17.4699 18.5309 17.9448 18.5309 18.2377 18.238C18.5306 17.9451 18.5306 17.4703 18.2377 17.1774L15.418 14.3573C16.5365 13.0033 17.2084 11.2669 17.2084 9.37363C17.2084 5.04817 13.7011 1.54199 9.37508 1.54199Z"
                                                    fill="" />
                                            </svg>
                                        </span>
                                        <input v-model="searchQuery" type="text" placeholder="Search..."
                                            class="dark:bg-dark-900 shadow-sm focus:border-blue-300 focus:ring-blue-500/10 dark:focus:border-blue-800 h-11 w-full rounded-lg border border-gray-200 bg-transparent py-2.5 pr-14 pl-12 text-sm text-gray-800 placeholder:text-gray-400 focus:ring-3 focus:outline-hidden xl:w-[430px] dark:border-gray-800 dark:bg-gray-900 dark:bg-white/[0.03] dark:text-white/90 dark:placeholder:text-white/30" />
                                        <button type="submit"
                                            class="absolute top-1/2 right-2.5 inline-flex -translate-y-1/2 items-center gap-0.5 rounded-lg border border-gray-200 bg-gray-50 px-[7px] py-[4.5px] text-xs -tracking-[0.2px] text-gray-500 dark:border-gray-800 dark:bg-white/[0.03] dark:text-gray-400">
                                            <span>⌘</span>
                                            <span>K</span>
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>

                        <!-- Header Actions -->
                        <div :class="mobileMenuOpen ? 'flex' : 'hidden'"
                            class="shadow-md w-full items-center justify-between gap-4 px-5 py-4 lg:flex lg:justify-end lg:px-0 lg:shadow-none">
                            <div class="flex items-center gap-2 sm:gap-3">
                                <!-- Dark Mode Toggle -->
                                <button
                                    class="hover:text-gray-900 relative flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
                                    @click="toggleDarkMode">
                                    <svg xmlns="http://www.w3.org/2000/svg" v-if="isDarkMode" width="20" height="20"
                                        viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                        stroke-linecap="round" stroke-linejoin="round"
                                        class="lucide lucide-moon-icon lucide-moon block">
                                        <path
                                            d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401" />
                                    </svg>
                                    <svg v-else xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                        viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                        stroke-linecap="round" stroke-linejoin="round"
                                        class="lucide lucide-sun-icon lucide-sun block">
                                        <circle cx="12" cy="12" r="4" />
                                        <path d="M12 2v2" />
                                        <path d="M12 20v2" />
                                        <path d="m4.93 4.93 1.41 1.41" />
                                        <path d="m17.66 17.66 1.41 1.41" />
                                        <path d="M2 12h2" />
                                        <path d="M20 12h2" />
                                        <path d="m6.34 17.66-1.41 1.41" />
                                        <path d="m19.07 4.93-1.41 1.41" />
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
                                    <div v-if="notificationDropdown.isOpen.value"
                                        class="shadow-lg dark:bg-gray-900 absolute -right-[240px] mt-[17px] flex h-[480px] w-[350px] flex-col rounded-2xl border border-gray-200 bg-white p-3 sm:w-[361px] lg:right-0 dark:border-gray-800">
                                        <div
                                            class="mb-3 flex items-center justify-between border-b border-gray-100 pb-3 dark:border-gray-800">
                                            <h5 class="text-lg font-semibold text-gray-800 dark:text-white/90">
                                                Notifications
                                            </h5>
                                            <button @click="notificationDropdown.close()"
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
                                            <li v-for="notification in notifications" :key="notification.id">
                                                <a class="flex gap-3 rounded-lg border-b border-gray-100 p-3 px-4.5 py-3 hover:bg-gray-100 dark:border-gray-800 dark:hover:bg-white/5"
                                                    href="#">
                                                    <span class="relative z-1 block h-10 w-full max-w-10 rounded-full">
                                                        <img :src="notification.user.avatar"
                                                            :alt="notification.user.name"
                                                            class="overflow-hidden rounded-full" />
                                                        <span
                                                            :class="notification.user.status === 'online' ? 'bg-green-500' : 'bg-red-500'"
                                                            class="absolute right-0 bottom-0 z-10 h-2.5 w-full max-w-2.5 rounded-full border-[1.5px] border-white dark:border-gray-900"></span>
                                                    </span>
                                                    <span class="block">
                                                        <span
                                                            class="text-sm mb-1.5 block text-gray-500 dark:text-gray-400">
                                                            <span
                                                                class="font-medium text-gray-800 dark:text-white/90">{{
                                                                    notification.user.name }}</span>
                                                            {{ notification.message }}
                                                        </span>
                                                        <span
                                                            class="text-xs flex items-center gap-2 text-gray-500 dark:text-gray-400">
                                                            <span>{{ notification.type }}</span>
                                                            <span class="h-1 w-1 rounded-full bg-gray-400"></span>
                                                            <span>{{ notification.time }}</span>
                                                        </span>
                                                    </span>
                                                </a>
                                            </li>
                                        </ul>

                                        <a href="#"
                                            class="text-sm shadow-sm mt-3 flex justify-center rounded-lg border border-gray-300 bg-white p-3 font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200">
                                            View All Notifications
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <!-- User Area -->
                            <div class="relative" ref="userDropdownContainer">
                                <button class="flex items-center text-gray-700 dark:text-gray-400"
                                    @click="toggleUserDropdown">
                                    <span class="mr-3 h-11 w-11 overflow-hidden rounded-full">
                                        <img :src="user?.avatar || '/images/avatars/chatbot.png'"
                                            :alt="user?.fullName || 'unknown'" />
                                    </span>
                                </button>

                                <!-- User Dropdown -->
                                <div v-if="userDropdown.isOpen.value"
                                    class="shadow-lg dark:bg-gray-900 absolute right-0 mt-[17px] flex w-[260px] flex-col rounded-2xl border border-gray-200 bg-white p-3 dark:border-gray-800">
                                    <div class="flex">
                                        <span class="mr-3 h-11 w-11 overflow-hidden rounded-full">
                                            <img :src="user?.avatar || '/images/avatars/chatbot.png'"
                                                :alt="user?.fullName || 'unknown'" />
                                        </span>
                                        <div>
                                            <span class="text-sm block font-medium text-gray-700 dark:text-gray-400">
                                                {{ user?.username || 'Unknown' }}
                                            </span>
                                            <span class="text-xs mt-0.5 block text-gray-500 dark:text-gray-400">
                                                {{ user?.email }}
                                            </span>
                                        </div>
                                    </div>

                                    <ul
                                        class="flex flex-col gap-1 border-b border-gray-200 pt-4 pb-3 dark:border-gray-800">
                                        <li>
                                            <NuxtLink to="/profile"
                                                class="group text-sm flex items-center gap-3 rounded-lg px-3 py-2 font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
                                                @click="userDropdown.close()">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                    viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                    stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                                    class="lucide lucide-circle-user-round-icon lucide-circle-user-round text-gray-400">
                                                    <path d="M18 20a6 6 0 0 0-12 0" />
                                                    <circle cx="12" cy="10" r="4" />
                                                    <circle cx="12" cy="12" r="10" />
                                                </svg>
                                                Edit Profile
                                            </NuxtLink>
                                        </li>
                                        <li>
                                            <NuxtLink to="/settings"
                                                class="group text-sm flex items-center gap-3 rounded-lg px-3 py-2 font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
                                                @click="userDropdown.close()">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                    viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                    stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                                    class="lucide lucide-settings-icon lucide-settings text-gray-400">
                                                    <path
                                                        d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915" />
                                                    <circle cx="12" cy="12" r="3" />
                                                </svg>
                                                Account Settings
                                            </NuxtLink>
                                        </li>
                                    </ul>

                                    <button @click="handleLogout"
                                        class="group text-sm mt-3 flex items-center gap-3 rounded-lg px-3 py-2 font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                            viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                            stroke-linecap="round" stroke-linejoin="round"
                                            class="lucide lucide-log-out-icon lucide-log-out text-gray-400">
                                            <path d="m16 17 5-5-5-5" />
                                            <path d="M21 12H9" />
                                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                                        </svg>
                                        Sign Out
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                <!-- Page Content -->
                <div class="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
                    <slot></slot>
                </div>
            </main>
        </div>
    </div>
</template>

<script setup lang="ts">
// Import composables
import {
    useDarkMode,
    useClickOutside,
    useDropdown,
    useMenu,
    useSearch,
    useNotifications,
    useUser,
    usePreloader
} from '@/composables/layout'

// Use composables
const { isDarkMode, toggleDarkMode, initializeDarkMode } = useDarkMode()
const { setupClickOutside } = useClickOutside()
const { createDropdown } = useDropdown()
const {
    filteredMenuGroups,
    selectedMenu,
    sidebarOpen,
    mobileMenuOpen,
    toggleMenu,
    isMenuActive,
    isMenuOpen,
    toggleSidebar,
    toggleMobileMenu,
    getIcon,
    setUserPermissions,
    hasPermission
} = useMenu()

// Mock user data - replace with real auth
const user = ref({
    username: 'John Doe',
    email: 'john@example.com',
    avatar: '/images/avatars/avatar.png',
    fullName: 'John Doe'
})

const { searchQuery, handleSearch } = useSearch()
const { hasNotifications, notifications, markAsRead } = useNotifications()
const { isLoaded, hidePreloader } = usePreloader()

// Template refs
const notificationContainer = ref<HTMLElement | null>(null)
const userDropdownContainer = ref<HTMLElement | null>(null)

// Create dropdowns
const notificationDropdown = createDropdown()
const userDropdown = createDropdown()

// Handle notification toggle
const toggleNotifications = (): void => {
    notificationDropdown.toggle()
    if (notificationDropdown.isOpen.value) {
        markAsRead()
    }
}

// Handle user dropdown toggle
const toggleUserDropdown = (): void => {
    userDropdown.toggle()
}

// Mock logout function
const handleLogout = async (): Promise<void> => {
    try {
        console.log('Logging out...')
    } catch (error) {
        console.error('Logout failed:', error)
    }
}

// Setup click outside for dropdowns
setupClickOutside(
    [notificationContainer, userDropdownContainer],
    [
        () => {
            if (notificationDropdown.isOpen.value) {
                notificationDropdown.close()
            }
        },
        () => {
            if (userDropdown.isOpen.value) {
                userDropdown.close()
            }
        }
    ]
)

// Initialize on mounted
onMounted(() => {
    initializeDarkMode()
    hidePreloader()
})
</script>
