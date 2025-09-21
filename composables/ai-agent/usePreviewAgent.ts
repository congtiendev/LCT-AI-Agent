import type { Agent } from '~/types/agents'
import type { Topics } from '~/types/topics'
import type { Documents } from '~/types/documents'

export const usePreviewAgent = () => {
  const agentsStore = useAgentsStore()
  const topicsStore = useTopicsStore()
  const documentsStore = useDocumentsStore()
  const agentChatStore = useAgentChatStore()

  const { currentChatList, agentInsightProcessList, loading, error } =
    storeToRefs(agentChatStore)
  const { chatWithAgent } = agentChatStore
  return {
    currentChatList,
    agentInsightProcessList,
    loading,
    error,
    chatWithAgent,
  }
}
