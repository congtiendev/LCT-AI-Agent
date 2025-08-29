import type { Topics } from '~/types/topics'
export const useTopicsStore = defineStore('topics', () => {
  const topics = ref<Topics[]>([
    {
      id: '1',
      name: 'Topic 1',
      description: 'Description for Topic 1',
      instructions: 'Instructions for Topic 1',
      actions: ['Action 1', 'Action 2'],
      agent_related: true,
      username: 'User 1',
    },
    {
      id: '2',
      name: 'Topic 2',
      description: 'Description for Topic 2',
      instructions: 'Instructions for Topic 2',
      actions: ['Action 3', 'Action 4'],
      agent_related: false,
      username: 'User 2',
    },
    {
      id: '3',
      name: 'Topic 3',
      description: 'Description for Topic 3',
      instructions: 'Instructions for Topic 3',
      actions: ['Action 5', 'Action 6'],
      agent_related: true,
      username: 'User 3',
    },
  ])
  const loading = ref<boolean>(false)
  const error = ref<string | null>(null)

  return {
    topics,
    loading,
    error,
  }
})
