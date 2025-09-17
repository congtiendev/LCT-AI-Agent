export interface Documents {
  id: string
  filename: string
  filetype: string
  agent_related: string[]
  description: string
  created_at: string
}
export interface FileItem {
  id: number
  file_id: string
  filename: string
  filetype: string
  description: string | null
  created_at: string
  agent_name: string
  vector_ids: string[]
  agent_ids: string[]
  agent_related: string[]
}

export interface CreateFileDto {
  filename: string
  filetype: string
  description?: string
  agent_related?: string[]
}

export interface UpdateFileDto {
  filename?: string
  description?: string
  agent_related?: string[]
}

export interface TableColumn {
  key: string
  label: string
  type: string
  sortable?: boolean
}

export interface ApiResponse<T> {
  status: number
  message: string
  data: T
}

export interface FileListResponse extends ApiResponse<FileItem[]> {}

export interface FileDetailResponse extends ApiResponse<FileItem> {}

// For filtering and search
export interface FileFilters {
  filename?: string
  filetype?: string
  agent_related?: string
  dateFrom?: string
  dateTo?: string
}
