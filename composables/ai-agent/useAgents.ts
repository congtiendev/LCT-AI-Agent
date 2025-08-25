// composables/useAgents.ts - Updated with Card View Support
import type {
  Agent,
  CreateAgentRequest,
  UpdateAgentRequest,
} from '~/types/agents'

export const useAgents = () => {
  // Get store instance
  const agentsStore = useAgentsStore()

  // Reactive state from store
  const { agents, loading, error, agentCount, publishedCount, draftCount } =
    storeToRefs(agentsStore)

  // Store actions
  const {
    initializeStore,
    createAgent: storeCreateAgent,
    updateAgent: storeUpdateAgent,
    deleteAgent: storeDeleteAgent,
    toggleAgentStatus: storeToggleStatus,
    clearError,
  } = agentsStore

  // Local reactive state
  const showCreateForm = ref(false)
  const editingAgent = ref<Agent | null>(null)
  const selectedAgents = ref<string[]>([])
  const tabView = ref<'card' | 'table'>('card')
  const searchQuery = ref('')
  const sortField = ref<string>('created_at')
  const sortDirection = ref<'asc' | 'desc'>('desc')

  // Table column configuration
  const agentColumns = [
    {
      key: 'name',
      label: 'Name',
      sortable: true,
      type: 'string' as const,
    },
    {
      key: 'description',
      label: 'Description',
      sortable: false,
      type: 'string' as const,
    },
    {
      key: 'published',
      label: 'Status',
      sortable: true,
      type: 'boolean' as const,
    },
    {
      key: 'created_at',
      label: 'Created',
      sortable: true,
      type: 'date' as const,
    },
    {
      key: 'actions',
      label: 'Actions',
      sortable: false,
      type: 'string' as const,
    },
  ]

  // Computed values
  const hasSelectedAgents = computed(() => selectedAgents.value.length > 0)
  const selectedAgentsCount = computed(() => selectedAgents.value.length)

  // Search and filter functionality
  const filteredAgents = computed(() => {
    let result = [...agents.value]

    // Apply search filter
    if (searchQuery.value.trim()) {
      const query = searchQuery.value.toLowerCase().trim()
      result = result.filter(
        (agent) =>
          agent.name.toLowerCase().includes(query) ||
          agent.description.toLowerCase().includes(query) ||
          agent.id.toLowerCase().includes(query)
      )
    }

    // Apply sorting
    result.sort((a, b) => {
      let aValue: any = a[sortField.value as keyof Agent]
      let bValue: any = b[sortField.value as keyof Agent]

      // Handle different data types
      if (sortField.value === 'created_at') {
        aValue = new Date(aValue).getTime()
        bValue = new Date(bValue).getTime()
      } else if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase()
        bValue = bValue.toLowerCase()
      } else if (typeof aValue === 'boolean') {
        aValue = aValue ? 1 : 0
        bValue = bValue ? 1 : 0
      }

      if (sortDirection.value === 'asc') {
        return aValue > bValue ? 1 : aValue < bValue ? -1 : 0
      } else {
        return aValue < bValue ? 1 : aValue > bValue ? -1 : 0
      }
    })

    return result
  })

  // Business logic methods
  const initialize = async (): Promise<void> => {
    try {
      await initializeStore()
    } catch (error) {
      console.error('Failed to initialize agents:', error)
    }
  }

  const openCreateForm = (): void => {
    showCreateForm.value = true
    editingAgent.value = null
  }

  const openEditForm = (agent: Agent): void => {
    editingAgent.value = { ...agent }
    showCreateForm.value = false
  }

  const closeForm = (): void => {
    showCreateForm.value = false
    editingAgent.value = null
  }

  const handleCreateAgent = async (
    agentData: CreateAgentRequest
  ): Promise<boolean> => {
    try {
      const result = await storeCreateAgent(agentData)
      if (result) {
        closeForm()
        return true
      }
      return false
    } catch (error) {
      console.error('Failed to create agent:', error)
      return false
    }
  }

  const handleUpdateAgent = async (
    agentData: UpdateAgentRequest
  ): Promise<boolean> => {
    if (!editingAgent.value) return false

    try {
      const result = await storeUpdateAgent(editingAgent.value.id, agentData)
      if (result) {
        closeForm()
        return true
      }
      return false
    } catch (error) {
      console.error('Failed to update agent:', error)
      return false
    }
  }

  const handleSubmitForm = async (
    agentData: CreateAgentRequest | UpdateAgentRequest
  ): Promise<boolean> => {
    if (editingAgent.value) {
      return await handleUpdateAgent(agentData as UpdateAgentRequest)
    } else {
      return await handleCreateAgent(agentData as CreateAgentRequest)
    }
  }

  const handleDeleteAgent = async (agent: Agent): Promise<boolean> => {
    const confirmed = confirm(
      `Are you sure you want to delete "${agent.name}"?`
    )
    if (!confirmed) return false

    try {
      const success = await storeDeleteAgent(agent.id)
      if (success) {
        // Remove from selected if it was selected
        selectedAgents.value = selectedAgents.value.filter(
          (id) => id !== agent.id
        )
      }
      return success
    } catch (error) {
      console.error('Failed to delete agent:', error)
      return false
    }
  }

  const handleToggleStatus = async (agent: Agent): Promise<boolean> => {
    try {
      const result = await storeToggleStatus(agent.id)
      return !!result
    } catch (error) {
      console.error('Failed to toggle agent status:', error)
      return false
    }
  }

  const handleBulkDelete = async (): Promise<boolean> => {
    if (!hasSelectedAgents.value) return false

    const selectedIds = [...selectedAgents.value] // Copy the array
    const confirmed = confirm(
      `Are you sure you want to delete ${selectedIds.length} agents?`
    )
    if (!confirmed) return false

    try {
      let successCount = 0
      for (const agentId of selectedIds) {
        const success = await storeDeleteAgent(agentId)
        if (success) successCount++
      }

      // Clear selection after bulk operation
      selectedAgents.value = []

      return successCount === selectedIds.length
    } catch (error) {
      console.error('Failed to bulk delete agents:', error)
      return false
    }
  }

  const handleSelectionChange = (selected: (string | number)[]): void => {
    selectedAgents.value = selected.map((s) => String(s)) // Convert to string[]
  }

  const handleSort = (column: string, direction: 'asc' | 'desc'): void => {
    sortField.value = column
    sortDirection.value = direction
  }

  // Search functionality
  const clearSearch = (): void => {
    searchQuery.value = ''
  }

  const resetFilters = (): void => {
    searchQuery.value = ''
    sortField.value = 'created_at'
    sortDirection.value = 'desc'
    selectedAgents.value = []
  }

  // Selection helpers
  const selectAllVisible = (): void => {
    const visibleIds = filteredAgents.value.map((agent) => agent.id)
    selectedAgents.value = [
      ...new Set([...selectedAgents.value, ...visibleIds]),
    ]
  }

  const deselectAllVisible = (): void => {
    const visibleIds = new Set(filteredAgents.value.map((agent) => agent.id))
    selectedAgents.value = selectedAgents.value.filter(
      (id) => !visibleIds.has(id)
    )
  }

  const clearSelection = (): void => {
    selectedAgents.value = []
  }

  // View helpers
  const viewAgentDetails = (agent: Agent): void => {
    navigateTo(`/ai-agent/${agent.id}`)
  }

  // Export functionality
  const handleExport = (): void => {
    try {
      const dataToExport =
        selectedAgents.value.length > 0
          ? agents.value.filter((agent) =>
              selectedAgents.value.includes(agent.id)
            )
          : filteredAgents.value

      const csvContent = generateCSV(dataToExport)
      downloadCSV(csvContent, 'agents.csv')
    } catch (error) {
      console.error('Failed to export agents:', error)
    }
  }

  const generateCSV = (data: Agent[]): string => {
    const headers = ['ID', 'Name', 'Description', 'Status', 'Created At']
    const rows = data.map((agent) => [
      agent.id,
      `"${agent.name}"`,
      `"${agent.description.replace(/"/g, '""')}"`, // Escape quotes
      agent.published ? 'Published' : 'Draft',
      formatDate(agent.created_at),
    ])

    return [headers.join(','), ...rows.map((row) => row.join(','))].join('\n')
  }

  const downloadCSV = (content: string, filename: string): void => {
    const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', filename)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  // Utility functions
  const formatDate = (date: Date | string): string => {
    const d = new Date(date)
    return d.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  const formatDateTime = (date: Date | string): string => {
    const d = new Date(date)
    return d.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const getStatusBadgeClass = (published: boolean): string => {
    return published
      ? 'bg-green-100 text-green-800 dark:bg-green-500/15 dark:text-green-500'
      : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-500/15 dark:text-yellow-400'
  }

  const getStatusText = (published: boolean): string => {
    return published ? 'Published' : 'Draft'
  }

  // Error handling
  const dismissError = (): void => {
    clearError()
  }

  const hasError = computed(() => !!error.value)

  // Form state helpers
  const isCreating = computed(() => showCreateForm.value && !editingAgent.value)
  const isEditing = computed(() => !!editingAgent.value)
  const formTitle = computed(() =>
    isEditing.value ? 'Edit Agent' : 'Create Agent'
  )

  // Lifecycle
  onMounted(() => {
    initialize()
  })

  // Cleanup on unmount
  onUnmounted(() => {
    selectedAgents.value = []
    closeForm()
    clearSearch()
  })

  return {
    // Reactive state
    tabView,
    agents: readonly(agents),
    loading: readonly(loading),
    error: readonly(error),
    agentCount: readonly(agentCount),
    publishedCount: readonly(publishedCount),
    draftCount: readonly(draftCount),

    // Local state
    showCreateForm: readonly(showCreateForm),
    editingAgent: readonly(editingAgent),
    selectedAgents: readonly(selectedAgents),
    searchQuery,
    sortField: readonly(sortField),
    sortDirection: readonly(sortDirection),

    // Configuration
    agentColumns,

    // Computed
    hasSelectedAgents,
    selectedAgentsCount,
    hasError,
    isCreating,
    isEditing,
    formTitle,
    filteredAgents,

    // Methods - Form management
    openCreateForm,
    openEditForm,
    closeForm,
    handleSubmitForm,

    // Methods - CRUD operations
    handleDeleteAgent,
    handleToggleStatus,
    handleBulkDelete,

    // Methods - UI interactions
    handleSelectionChange,
    handleSort,
    viewAgentDetails,
    handleExport,
    dismissError,

    // Methods - Search and filtering
    clearSearch,
    resetFilters,
    selectAllVisible,
    deselectAllVisible,
    clearSelection,

    // Utilities
    formatDate,
    formatDateTime,
    getStatusBadgeClass,
    getStatusText,

    // Initialization
    initialize,
  }
}
