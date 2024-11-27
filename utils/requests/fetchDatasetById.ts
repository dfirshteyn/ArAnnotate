import { Dataset } from "@/types/dataset"
import { datasetFactory } from "@/utils/factories/datasetFactory"

const SIMULATED_DELAY_MS = 1000

/* Example of how the fetch request should be implemented:

export async function fetchDatasetById({ signal, id }: Args): Promise<Dataset> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/datasets/${id}`, {
      next: {
        revalidate: 3600, // Cache for 1 hour
        tags: [`dataset-${id}`], // For on-demand revalidation
      },
      signal,
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data: DatasetResponse = await response.json()
    return datasetFactory(data)
  } catch (error) {
    console.error("Error fetching dataset:", error)
    throw error
  }
}
*/

export type DatasetResponse = {
  transactions: {
    format: number
    id: string
    last_tx: string
    owner: string
    tags: {
      name: string
      value: string
    }[]
    target: string
    quantity: string
    data: string
    data_size: string
    data_root: string
    reward: string
    signature: string
  }[]
}

export type Args = {
  signal?: AbortSignal
  id: string
}

export async function fetchDatasetById({ signal, id }: Args): Promise<Dataset> {
  try {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, SIMULATED_DELAY_MS))

    const response = await (await import("./mock-data/response.json")).default

    // Simulate a real HTTP error for invalid IDs
    if (id !== response.transactions[0].id) {
      throw new Error(`Dataset with ID ${id} not found`)
    }

    return datasetFactory(response)
  } catch (error) {
    console.error("Error fetching dataset:", error)
    throw error
  }
}
