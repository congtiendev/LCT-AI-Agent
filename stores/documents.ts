import type { Documents } from '~/types/documents'
export const useDocumentsStore = defineStore('documents', () => {
  const fileTypes = [
    { id: 1, name: 'PDF' },
    { id: 2, name: 'DOC' },
    { id: 3, name: 'XLS' },
    { id: 4, name: 'PPT' },
    { id: 5, name: 'TXT' },
    { id: 6, name: 'CSV' },
    { id: 7, name: 'JPG' },
    { id: 8, name: 'PNG' },
    { id: 9, name: 'GIF' },
    { id: 10, name: 'MP4' },
    { id: 11, name: 'MP3' },
    { id: 12, name: 'WAV' },
    { id: 13, name: 'HTML' },
    { id: 14, name: 'XML' },
    { id: 15, name: 'JSON' },
    { id: 16, name: 'RAR' },
    { id: 17, name: 'ZIP' },
    { id: 18, name: '7Z' },
    { id: 19, name: 'TAR' },
    { id: 20, name: 'GZ' },
    { id: 21, name: 'BZ2' },
    { id: 22, name: 'TGZ' },
    { id: 23, name: 'BZIP2' },
    { id: 24, name: 'LZMA' },
    { id: 25, name: 'LZ4' },
    { id: 27, name: 'DOCX' },
  ]

  const fileAccept =
    '.c,.cpp,.cs,.css,.doc,.docx,.go,.html,.java,.js,.json,.md,.pdf,.php,.pptx,.py,.rb,.sh,.tex,.ts,.txt'

  const documents = ref<Documents[]>([
    {
      id: '1',
      filename: 'Document-1.pdf',
      filetype: 'PDF',
      agent_related: ['Agent 1', 'Agent 2'],
      description: 'Description for Document 1',
      created_at: '2023-01-01',
    },
    {
      id: '2',
      filename: 'Document-2.docx',
      filetype: 'DOCX',
      agent_related: ['Agent 3'],
      description: 'Description for Document 2',
      created_at: '2023-02-15',
    },
    {
      id: '3',
      filename: 'Document-3.txt',
      filetype: 'TXT',
      agent_related: ['Agent 1', 'Agent 4'],
      description: 'Description for Document 3',
      created_at: '2023-03-10',
    },
  ])

  return { fileTypes, fileAccept, documents }
})
