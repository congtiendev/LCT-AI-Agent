<template>
    <div
        class="overflow-hidden rounded-xl border border-gray-200 bg-white pt-4 dark:border-gray-800 dark:bg-white/[0.03]">
        <!-- Table Controls -->
        <div class="mb-4 flex flex-col gap-2 px-4 sm:flex-row sm:items-center sm:justify-between">
            <div class="flex items-center gap-3">
                <span class="text-gray-500 dark:text-gray-400">Show</span>
                <div class="relative z-20 bg-transparent">
                    <select v-model="perPage"
                        class="h-9 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none py-2 pl-3 pr-8 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800">
                        <option value="10" class="text-gray-500 dark:bg-gray-900 dark:text-gray-400">10</option>
                        <option value="8" class="text-gray-500 dark:bg-gray-900 dark:text-gray-400">8</option>
                        <option value="5" class="text-gray-500 dark:bg-gray-900 dark:text-gray-400">5</option>
                    </select>
                    <span class="absolute right-2 top-1/2 z-30 -translate-y-1/2 text-gray-500 dark:text-gray-400">
                        <svg class="stroke-current" width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M3.8335 5.9165L8.00016 10.0832L12.1668 5.9165" stroke="" stroke-width="1.2"
                                stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </span>
                </div>
                <span class="text-gray-500 dark:text-gray-400">entries</span>
            </div>

            <div class="flex flex-col gap-3 sm:flex-row sm:items-center">
                <div class="relative">
                    <button class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">
                        <svg class="fill-current" width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M3.04199 9.37363C3.04199 5.87693 5.87735 3.04199 9.37533 3.04199C12.8733 3.04199 15.7087 5.87693 15.7087 9.37363C15.7087 12.8703 12.8733 15.7053 9.37533 15.7053C5.87735 15.7053 3.04199 12.8703 3.04199 9.37363ZM9.37533 1.54199C5.04926 1.54199 1.54199 5.04817 1.54199 9.37363C1.54199 13.6991 5.04926 17.2053 9.37533 17.2053C11.2676 17.2053 13.0032 16.5344 14.3572 15.4176L17.1773 18.238C17.4702 18.5309 17.945 18.5309 18.2379 18.238C18.5308 17.9451 18.5309 17.4703 18.238 17.1773L15.4182 14.3573C16.5367 13.0033 17.2087 11.2669 17.2087 9.37363C17.2087 5.04817 13.7014 1.54199 9.37533 1.54199Z"
                                fill="" />
                        </svg>
                    </button>
                    <input v-model="search" type="text" placeholder="Search..."
                        class="h-11 w-full rounded-lg border border-gray-300 bg-transparent py-2.5 pl-11 pr-4 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 xl:w-[300px]" />
                </div>

                <button
                    class="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-[11px] text-sm font-medium text-gray-700 shadow-theme-xs dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 sm:w-auto"
                    @click="downloadData">
                    Download
                    <svg class="fill-current" width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M10.0018 14.083C9.7866 14.083 9.59255 13.9924 9.45578 13.8472L5.61586 10.0097C5.32288 9.71688 5.32272 9.242 5.61552 8.94902C5.90832 8.65603 6.3832 8.65588 6.67618 8.94868L9.25182 11.5227L9.25182 3.33301C9.25182 2.91879 9.5876 2.58301 10.0018 2.58301C10.416 2.58301 10.7518 2.91879 10.7518 3.33301L10.7518 11.5193L13.3242 8.94866C13.6172 8.65587 14.0921 8.65604 14.3849 8.94903C14.6777 9.24203 14.6775 9.7169 14.3845 10.0097L10.5761 13.8154C10.4385 13.979 10.2323 14.083 10.0018 14.083ZM4.0835 13.333C4.0835 12.9188 3.74771 12.583 3.3335 12.583C2.91928 12.583 2.5835 12.9188 2.5835 13.333V15.1663C2.5835 16.409 3.59086 17.4163 4.8335 17.4163H15.1676C16.4102 17.4163 17.4176 16.409 17.4176 15.1663V13.333C17.4176 12.9188 17.0818 12.583 16.6676 12.583C16.2533 12.583 15.9176 12.9188 15.9176 13.333V15.1663C15.9176 15.5806 15.5818 15.9163 15.1676 15.9163H4.8335C4.41928 15.9163 4.0835 15.5806 4.0835 15.1663V13.333Z"
                            fill="" />
                    </svg>
                </button>
            </div>
        </div>

        <!-- Table -->
        <div class="max-w-full overflow-x-auto">
            <div class="min-w-[1102px]">
                <!-- Table Header -->
                <div class="grid grid-cols-12 border-t border-gray-200 dark:border-gray-800">
                    <div class="col-span-3 flex items-center border-r border-gray-200 px-4 py-3 dark:border-gray-800">
                        <div class="flex w-full cursor-pointer items-center justify-between" @click="sortBy('name')">
                            <div class="flex items-center gap-3">
                                <label
                                    class="flex cursor-pointer select-none items-center text-sm font-medium text-gray-700 dark:text-gray-400">
                                    <span class="relative">
                                        <input type="checkbox" class="sr-only" v-model="selectAll"
                                            @change="toggleSelectAll" />
                                        <span
                                            :class="selectAll ? 'border-brand-500 bg-brand-500' : 'bg-transparent border-gray-300 dark:border-gray-700'"
                                            class="flex h-4 w-4 items-center justify-center rounded-sm border-[1.25px]">
                                            <span :class="selectAll ? '' : 'opacity-0'">
                                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                                    <path d="M10 3L4.5 8.5L2 6" stroke="white" stroke-width="1.6666"
                                                        stroke-linecap="round" stroke-linejoin="round" />
                                                </svg>
                                            </span>
                                        </span>
                                    </span>
                                </label>
                                <p class="text-xs font-medium text-gray-700 dark:text-gray-400">User</p>
                            </div>
                            <span class="flex flex-col gap-0.5">
                                <svg class="fill-gray-300 dark:fill-gray-700" width="8" height="5" viewBox="0 0 8 5"
                                    fill="none">
                                    <path
                                        d="M4.40962 0.585167C4.21057 0.300808 3.78943 0.300807 3.59038 0.585166L1.05071 4.21327C0.81874 4.54466 1.05582 5 1.46033 5H6.53967C6.94418 5 7.18126 4.54466 6.94929 4.21327L4.40962 0.585167Z"
                                        fill="" />
                                </svg>
                                <svg class="fill-gray-300 dark:fill-gray-700" width="8" height="5" viewBox="0 0 8 5"
                                    fill="none">
                                    <path
                                        d="M4.40962 4.41483C4.21057 4.69919 3.78943 4.69919 3.59038 4.41483L1.05071 0.786732C0.81874 0.455343 1.05582 0 1.46033 0H6.53967C6.94418 0 7.18126 0.455342 6.94929 0.786731L4.40962 4.41483Z"
                                        fill="" />
                                </svg>
                            </span>
                        </div>
                    </div>
                    <div class="col-span-3 flex items-center border-r border-gray-200 px-4 py-3 dark:border-gray-800">
                        <div class="flex w-full cursor-pointer items-center justify-between"
                            @click="sortBy('position')">
                            <p class="text-xs font-medium text-gray-700 dark:text-gray-400">Position</p>
                            <span class="flex flex-col gap-0.5">
                                <svg class="fill-gray-300 dark:fill-gray-700" width="8" height="5" viewBox="0 0 8 5"
                                    fill="none">
                                    <path
                                        d="M4.40962 0.585167C4.21057 0.300808 3.78943 0.300807 3.59038 0.585166L1.05071 4.21327C0.81874 4.54466 1.05582 5 1.46033 5H6.53967C6.94418 5 7.18126 4.54466 6.94929 4.21327L4.40962 0.585167Z"
                                        fill="" />
                                </svg>
                                <svg class="fill-gray-300 dark:fill-gray-700" width="8" height="5" viewBox="0 0 8 5"
                                    fill="none">
                                    <path
                                        d="M4.40962 4.41483C4.21057 4.69919 3.78943 4.69919 3.59038 4.41483L1.05071 0.786732C0.81874 0.455343 1.05582 0 1.46033 0H6.53967C6.94418 0 7.18126 0.455342 6.94929 0.786731L4.40962 4.41483Z"
                                        fill="" />
                                </svg>
                            </span>
                        </div>
                    </div>
                    <div class="col-span-2 flex items-center border-r border-gray-200 px-4 py-3 dark:border-gray-800">
                        <div class="flex w-full cursor-pointer items-center justify-between" @click="sortBy('salary')">
                            <p class="text-xs font-medium text-gray-700 dark:text-gray-400">Salary</p>
                            <span class="flex flex-col gap-0.5">
                                <svg class="fill-gray-300 dark:fill-gray-700" width="8" height="5" viewBox="0 0 8 5"
                                    fill="none">
                                    <path
                                        d="M4.40962 0.585167C4.21057 0.300808 3.78943 0.300807 3.59038 0.585166L1.05071 4.21327C0.81874 4.54466 1.05582 5 1.46033 5H6.53967C6.94418 5 7.18126 4.54466 6.94929 4.21327L4.40962 0.585167Z"
                                        fill="" />
                                </svg>
                                <svg class="fill-gray-300 dark:fill-gray-700" width="8" height="5" viewBox="0 0 8 5"
                                    fill="none">
                                    <path
                                        d="M4.40962 4.41483C4.21057 4.69919 3.78943 4.69919 3.59038 4.41483L1.05071 0.786732C0.81874 0.455343 1.05582 0 1.46033 0H6.53967C6.94418 0 7.18126 0.455342 6.94929 0.786731L4.40962 4.41483Z"
                                        fill="" />
                                </svg>
                            </span>
                        </div>
                    </div>
                    <div class="col-span-2 flex items-center border-r border-gray-200 px-4 py-3 dark:border-gray-800">
                        <div class="flex w-full cursor-pointer items-center justify-between" @click="sortBy('office')">
                            <p class="text-xs font-medium text-gray-700 dark:text-gray-400">Office</p>
                            <span class="flex flex-col gap-0.5">
                                <svg class="fill-gray-300 dark:fill-gray-700" width="8" height="5" viewBox="0 0 8 5"
                                    fill="none">
                                    <path
                                        d="M4.40962 0.585167C4.21057 0.300808 3.78943 0.300807 3.59038 0.585166L1.05071 4.21327C0.81874 4.54466 1.05582 5 1.46033 5H6.53967C6.94418 5 7.18126 4.54466 6.94929 4.21327L4.40962 0.585167Z"
                                        fill="" />
                                </svg>
                                <svg class="fill-gray-300 dark:fill-gray-700" width="8" height="5" viewBox="0 0 8 5"
                                    fill="none">
                                    <path
                                        d="M4.40962 4.41483C4.21057 4.69919 3.78943 4.69919 3.59038 4.41483L1.05071 0.786732C0.81874 0.455343 1.05582 0 1.46033 0H6.53967C6.94418 0 7.18126 0.455342 6.94929 0.786731L4.40962 4.41483Z"
                                        fill="" />
                                </svg>
                            </span>
                        </div>
                    </div>
                    <div class="col-span-1 flex items-center border-r border-gray-200 px-4 py-3 dark:border-gray-800">
                        <div class="flex w-full cursor-pointer items-center justify-between" @click="sortBy('status')">
                            <p class="text-xs font-medium text-gray-700 dark:text-gray-400">Status</p>
                            <span class="flex flex-col gap-0.5">
                                <svg class="fill-gray-300 dark:fill-gray-700" width="8" height="5" viewBox="0 0 8 5"
                                    fill="none">
                                    <path
                                        d="M4.40962 0.585167C4.21057 0.300808 3.78943 0.300807 3.59038 0.585166L1.05071 4.21327C0.81874 4.54466 1.05582 5 1.46033 5H6.53967C6.94418 5 7.18126 4.54466 6.94929 4.21327L4.40962 0.585167Z"
                                        fill="" />
                                </svg>
                                <svg class="fill-gray-300 dark:fill-gray-700" width="8" height="5" viewBox="0 0 8 5"
                                    fill="none">
                                    <path
                                        d="M4.40962 4.41483C4.21057 4.69919 3.78943 4.69919 3.59038 4.41483L1.05071 0.786732C0.81874 0.455343 1.05582 0 1.46033 0H6.53967C6.94418 0 7.18126 0.455342 6.94929 0.786731L4.40962 4.41483Z"
                                        fill="" />
                                </svg>
                            </span>
                        </div>
                    </div>
                    <div class="col-span-1 flex items-center px-4 py-3">
                        <p class="text-xs font-medium text-gray-700 dark:text-gray-400">Action</p>
                    </div>
                </div>

                <!-- Table Body -->
                <div v-for="person in paginatedData" :key="person.id"
                    :class="selectedRows.includes(person.id) ? 'bg-gray-50 dark:bg-gray-900' : ''"
                    class="grid grid-cols-12 border-t border-gray-100 dark:border-gray-800">
                    <div class="col-span-3 flex items-center border-r border-gray-100 px-4 py-3 dark:border-gray-800">
                        <div class="flex gap-3">
                            <div class="mt-1">
                                <label
                                    class="flex cursor-pointer select-none items-center text-sm font-medium text-gray-700 dark:text-gray-400">
                                    <span class="relative">
                                        <input type="checkbox" class="sr-only" :value="person.id"
                                            v-model="selectedRows" />
                                        <span
                                            :class="selectedRows.includes(person.id) ? 'border-brand-500 bg-brand-500' : 'bg-transparent border-gray-300 dark:border-gray-700'"
                                            class="flex h-4 w-4 items-center justify-center rounded-sm border-[1.25px]">
                                            <span :class="selectedRows.includes(person.id) ? '' : 'opacity-0'">
                                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                                    <path d="M10 3L4.5 8.5L2 6" stroke="white" stroke-width="1.6666"
                                                        stroke-linecap="round" stroke-linejoin="round" />
                                                </svg>
                                            </span>
                                        </span>
                                    </span>
                                </label>
                            </div>
                            <div>
                                <p class="block text-sm font-medium text-gray-800 dark:text-white/90">{{ person.name }}
                                </p>
                                <span class="text-sm text-gray-500 dark:text-gray-400">{{ person.email }}</span>
                            </div>
                        </div>
                    </div>
                    <div class="col-span-3 flex items-center border-r border-gray-100 px-4 py-3 dark:border-gray-800">
                        <p class="text-sm text-gray-700 dark:text-gray-400">{{ person.position }}</p>
                    </div>
                    <div class="col-span-2 flex items-center border-r border-gray-100 px-4 py-3 dark:border-gray-800">
                        <p class="text-sm text-gray-700 dark:text-gray-400">{{ person.salary }}</p>
                    </div>
                    <div class="col-span-2 flex items-center border-r border-gray-100 px-4 py-3 dark:border-gray-800">
                        <p class="text-sm text-gray-700 dark:text-gray-400">{{ person.office }}</p>
                    </div>
                    <div class="col-span-1 flex items-center border-r border-gray-100 px-4 py-3 dark:border-gray-800">
                        <p :class="{
                            'bg-success-50 dark:bg-success-500/15 text-success-700 dark:text-success-500': person.status === 'Hired',
                            'bg-warning-50 dark:bg-warning-500/15 text-warning-700 dark:text-orange-400': person.status === 'In Progress',
                            'bg-error-50 dark:bg-error-500/15 text-error-700 dark:text-error-500': person.status === 'Pending'
                        }" class="rounded-full px-2 py-0.5 text-xs font-medium">
                            {{ person.status }}
                        </p>
                    </div>
                    <div class="col-span-1 flex items-center px-4 py-3">
                        <div class="flex w-full items-center gap-2">
                            <button
                                class="text-gray-500 hover:text-error-500 dark:text-gray-400 dark:hover:text-error-500"
                                @click="deletePerson(person.id)">
                                <svg class="fill-current" width="21" height="21" viewBox="0 0 21 21" fill="none">
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                        d="M7.04142 4.29199C7.04142 3.04935 8.04878 2.04199 9.29142 2.04199H11.7081C12.9507 2.04199 13.9581 3.04935 13.9581 4.29199V4.54199H16.1252H17.166C17.5802 4.54199 17.916 4.87778 17.916 5.29199C17.916 5.70621 17.5802 6.04199 17.166 6.04199H16.8752V8.74687V13.7469V16.7087C16.8752 17.9513 15.8678 18.9587 14.6252 18.9587H6.37516C5.13252 18.9587 4.12516 17.9513 4.12516 16.7087V13.7469V8.74687V6.04199H3.8335C3.41928 6.04199 3.0835 5.70621 3.0835 5.29199C3.0835 4.87778 3.41928 4.54199 3.8335 4.54199H4.87516H7.04142V4.29199ZM15.3752 13.7469V8.74687V6.04199H13.9581H13.2081H7.79142H7.04142H5.62516V8.74687V13.7469V16.7087C5.62516 17.1229 5.96095 17.4587 6.37516 17.4587H14.6252C15.0394 17.4587 15.3752 17.1229 15.3752 16.7087V13.7469ZM8.54142 4.54199H12.4581V4.29199C12.4581 3.87778 12.1223 3.54199 11.7081 3.54199H9.29142C8.87721 3.54199 8.54142 3.87778 8.54142 4.29199V4.54199ZM8.8335 8.50033C9.24771 8.50033 9.5835 8.83611 9.5835 9.25033V14.2503C9.5835 14.6645 9.24771 15.0003 8.8335 15.0003C8.41928 15.0003 8.0835 14.6645 8.0835 14.2503V9.25033C8.0835 8.83611 8.41928 8.50033 8.8335 8.50033ZM12.9168 9.25033C12.9168 8.83611 12.581 8.50033 12.1668 8.50033C11.7526 8.50033 11.4168 8.83611 11.4168 9.25033V14.2503C11.4168 14.6645 11.7526 15.0003 12.1668 15.0003C12.581 15.0003 12.9168 14.6645 12.9168 14.2503V9.25033Z"
                                        fill="" />
                                </svg>
                            </button>
                            <button
                                class="text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white/90"
                                @click="editPerson(person.id)">
                                <svg class="fill-current" width="21" height="21" viewBox="0 0 21 21" fill="none">
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                        d="M17.0911 3.53206C16.2124 2.65338 14.7878 2.65338 13.9091 3.53206L5.6074 11.8337C5.29899 12.1421 5.08687 12.5335 4.99684 12.9603L4.26177 16.445C4.20943 16.6931 4.286 16.9508 4.46529 17.1301C4.64458 17.3094 4.90232 17.3859 5.15042 17.3336L8.63507 16.5985C9.06184 16.5085 9.45324 16.2964 9.76165 15.988L18.0633 7.68631C18.942 6.80763 18.942 5.38301 18.0633 4.50433L17.0911 3.53206ZM14.9697 4.59272C15.2626 4.29982 15.7375 4.29982 16.0304 4.59272L17.0027 5.56499C17.2956 5.85788 17.2956 6.33276 17.0027 6.62565L16.1043 7.52402L14.0714 5.49109L14.9697 4.59272ZM13.0107 6.55175L6.66806 12.8944C6.56526 12.9972 6.49455 13.1277 6.46454 13.2699L5.96704 15.6283L8.32547 15.1308C8.46772 15.1008 8.59819 15.0301 8.70099 14.9273L15.0436 8.58468L13.0107 6.55175Z"
                                        fill="" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Pagination -->
        <div class="border-t border-gray-100 py-4 pl-[18px] pr-4 dark:border-gray-800">
            <div class="flex flex-col xl:flex-row xl:items-center xl:justify-between">
                <p
                    class="border-b border-gray-100 pb-3 text-center text-sm font-medium text-gray-500 dark:border-gray-800 dark:text-gray-400 xl:border-b-0 xl:pb-0 xl:text-left">
                    Showing {{ startEntry }} to {{ endEntry }} of {{ totalEntries }} entries
                </p>

                <div class="flex items-center justify-center gap-0.5 pt-3 xl:justify-end xl:pt-0">
                    <button @click="prevPage" :disabled="currentPage === 1"
                        class="mr-2.5 flex items-center justify-center rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-gray-700 shadow-theme-xs hover:bg-gray-50 disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03]">
                        Previous
                    </button>

                    <button @click="goToPage(1)"
                        :class="currentPage === 1 ? 'bg-blue-500/[0.08] text-brand-500' : 'text-gray-700 dark:text-gray-400'"
                        class="flex h-10 w-10 items-center justify-center rounded-lg text-sm font-medium hover:bg-blue-500/[0.08] hover:text-brand-500 dark:hover:text-brand-500">
                        1
                    </button>

                    <span v-if="currentPage > 3"
                        class="flex h-10 w-10 items-center justify-center rounded-lg hover:bg-blue-500/[0.08] hover:text-brand-500 dark:hover:text-brand-500">
                        ...
                    </span>

                    <button v-for="page in pagesAroundCurrent" :key="page" @click="goToPage(page)"
                        :class="currentPage === page ? 'bg-blue-500/[0.08] text-brand-500' : 'text-gray-700 dark:text-gray-400'"
                        class="flex h-10 w-10 items-center justify-center rounded-lg text-sm font-medium hover:bg-blue-500/[0.08] hover:text-brand-500 dark:hover:text-brand-500">
                        {{ page }}
                    </button>

                    <span v-if="currentPage < totalPages - 2"
                        class="flex h-10 w-10 items-center justify-center rounded-lg text-sm font-medium text-gray-700 hover:bg-blue-500/[0.08] hover:text-brand-500 dark:text-gray-400 dark:hover:text-brand-500">
                        ...
                    </span>

                    <button @click="nextPage" :disabled="currentPage === totalPages"
                        class="ml-2.5 flex items-center justify-center rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-gray-700 shadow-theme-xs hover:bg-gray-50 disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03]">
                        Next
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import type { Employee } from '~/types/employee'

// Reactive data
const search = ref('')
const sortColumn = ref<keyof Employee>('name')
const sortDirection = ref<'asc' | 'desc'>('asc')
const currentPage = ref(1)
const perPage = ref(10)
const selectedRows = ref<number[]>([])
const selectAll = ref(false)

// Sample data with complete dataset including status and email
const data: Employee[] = [
    {
        id: 1,
        name: 'Lindsey Curtis',
        email: 'demoemail@gmail.com',
        position: 'Sales Assistant',
        office: 'New York',
        age: 33,
        startDate: '12 Feb, 2027',
        status: 'Hired',
        salary: '$168,500',
    },
    {
        id: 2,
        name: 'Kaiya George',
        email: 'demoemail@gmail.com',
        position: 'Chief Executive Officer',
        office: 'San Francisco',
        age: 66,
        startDate: '13 Mar, 2027',
        status: 'In Progress',
        salary: '$23,500',
    },
    {
        id: 3,
        name: 'Zain Geidt',
        email: 'demoemail@gmail.com',
        position: 'Junior Technical Author',
        office: 'Tokyo',
        age: 48,
        startDate: '19 Mar, 2027',
        status: 'In Progress',
        salary: '$12,500',
    },
    {
        id: 4,
        name: 'Abram Schleifer',
        email: 'demoemail@gmail.com',
        position: 'Software Engineer',
        office: 'Edinburgh',
        age: 57,
        startDate: '25 Apr, 2027',
        status: 'Hired',
        salary: '$89,500',
    },
    {
        id: 5,
        name: 'Carla George',
        email: 'demoemail@gmail.com',
        position: 'Integration Specialist',
        office: 'London',
        age: 45,
        startDate: '11 May, 2027',
        status: 'Pending',
        salary: '$15,500',
    },
    {
        id: 6,
        name: 'Emery Culhane',
        email: 'demoemail@gmail.com',
        position: 'Pre-Sales Support',
        office: 'New York',
        age: 45,
        startDate: '29 Jun, 2027',
        status: 'Hired',
        salary: '$23,500',
    },
    {
        id: 7,
        name: 'Livia Donin',
        email: 'demoemail@gmail.com',
        position: 'Sales Assistant',
        office: 'London',
        age: 26,
        startDate: '22 Jul, 2027',
        status: 'Hired',
        salary: '$58,500',
    },
    {
        id: 8,
        name: 'Miracle Bator',
        email: 'demoemail@gmail.com',
        position: 'Software Engineer',
        office: 'Tokyo',
        age: 38,
        startDate: '05 Aug, 2027',
        status: 'In Progress',
        salary: '$34,900',
    },
    {
        id: 9,
        name: 'Lincoln Herwitz',
        email: 'demoemail@gmail.com',
        position: 'Senior Javascript Developer',
        office: 'London',
        age: 34,
        startDate: '09 Sep, 2027',
        status: 'Pending',
        salary: '$18,300',
    },
    {
        id: 10,
        name: 'Ekstrom Bothman',
        email: 'demoemail@gmail.com',
        position: 'Sales Assistant',
        office: 'San Francisco',
        age: 53,
        startDate: '15 Nov, 2027',
        status: 'Hired',
        salary: '$19,200',
    }
]

// Computed properties
const filteredData = computed(() => {
    const searchLower = search.value.toLowerCase()
    return data
        .filter(
            (person) =>
                person.name.toLowerCase().includes(searchLower) ||
                person.position.toLowerCase().includes(searchLower) ||
                person.office.toLowerCase().includes(searchLower)
        )
        .sort((a, b) => {
            const modifier = sortDirection.value === 'asc' ? 1 : -1
            const aVal = a[sortColumn.value]
            const bVal = b[sortColumn.value]

            if (aVal == null && bVal == null) return 0
            if (aVal == null) return 1 * modifier
            if (bVal == null) return -1 * modifier
            if (aVal < bVal) return -1 * modifier
            if (aVal > bVal) return 1 * modifier
            return 0
        })
})

const paginatedData = computed(() => {
    const start = (currentPage.value - 1) * perPage.value
    const end = start + perPage.value
    return filteredData.value.slice(start, end)
})

const totalEntries = computed(() => filteredData.value.length)
const startEntry = computed(() => (currentPage.value - 1) * perPage.value + 1)
const endEntry = computed(() => {
    const end = currentPage.value * perPage.value
    return end > totalEntries.value ? totalEntries.value : end
})
const totalPages = computed(() => Math.ceil(filteredData.value.length / perPage.value))

const pagesAroundCurrent = computed(() => {
    const pages: number[] = []
    const startPage = Math.max(2, currentPage.value - 2)
    const endPage = Math.min(totalPages.value - 1, currentPage.value + 2)
    for (let i = startPage; i <= endPage; i++) {
        pages.push(i)
    }
    return pages
})

// Methods
const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages.value) {
        currentPage.value = page
    }
}

const nextPage = () => {
    if (currentPage.value < totalPages.value) {
        currentPage.value++
    }
}

const prevPage = () => {
    if (currentPage.value > 1) {
        currentPage.value--
    }
}

const sortBy = (column: keyof Employee) => {
    if (sortColumn.value === column) {
        sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
    } else {
        sortDirection.value = 'asc'
        sortColumn.value = column
    }
}

const toggleSelectAll = () => {
    if (selectAll.value) {
        selectedRows.value = paginatedData.value.map(item => item.id)
    } else {
        selectedRows.value = []
    }
}

const deletePerson = (id: number) => {
    console.log('Delete person with id:', id)
    // Implement delete logic here
}

const editPerson = (id: number) => {
    console.log('Edit person with id:', id)
    // Implement edit logic here
}

const downloadData = () => {
    console.log('Download data')
    // Implement download logic here
}

// Watch for changes
watch([search, perPage], () => {
    currentPage.value = 1
})

watch(selectedRows, () => {
    selectAll.value = selectedRows.value.length === paginatedData.value.length && paginatedData.value.length > 0
}, { deep: true })
</script>
