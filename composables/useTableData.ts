export const useTableData = () => {
  const generateMockData = (count: number = 30) => {
    const positions = [
      'Sales Assistant',
      'Marketing Manager',
      'Software Engineer',
      'UI/UX Designer',
      'Product Manager',
      'Data Analyst',
      'Chief Executive Officer',
      'Junior Developer',
      'Senior Developer',
      'Project Manager',
      'Business Analyst',
      'Quality Assurance',
    ]

    const offices = [
      'New York',
      'San Francisco',
      'Tokyo',
      'London',
      'Edinburgh',
      'Boston',
      'Seattle',
    ]
    const statuses: ('Hired' | 'In Progress' | 'Pending')[] = [
      'Hired',
      'In Progress',
      'Pending',
    ]
    const firstNames = [
      'John',
      'Jane',
      'Mike',
      'Sarah',
      'David',
      'Lisa',
      'Chris',
      'Emma',
      'Alex',
      'Maria',
    ]
    const lastNames = [
      'Smith',
      'Johnson',
      'Brown',
      'Davis',
      'Wilson',
      'Moore',
      'Taylor',
      'Anderson',
    ]

    return Array.from({ length: count }, (_, index) => ({
      id: index + 1,
      name: `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`,
      image: `https://via.placeholder.com/40?text=${index + 1}`,
      email: 'demo@example.com',
      position: positions[Math.floor(Math.random() * positions.length)],
      office: offices[Math.floor(Math.random() * offices.length)],
      age: Math.floor(Math.random() * 40) + 25,
      startDate: `${Math.floor(Math.random() * 28) + 1} ${['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'][Math.floor(Math.random() * 6)]}, 2027`,
      salary: `${(Math.floor(Math.random() * 200) + 30) * 1000}`,
      status: statuses[Math.floor(Math.random() * statuses.length)],
    }))
  }

  return {
    generateMockData,
  }
}
