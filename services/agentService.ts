// services/agentService.ts
import type {
  Agent,
  CreateAgentRequest,
  UpdateAgentRequest,
} from '~/types/agents'

// Static mock data
const mockAgents: Agent[] = [
  {
    id: '1',
    name: 'Customer Support Bot',
    description:
      'AI assistant for handling customer inquiries and support tickets',
    published: true,
    created_at: new Date('2024-01-15T10:30:00Z'),
  },
  {
    id: '2',
    name: 'Sales Assistant',
    description: 'Helps with lead qualification and product recommendations',
    published: true,
    created_at: new Date('2024-01-20T14:45:00Z'),
  },
  {
    id: '3',
    name: 'Content Writer',
    description: 'Generates blog posts, articles, and marketing content',
    published: false,
    created_at: new Date('2024-01-25T09:15:00Z'),
  },
  {
    id: '4',
    name: 'Code Reviewer',
    description: 'Reviews code for best practices and potential bugs',
    published: true,
    created_at: new Date('2024-02-01T16:20:00Z'),
  },
  {
    id: '5',
    name: 'Email Assistant',
    description: 'Drafts professional emails and responses',
    published: false,
    created_at: new Date('2024-02-05T11:10:00Z'),
  },
]

// Simulate API delay
const delay = (ms: number = 800) =>
  new Promise((resolve) => setTimeout(resolve, ms))

export class AgentService {
  private static agents: Agent[] = [...mockAgents]

  // Get all agents
  static async getAgents(): Promise<Agent[]> {
    await delay()
    return [...this.agents]
  }

  // Get agent by ID
  static async getAgentById(id: string): Promise<Agent | null> {
    await delay(300)
    const agent = this.agents.find((a) => a.id === id)
    return agent ? { ...agent } : null
  }

  // Create new agent
  static async createAgent(data: CreateAgentRequest): Promise<Agent> {
    await delay(1000)

    const newAgent: Agent = {
      id: Date.now().toString(),
      name: data.name,
      description: data.description,
      published: data.published ?? false,
      created_at: new Date(),
    }

    this.agents.unshift(newAgent)
    return { ...newAgent }
  }

  // Update existing agent
  static async updateAgent(
    id: string,
    data: UpdateAgentRequest
  ): Promise<Agent> {
    await delay(800)

    const index = this.agents.findIndex((a) => a.id === id)
    if (index === -1) {
      throw new Error('Agent not found')
    }

    const updatedAgent = {
      ...this.agents[index],
      ...data,
    }

    this.agents[index] = updatedAgent
    return { ...updatedAgent }
  }

  // Delete agent
  static async deleteAgent(id: string): Promise<void> {
    await delay(600)

    const index = this.agents.findIndex((a) => a.id === id)
    if (index === -1) {
      throw new Error('Agent not found')
    }

    this.agents.splice(index, 1)
  }

  // Get published agents only
  static async getPublishedAgents(): Promise<Agent[]> {
    await delay(400)
    return this.agents.filter((agent) => agent.published)
  }

  // Search agents
  static async searchAgents(query: string): Promise<Agent[]> {
    await delay(500)
    const lowercaseQuery = query.toLowerCase()
    return this.agents.filter(
      (agent) =>
        agent.name.toLowerCase().includes(lowercaseQuery) ||
        agent.description.toLowerCase().includes(lowercaseQuery)
    )
  }

  // Toggle agent publish status
  static async toggleAgentStatus(id: string): Promise<Agent> {
    await delay(400)

    const index = this.agents.findIndex((a) => a.id === id)
    if (index === -1) {
      throw new Error('Agent not found')
    }

    this.agents[index].published = !this.agents[index].published
    return { ...this.agents[index] }
  }

  // Get agents count
  static async getAgentsCount(): Promise<{
    total: number
    published: number
    draft: number
  }> {
    await delay(200)
    const total = this.agents.length
    const published = this.agents.filter((a) => a.published).length
    const draft = total - published

    return { total, published, draft }
  }

  // Reset to original mock data
  static resetData(): void {
    this.agents = [...mockAgents]
  }
}
