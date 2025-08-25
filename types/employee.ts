// types/employee.ts
export interface Employee {
  id: number
  name: string
  image?: string
  position: string
  office: string
  age: number
  startDate: string
  salary: string
  email?: string
  status?: 'Hired' | 'In Progress' | 'Pending'
}

export type SortDirection = 'asc' | 'desc'
export type SortableColumns = keyof Employee
