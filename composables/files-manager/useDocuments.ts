import { documentService } from '@/services/documentService'
import type {
  FileItem,
  CreateFileDto,
  UpdateFileDto,
  FileFilters,
  TableColumn,
} from '@/types/documents'

export const useDocuments = () => {
  // State
  const files = ref<FileItem[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const selectedFiles = ref<number[]>([])
  const filters = ref<FileFilters>({})
  const tabView = ref<'card' | 'table'>('card')
  const showListAgentsDetail = ref(false)
  const showAddEditFileModal = ref(false)
  const currentFile = ref<FileItem | null>(null)
  const listAgentsDetail = ref<string[]>([])

  // Table configuration
  const columns = ref<TableColumn[]>([
    { key: 'filename', label: 'Filename', type: 'string', sortable: true },
    { key: 'filetype', label: 'Type', type: 'string', sortable: false },
    {
      key: 'agent_related',
      label: 'Agent Related',
      type: 'string',
      sortable: false,
    },
    {
      key: 'description',
      label: 'Description',
      type: 'string',
      sortable: false,
    },
    { key: 'created_at', label: 'Modify Date', type: 'string', sortable: true },
    {
      key: 'actions',
      label: 'Actions',
      sortable: false,
      type: 'string' as const,
    },
  ])

  // Computed
  const hasSelection = computed(() => selectedFiles.value.length > 0)
  const filteredFiles = computed(() => files.value)

  // Actions
  const fetchFiles = async (customFilters?: FileFilters) => {
    try {
      loading.value = true
      error.value = null

      const response = await documentService.getAll(
        customFilters || filters.value
      )
      files.value = response.data
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch files'
      console.error('Fetch files error:', err)
    } finally {
      loading.value = false
    }
  }

  const fetchFile = async (id: number) => {
    try {
      loading.value = true
      error.value = null

      const response = await documentService.getById(id)
      currentFile.value = response.data
      return response.data
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch file'
      console.error('Fetch file error:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const createFile = async (data: CreateFileDto) => {
    try {
      loading.value = true
      error.value = null

      const response = await documentService.create(data)
      files.value.unshift(response.data) // Add to beginning of list
      return response.data
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to create file'
      console.error('Create file error:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const updateFile = async (id: number, data: UpdateFileDto) => {
    try {
      loading.value = true
      error.value = null

      const response = await documentService.update(id, data)

      // Update in list
      const index = files.value.findIndex((f) => f.id === id)
      if (index !== -1) {
        files.value[index] = response.data
      }

      // Update current file if it's the same
      if (currentFile.value?.id === id) {
        currentFile.value = response.data
      }

      return response.data
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to update file'
      console.error('Update file error:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const deleteFile = async (id: number) => {
    try {
      loading.value = true
      error.value = null

      await documentService.delete(id)

      // Remove from list
      files.value = files.value.filter((f) => f.id !== id)

      // Clear current file if it's the deleted one
      if (currentFile.value?.id === id) {
        currentFile.value = null
      }

      // Remove from selection
      selectedFiles.value = selectedFiles.value.filter(
        (fileId) => fileId !== id
      )

      return true
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to delete file'
      console.error('Delete file error:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const bulkDelete = async () => {
    const idsToDelete = [...selectedFiles.value]

    if (idsToDelete.length === 0) {
      throw new Error('No files selected for deletion')
    }

    try {
      loading.value = true
      error.value = null

      await documentService.bulkDelete(idsToDelete)

      // Remove from list
      files.value = files.value.filter((f) => !idsToDelete.includes(f.id))

      // Clear selection
      selectedFiles.value = []

      return true
    } catch (err) {
      error.value =
        err instanceof Error ? err.message : 'Failed to delete files'
      console.error('Bulk delete error:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  // Selection management
  const toggleSelection = (id: number) => {
    const index = selectedFiles.value.indexOf(id)
    if (index > -1) {
      selectedFiles.value.splice(index, 1)
    } else {
      selectedFiles.value.push(id)
    }
  }

  const selectAll = () => {
    selectedFiles.value = files.value.map((f) => f.id)
  }

  const clearSelection = () => {
    selectedFiles.value = []
  }

  const isSelected = (id: number) => {
    return selectedFiles.value.includes(id)
  }

  // Filters
  const applyFilters = async (newFilters: FileFilters) => {
    filters.value = { ...newFilters }
    await fetchFiles()
  }

  const clearFilters = async () => {
    filters.value = {}
    await fetchFiles()
  }

  // Utility methods
  const getFileTypes = () => documentService.getFileTypes()
  const getAgents = () => documentService.getAgents()

  const formatAgents = (agents: string[]) => {
    if (!agents || agents.length === 0) return '-'
    return agents.join(' | ')
  }

  // Reset state
  const reset = () => {
    files.value = []
    currentFile.value = null
    selectedFiles.value = []
    filters.value = {}
    error.value = null
    loading.value = false
  }

  return {
    // State
    files: files,
    currentFile: currentFile,
    loading: readonly(loading),
    error: readonly(error),
    selectedFiles: selectedFiles,
    filters: readonly(filters),
    columns: columns,
    tabView,
    showAddEditFileModal,
    showListAgentsDetail,
    listAgentsDetail,
    // Computed
    hasSelection,
    filteredFiles,

    // Actions
    fetchFiles,
    fetchFile,
    createFile,
    updateFile,
    deleteFile,
    bulkDelete,

    // Selection
    toggleSelection,
    selectAll,
    clearSelection,
    isSelected,

    // Filters
    applyFilters,
    clearFilters,

    // Utilities
    getFileTypes,
    getAgents,
    formatAgents,
    reset,
  }
}
