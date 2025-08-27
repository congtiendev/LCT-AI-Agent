// composables/ai-agent/useCreateUpdateAgent.ts - Updated with Card View Support
import type {
  Agent,
  CreateAgentRequest,
  UpdateAgentRequest,
} from '~/types/agents'

export const useCreateUpdateAgent = () => {
  // Get store instance
  const agentsStore = useAgentsStore()

  // Reactive state from store
  const {
    agents,
    selectedAgentTemplate,
    loading,
    error,
    agentCount,
    publishedCount,
    draftCount,
  } = storeToRefs(agentsStore)

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

  const selectAgentTemplate = (agent: Agent) => {
    selectedAgentTemplate.value = agent
  }

  const unselectAgentTemplate = () => {
    selectedAgentTemplate.value = null
  }

  return {
    agents,
    selectedAgentTemplate,
    loading,
    error,
    agentCount,
    publishedCount,
    draftCount,
    createType,
    fetchAgents,
    changeCreateType,
    initializeStore,
    storeCreateAgent,
    storeUpdateAgent,
    storeDeleteAgent,
    storeToggleStatus,
    selectAgentTemplate,
    unselectAgentTemplate,
    clearError,
  }
}
