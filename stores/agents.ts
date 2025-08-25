// stores/agents.ts
import type {
  Agent,
  CreateAgentRequest,
  UpdateAgentRequest,
} from '~/types/agents'
import { AgentService } from '~/services/agentService'

export const useAgentsStore = defineStore('agents', () => {
  // State
  const agents = ref<Agent[]>([])
  const loading = ref<boolean>(false)
  const error = ref<string | null>(null)
  const currentAgent = ref<Agent | null>(null)

  // Getters
  const publishedAgents = computed<Agent[]>(() =>
    agents.value.filter((agent) => agent.published)
  )

  const draftAgents = computed<Agent[]>(() =>
    agents.value.filter((agent) => !agent.published)
  )

  const agentCount = computed<number>(() => agents.value.length)

  const publishedCount = computed<number>(() => publishedAgents.value.length)

  const draftCount = computed<number>(() => draftAgents.value.length)

  // Actions
  const fetchAgents = async (): Promise<void> => {
    try {
      loading.value = true
      error.value = null
      agents.value = await AgentService.getAgents()
    } catch (err) {
      error.value = 'Failed to fetch agents'
      console.error('Fetch agents error:', err)
    } finally {
      loading.value = false
    }
  }

  const getAgentById = async (id: string): Promise<Agent | null> => {
    try {
      loading.value = true
      error.value = null

      // Check if agent is already in store
      const existingAgent = agents.value.find((a) => a.id === id)
      if (existingAgent) {
        return existingAgent
      }

      // Fetch from service
      const agent = await AgentService.getAgentById(id)
      return agent
    } catch (err) {
      error.value = 'Failed to fetch agent'
      console.error('Get agent error:', err)
      return null
    } finally {
      loading.value = false
    }
  }

  const createAgent = async (
    agentData: CreateAgentRequest
  ): Promise<Agent | null> => {
    try {
      loading.value = true
      error.value = null

      const newAgent = await AgentService.createAgent(agentData)

      // Add to store
      agents.value.unshift(newAgent)

      return newAgent
    } catch (err) {
      error.value = 'Failed to create agent'
      console.error('Create agent error:', err)
      return null
    } finally {
      loading.value = false
    }
  }

  const updateAgent = async (
    id: string,
    agentData: UpdateAgentRequest
  ): Promise<Agent | null> => {
    try {
      loading.value = true
      error.value = null

      const updatedAgent = await AgentService.updateAgent(id, agentData)

      // Update in store
      const index = agents.value.findIndex((a) => a.id === id)
      if (index !== -1) {
        agents.value[index] = updatedAgent
      }

      return updatedAgent
    } catch (err) {
      error.value = 'Failed to update agent'
      console.error('Update agent error:', err)
      return null
    } finally {
      loading.value = false
    }
  }

  const deleteAgent = async (id: string): Promise<boolean> => {
    try {
      loading.value = true
      error.value = null

      await AgentService.deleteAgent(id)

      // Remove from store
      agents.value = agents.value.filter((a) => a.id !== id)

      return true
    } catch (err) {
      error.value = 'Failed to delete agent'
      console.error('Delete agent error:', err)
      return false
    } finally {
      loading.value = false
    }
  }

  const toggleAgentStatus = async (id: string): Promise<Agent | null> => {
    try {
      loading.value = true
      error.value = null

      const updatedAgent = await AgentService.toggleAgentStatus(id)

      // Update in store
      const index = agents.value.findIndex((a) => a.id === id)
      if (index !== -1) {
        agents.value[index] = updatedAgent
      }

      return updatedAgent
    } catch (err) {
      error.value = 'Failed to toggle agent status'
      console.error('Toggle status error:', err)
      return null
    } finally {
      loading.value = false
    }
  }

  const searchAgents = async (query: string): Promise<Agent[]> => {
    try {
      loading.value = true
      error.value = null
      return await AgentService.searchAgents(query)
    } catch (err) {
      error.value = 'Failed to search agents'
      console.error('Search agents error:', err)
      return []
    } finally {
      loading.value = false
    }
  }

  const setCurrentAgent = (agent: Agent | null): void => {
    currentAgent.value = agent
  }

  const clearError = (): void => {
    error.value = null
  }

  const resetStore = (): void => {
    agents.value = []
    loading.value = false
    error.value = null
    currentAgent.value = null

    // Reset service data
    AgentService.resetData()
  }

  // Initialize store - fetch agents on first load
  const initializeStore = async (): Promise<void> => {
    if (agents.value.length === 0) {
      await fetchAgents()
    }
  }

  return {
    // State
    agents: readonly(agents),
    loading: readonly(loading),
    error: readonly(error),
    currentAgent: readonly(currentAgent),

    // Getters
    publishedAgents,
    draftAgents,
    agentCount,
    publishedCount,
    draftCount,

    // Actions
    fetchAgents,
    getAgentById,
    createAgent,
    updateAgent,
    deleteAgent,
    toggleAgentStatus,
    searchAgents,
    setCurrentAgent,
    clearError,
    resetStore,
    initializeStore,
  }
})
