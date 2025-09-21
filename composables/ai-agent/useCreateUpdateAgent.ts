import type { Agent } from '~/types/agents'
import type { Topics } from '~/types/topics'
import type { Documents } from '~/types/documents'

export const useCreateUpdateAgent = () => {
  // Get store instance
  const agentsStore = useAgentsStore()
  const topicsStore = useTopicsStore()
  const documentsStore = useDocumentsStore()
  // Reactive state from store
  const {
    agents,
    selectedAgent,
    selectedTopics,
    selectedDocuments,
    loading,
    error,
    agentCount,
    publishedCount,
    draftCount,
  } = storeToRefs(agentsStore)

  // Reactive state from topics store
  const { topics } = storeToRefs(topicsStore)
  const { fileTypes, fileAccept, documents } = storeToRefs(documentsStore)

  // Store actions
  const {
    initializeStore,
    fetchAgents,
    createAgent: storeCreateAgent,
    updateAgent: storeUpdateAgent,
    deleteAgent: storeDeleteAgent,
    toggleAgentStatus: storeToggleStatus,
    clearError,
  } = agentsStore

  const createType = ref<'template' | 'custom'>('template')
  const currentStep = ref(1)
  const totalSteps = 4

  const stepLabels = [
    {
      icon: `<circle cx="12" cy="12" r="10" />
              <path d="M12 16v-4" />
              <path d="M12 8h.01" />`,
      label: 'Basic Info',
    },
    {
      icon: `<path d="M12 7v14"/><path d="M16 12h2"/><path d="M16 8h2"/><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/><path d="M6 12h2"/><path d="M6 8h2"/>`,
      label: 'Topics',
    },
    {
      icon: `<path d="m16 6-8.414 8.586a2 2 0 0 0 2.829 2.829l8.414-8.586a4 4 0 1 0-5.657-5.657l-8.379 8.551a6 6 0 1 0 8.485 8.485l8.379-8.551"/>`,
      label: 'Documents',
    },
    {
      icon: `<path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/><circle cx="12" cy="12" r="3"/>`,
      label: 'Preview',
    },
  ]
  const progressPercentage = computed(() => {
    return ((currentStep.value - 1) / (totalSteps - 1)) * 100
  })
  const showChatWithAgent = ref(false)

  const setStep = (step: number) => {
    if (step < 1 || step > totalSteps) return
    switch (step) {
      case 1:
        if (selectedAgent) {
          currentStep.value = step
        }
        break
      case 2:
        if (selectedAgent && currentStep.value >= 1) {
          currentStep.value = step
        }
        break
      case 3:
        if (selectedTopics.value.length > 0 && selectedAgent) {
          currentStep.value = step
        }
        break
      case 4:
        if (selectedDocuments.value.length > 0 && selectedAgent) {
          currentStep.value = step
        }
        break
    }
  }

  const getStepClass = (step: number) => {
    if (step < currentStep.value) {
      return 'step-completed'
    } else if (step === currentStep.value) {
      return 'step-active'
    } else {
      return 'step-pending'
    }
  }
  const changeCreateType = async (type: 'template' | 'custom') => {
    createType.value = type
    if (type === 'custom') {
      await nextTick()
      const element = document.getElementById('agent__custom-build')
      element?.scrollIntoView({ behavior: 'smooth' })
    } else {
      const element = document.getElementById('agent__template')
      element?.scrollIntoView({ behavior: 'smooth' })
    }
  }
  const createAgent = (agentName: string, agentDescription: string) => {
    selectedAgent.value = {
      id: '',
      name: agentName,
      description: agentDescription,
      published: false,
      created_at: new Date().toISOString(),
      updated_at: undefined,
    }
  }
  const selectAgentTemplate = (agent: Agent) => {
    selectedAgent.value = agent
  }

  const unselectAgentTemplate = () => {
    selectedAgent.value = null
  }

  const addTopic = (topic: Topics) => {
    if (!selectedTopics.value.includes(topic)) {
      selectedTopics.value.push(topic)
    } else {
      removeTopic(topic)
    }
  }

  const removeTopic = (topic: Topics) => {
    if (selectedTopics.value.length === 1) {
      alert('At least one topic is required.')
      return
    }
    selectedTopics.value = selectedTopics.value.filter((t) => t.id !== topic.id)
  }

  const uploadDocument = (event: Event) => {
    const fileInput = event.target as HTMLInputElement
    const files = fileInput.files
    const newFiles: Documents[] = []
    if (files) {
      for (const file of files) {
        newFiles.push({
          id: file.name,
          filename: file.name,
          filetype: file.type,
          agent_related: [selectedAgent.value?.name || ''],
          description: '',
          created_at: new Date().toISOString(),
        })
      }
    }
  }

  const selectDocument = (file: Documents) => {
    if (!selectedDocuments.value.includes(file)) {
      selectedDocuments.value.push(file)
    } else {
      removeDocument(file)
    }
  }

  const removeDocument = (file: Documents) => {
    if (selectedDocuments.value.length === 1) {
      alert('At least one document is required.')
      return
    }
    selectedDocuments.value = selectedDocuments.value.filter(
      (f) => f.id !== file.id
    )
  }

  const publishAgent = async () => {
    if (!selectedAgent.value) return
    try {
      selectedAgent.value.published = true
    } catch (error) {
      console.error('Error publishing agent:', error)
    }
  }

  const cancelPublish = async () => {
    if (!selectedAgent.value) return
    try {
      selectedAgent.value.published = false
    } catch (error) {
      console.error('Error canceling publish:', error)
    }
  }

  const conversationPreview = async () => {
    showChatWithAgent.value = true
  }

  return {
    agents,
    topics,
    documents,
    selectedAgent,
    selectedTopics,
    selectedDocuments,
    fileTypes,
    fileAccept,
    uploadDocument,
    selectDocument,
    removeDocument,
    loading,
    error,
    agentCount,
    publishedCount,
    draftCount,
    createType,
    currentStep,
    totalSteps,
    stepLabels,
    progressPercentage,
    showChatWithAgent,
    createAgent,
    publishAgent,
    cancelPublish,
    fetchAgents,
    changeCreateType,
    initializeStore,
    storeCreateAgent,
    storeUpdateAgent,
    storeDeleteAgent,
    storeToggleStatus,
    selectAgentTemplate,
    unselectAgentTemplate,
    addTopic,
    removeTopic,
    setStep,
    getStepClass,
    clearError,
  }
}
