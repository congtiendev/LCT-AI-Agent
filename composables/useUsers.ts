export const useUsers = () => {
  // Static data thay vì API calls
  const users = ref([
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      avatar: 'https://via.placeholder.com/150',
      role: 'admin',
      createdAt: '2024-01-01',
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      avatar: 'https://via.placeholder.com/150',
      role: 'user',
      createdAt: '2024-01-02',
    },
    {
      id: '3',
      name: 'Bob Wilson',
      email: 'bob@example.com',
      avatar: 'https://via.placeholder.com/150',
      role: 'user',
      createdAt: '2024-01-03',
    },
  ])

  const loading = ref(false)
  const error = ref(null)

  // Fake loading để simulate API
  const fetchUsers = async () => {
    loading.value = true
    await new Promise((resolve) => setTimeout(resolve, 500))
    loading.value = false
  }

  const addUser = (userData: any) => {
    const newUser = {
      id: String(users.value.length + 1),
      ...userData,
      createdAt: new Date().toISOString(),
    }
    users.value.push(newUser)
  }

  const deleteUser = (id: string) => {
    const index = users.value.findIndex((u) => u.id === id)
    if (index > -1) {
      users.value.splice(index, 1)
    }
  }

  return {
    users: readonly(users),
    loading: readonly(loading),
    error: readonly(error),
    fetchUsers,
    addUser,
    deleteUser,
  }
}
