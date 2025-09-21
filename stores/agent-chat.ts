// stores/agents.ts
import type {
  Agent,
  AgentChat,
  InsightProcessList,
  CreateAgentRequest,
  UpdateAgentRequest,
} from '~/types/agents'
import type { Topics } from '~/types/topics'
import type { Documents } from '~/types/documents'

import { AgentService } from '~/services/agentService'

export const useAgentChatStore = defineStore('agentChat', () => {
  // State
  const authStore = useAuthStore()
  const currentUser = computed(() => authStore.user!)
  const currentChatList = ref<AgentChat[]>([])
  const agentInsightProcessList = ref<InsightProcessList[]>([])
  const loading = ref<boolean>(false)
  const error = ref<string | null>(null)

  // Actions
  const generateUniqueId = (): string => {
    return `chat_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  const chatWithAgent = async (agentId: string, message: string) => {
    try {
      loading.value = true
      error.value = null

      currentChatList.value.push({
        id: generateUniqueId(),
        sender_id: currentUser.value.id,
        receiver_id: agentId,
        owner: true,
        messages: [
          {
            content: message,
            created_at: new Date().toISOString(),
          },
        ],
      })
      insightProcessChat(agentId, currentUser.value.id, message)
    } catch (err) {
      error.value = 'Failed to chat with agent'
      console.error('Chat with agent error:', err)
      return null
    } finally {
      loading.value = false
    }
  }

  const addMessage = async (
    senderId: string,
    receiverId: string,
    message: string
  ) => {
    try {
      loading.value = true
      error.value = null

      currentChatList.value.push({
        id: generateUniqueId(),
        sender_id: senderId,
        receiver_id: receiverId,
        owner: senderId === currentUser.value.id,
        messages: [
          {
            content: message,
            created_at: new Date().toISOString(),
          },
        ],
      })
    } catch (err) {
      error.value = 'Failed to add message'
      console.error('Add message error:', err)
      return null
    } finally {
      loading.value = false
    }
  }

  const insightProcessChat = async (
    agentId: string,
    userId: string,
    message: string
  ) => {
    try {
      loading.value = true
      error.value = null
      agentInsightProcessList.value.push({
        id: generateUniqueId(),
        agent_id: agentId,
        user_id: currentUser.value.id,
        owner: currentUser.value.id == userId,
        process_time: new Date().toISOString(),
        created_at: new Date().toISOString(),
        topics: {
          id: generateUniqueId(),
          title: '',
          content: '',
        },
      })
    } catch (err) {
      error.value = 'Failed to chat with agent'
      console.error('Chat with agent error:', err)
      return null
    } finally {
      loading.value = false
    }
  }

  return {
    // State
    currentChatList,
    agentInsightProcessList,
    loading: readonly(loading),
    error: readonly(error),

    // Actions
    chatWithAgent,
    addMessage,
  }
})
