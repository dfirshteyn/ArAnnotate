export interface Dataset {
  id: string
  title: string
  description: string
  author: {
    address: string
    name: string
    email: string
    avatar: string
  }
  createdAt: Date
  updatedAt: Date
  status: "draft" | "published" | "archived"
  fieldOfStudy: string
  domain: string
  method: string
  dataClean: string
  tags: {
    name: string
    value: string
  }[]
  files: {
    id: string
    name: string
    size: number
    type: string
    url: string
  }[]
}
