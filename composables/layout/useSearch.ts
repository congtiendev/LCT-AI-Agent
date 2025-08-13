// composables/useSearch.ts
export interface SearchResult {
  id: string | number
  title: string
  description?: string
  url?: string
  type?: 'page' | 'user' | 'document' | 'action'
  icon?: string
  category?: string
}

export interface SearchOptions {
  minLength?: number
  debounceMs?: number
  maxResults?: number
  categories?: string[]
}

export interface SearchState {
  searchQuery: Ref<string>
  searchResults: Ref<readonly SearchResult[]>
  isSearching: Ref<boolean>
  hasResults: Ref<boolean>
  handleSearch: (query?: string) => Promise<void>
  clearSearch: () => void
  clearResults: () => void
  setQuery: (query: string) => void
}

export const useSearch = (options: SearchOptions = {}): SearchState => {
  const {
    minLength = 2,
    debounceMs = 300,
    maxResults = 10,
    categories = [],
  } = options

  const searchQuery = ref<string>('')
  const searchResults = ref<SearchResult[]>([])
  const isSearching = ref<boolean>(false)
  const hasResults = computed<boolean>(() => searchResults.value.length > 0)

  // Mock search data - replace with actual API call
  const mockSearchData: SearchResult[] = [
    {
      id: 1,
      title: 'Dashboard',
      description: 'Main dashboard page',
      url: '/dashboard',
      type: 'page',
      category: 'navigation',
    },
    {
      id: 2,
      title: 'Analytics',
      description: 'View analytics and reports',
      url: '/analytics',
      type: 'page',
      category: 'navigation',
    },
    {
      id: 3,
      title: 'User Profile',
      description: 'Manage your profile settings',
      url: '/profile',
      type: 'page',
      category: 'user',
    },
    {
      id: 4,
      title: 'Settings',
      description: 'Application settings',
      url: '/settings',
      type: 'page',
      category: 'system',
    },
    {
      id: 5,
      title: 'Create New Project',
      description: 'Start a new project',
      type: 'action',
      category: 'actions',
    },
  ]

  const performSearch = async (query: string): Promise<SearchResult[]> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 100))

    if (!query || query.length < minLength) {
      return []
    }

    // Mock search logic - replace with actual search API
    const filtered = mockSearchData.filter((item) => {
      const matchesQuery =
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.description?.toLowerCase().includes(query.toLowerCase())

      const matchesCategory =
        categories.length === 0 ||
        (item.category && categories.includes(item.category))

      return matchesQuery && matchesCategory
    })

    return filtered.slice(0, maxResults)
  }

  const handleSearch = async (query?: string): Promise<void> => {
    const searchTerm = query ?? searchQuery.value

    if (!searchTerm || searchTerm.length < minLength) {
      searchResults.value = []
      return
    }

    isSearching.value = true

    try {
      const results = await performSearch(searchTerm)
      searchResults.value = results
    } catch (error) {
      console.error('Search error:', error)
      searchResults.value = []
    } finally {
      isSearching.value = false
    }
  }

  const clearSearch = (): void => {
    searchQuery.value = ''
    searchResults.value = []
    isSearching.value = false
  }

  const clearResults = (): void => {
    searchResults.value = []
  }

  const setQuery = (query: string): void => {
    searchQuery.value = query
  }

  // Debounced search
  const debouncedSearch = useDebounceFn(handleSearch, debounceMs)

  // Watch for query changes and trigger debounced search
  watch(searchQuery, (newQuery: string) => {
    if (newQuery.length >= minLength) {
      debouncedSearch()
    } else {
      clearResults()
    }
  })

  // Handle keyboard shortcuts
  const handleKeyboardShortcuts = (event: KeyboardEvent): void => {
    // CMD/Ctrl + K to focus search
    if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
      event.preventDefault()
      // Focus search input - you can emit event or use template ref
      const searchInput = document.querySelector(
        'input[type="search"], input[placeholder*="Search"]'
      ) as HTMLInputElement
      if (searchInput) {
        searchInput.focus()
      }
    }

    // Escape to clear search
    if (event.key === 'Escape') {
      clearSearch()
    }
  }

  onMounted(() => {
    if (process.client) {
      document.addEventListener('keydown', handleKeyboardShortcuts)
    }
  })

  onUnmounted(() => {
    if (process.client) {
      document.removeEventListener('keydown', handleKeyboardShortcuts)
    }
  })

  return {
    searchQuery,
    searchResults: readonly(searchResults),
    isSearching: readonly(isSearching),
    hasResults,
    handleSearch,
    clearSearch,
    clearResults,
    setQuery,
  }
}

// Helper composable for debouncing
function useDebounceFn<T extends (...args: any[]) => any>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout | null = null

  return (...args: Parameters<T>): void => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    timeoutId = setTimeout(() => {
      fn(...args)
    }, delay)
  }
}
