"use client"

import { Dataset } from "@/types/dataset"
import { createContext, useContext, ReactNode } from "react"

interface DatasetContextValues {
  dataset: Dataset
}

const DatasetContext = createContext({} as DatasetContextValues)

export const useDatasetContext = () => {
  const context = useContext(DatasetContext)

  if (context === undefined) {
    throw new Error("useDatasetContext must be used within DatasetProvider")
  }

  return context
}

interface DatasetProviderProps {
  dataset: Dataset
  children: ReactNode
}

export const DatasetProvider = ({ dataset, children }: DatasetProviderProps) => {
  return (
    <DatasetContext.Provider
      value={{
        dataset,
      }}
    >
      {children}
    </DatasetContext.Provider>
  )
}
