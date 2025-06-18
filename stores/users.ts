export const useUsersStore = defineStore('users', () => {
  // Static data
  const users = ref([
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      avatar: 'https://via.placeholder.com/150',
      role: 'admin',
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      avatar: 'https://via.placeholder.com/150',
      role: 'user',
    },
  ])

  const loading = ref(false)
  const selectedUser = ref(null)

  // UI actions - không có API calls
  const setLoading = (state: boolean) => {
    loading.value = state
  }

  const selectUser = (user: any) => {
    selectedUser.value = user
  }

  const addUser = (userData: any) => {
    const newUser = {
      id: String(Date.now()),
      ...userData,
    }
    users.value.push(newUser)
  }

  const removeUser = (id: string) => {
    const index = users.value.findIndex((u) => u.id === id)
    if (index > -1) {
      users.value.splice(index, 1)
    }
  }

  return {
    users: readonly(users),
    loading: readonly(loading),
    selectedUser: readonly(selectedUser),
    setLoading,
    selectUser,
    addUser,
    removeUser,
  }
})
