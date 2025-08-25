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
