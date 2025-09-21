// types/agents.ts
export interface Agent {
  id: string
  name: string
  description: string
  published: boolean
  created_at: string | Date
  updated_at?: string | Date
}

export interface CreateAgentRequest {
  name: string
  description: string
  published?: boolean
}

export interface UpdateAgentRequest {
  name?: string
  description?: string
  published?: boolean
}

export interface AgentFilters {
  search?: string
  status?: 'published' | 'draft' | 'all'
  sortBy?: keyof Agent
  sortOrder?: 'asc' | 'desc'
}

export interface AgentStats {
  total: number
  published: number
  draft: number
}

export interface AgentChat {
  id: string
  sender_id: string
  receiver_id: string
  owner: boolean
  messages: Array<{
    content: string
    created_at: string | Date
  }>
}

export interface InsightProcessList {
  id: string
  agent_id: string
  user_id: string
  owner: boolean
  process_time: string
  created_at: string | Date
  topics: {
    id: string
    title: string
    content: string
  }
}
