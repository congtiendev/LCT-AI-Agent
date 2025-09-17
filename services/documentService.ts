// services/fileService.ts
import type {
  FileItem,
  CreateFileDto,
  UpdateFileDto,
  FileListResponse,
  FileDetailResponse,
  FileFilters,
} from '@/types/documents'

// Mock data matching your API response
const mockFiles: FileItem[] = [
  {
    id: 160,
    file_id: 'file-BHKEnk1SxymNYieX6EKM9J',
    filename: '2502043BD.pdf',
    filetype: 'pdf',
    description: null,
    created_at: '17:59:25 28/5/2025',
    agent_name: '',
    vector_ids: [],
    agent_ids: [],
    agent_related: [],
  },
  {
    id: 154,
    file_id: 'file-7gjmuGcV4CpxLpE2S38hwC',
    filename: 'pdf1.html',
    filetype: 'html',
    description: null,
    created_at: '16:50:53 24/3/2025',
    agent_name: 'test agent',
    vector_ids: ['vs_67e12a34d1a48191886fabe491a2575e'],
    agent_ids: ['215'],
    agent_related: ['test agent'],
  },
  {
    id: 150,
    file_id: 'file-Uu2oSHxA3cvDD44FhLeSGD',
    filename: 'F88_ Hướng dẫn nghiệp vụ tư vấn & hỗ trợ khách vay.docx',
    filetype: 'docx',
    description: null,
    created_at: '14:57:11 24/3/2025',
    agent_name: 'AGENT TƯ VẤN & HỖ TRỢ KHÁCH VAY',
    vector_ids: ['vs_67e107ad16b881919fb831e18a1f55f0'],
    agent_ids: ['214'],
    agent_related: ['AGENT TƯ VẤN & HỖ TRỢ KHÁCH VAY'],
  },
]

let files: FileItem[] = [...mockFiles]
let nextId = 161

class DocumentService {
  private delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms))

  async getAll(filters?: FileFilters): Promise<FileListResponse> {
    await this.delay(300) // Simulate API delay

    let filteredFiles = [...files]

    if (filters) {
      if (filters.filename) {
        filteredFiles = filteredFiles.filter((file) =>
          file.filename.toLowerCase().includes(filters.filename!.toLowerCase())
        )
      }

      if (filters.filetype) {
        filteredFiles = filteredFiles.filter(
          (file) => file.filetype === filters.filetype
        )
      }

      if (filters.agent_related) {
        filteredFiles = filteredFiles.filter((file) =>
          file.agent_related.some((agent) =>
            agent.toLowerCase().includes(filters.agent_related!.toLowerCase())
          )
        )
      }
    }

    return {
      status: 200,
      message: '✅ Files list retrieved successfully',
      data: filteredFiles.sort((a, b) => b.id - a.id), // Sort by newest first
    }
  }

  async getById(id: number): Promise<FileDetailResponse> {
    await this.delay(200)

    const file = files.find((f) => f.id === id)

    if (!file) {
      throw new Error(`File with id ${id} not found`)
    }

    return {
      status: 200,
      message: '✅ File retrieved successfully',
      data: file,
    }
  }

  async create(data: CreateFileDto): Promise<FileDetailResponse> {
    await this.delay(500)

    const newFile: FileItem = {
      id: nextId++,
      file_id: `file-${Math.random().toString(36).substr(2, 26)}`,
      filename: data.filename,
      filetype: data.filetype,
      description: data.description || null,
      created_at: new Date().toLocaleString('vi-VN', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      }),
      agent_name: data.agent_related?.join(' | ') || '',
      vector_ids: [],
      agent_ids: [],
      agent_related: data.agent_related || [],
    }

    files.unshift(newFile) // Add to beginning

    return {
      status: 201,
      message: '✅ File created successfully',
      data: newFile,
    }
  }

  async update(id: number, data: UpdateFileDto): Promise<FileDetailResponse> {
    await this.delay(400)

    const index = files.findIndex((f) => f.id === id)

    if (index === -1) {
      throw new Error(`File with id ${id} not found`)
    }

    const updatedFile: FileItem = {
      ...files[index],
      ...data,
      agent_name: data.agent_related?.join(' | ') || files[index].agent_name,
      agent_related: data.agent_related || files[index].agent_related,
    }

    files[index] = updatedFile

    return {
      status: 200,
      message: '✅ File updated successfully',
      data: updatedFile,
    }
  }

  async delete(id: number): Promise<{ status: number; message: string }> {
    await this.delay(300)

    const index = files.findIndex((f) => f.id === id)

    if (index === -1) {
      throw new Error(`File with id ${id} not found`)
    }

    files.splice(index, 1)

    return {
      status: 200,
      message: '✅ File deleted successfully',
    }
  }

  async bulkDelete(
    ids: number[]
  ): Promise<{ status: number; message: string }> {
    await this.delay(500)

    files = files.filter((file) => !ids.includes(file.id))

    return {
      status: 200,
      message: `✅ ${ids.length} files deleted successfully`,
    }
  }

  // Utility methods
  getFileTypes(): string[] {
    const types = [...new Set(files.map((f) => f.filetype))]
    return types.sort()
  }

  getAgents(): string[] {
    const agents = new Set<string>()
    files.forEach((file) => {
      file.agent_related.forEach((agent) => agents.add(agent))
    })
    return Array.from(agents).sort()
  }
}

export const documentService = new DocumentService()
