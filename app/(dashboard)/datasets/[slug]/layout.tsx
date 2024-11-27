import { Button } from "@/components/Button/Button"
import { EntryAuthor } from "@/components/EntryAuthor/EntryAuthor"
import { EntryHeading } from "@/components/EntryHeading/EntryHeading"
import { DatasetNavigation } from "@/components/DatasetNavigation/DatasetNavigation"
import { AddIcon } from "@/components/icons/AddIcon/AddIcon"
import { fetchDatasetById } from "@/utils/requests/fetchDatasetById"
import { DatasetProvider } from "@/features/DatasetProvider/DatasetProvider"

export default async function DatasetLayout({ children }: { children: React.ReactNode }) {
  const dataset = await fetchDatasetById({ id: "uElDx6rnRun9ZgxrxhE6DvNFNzY7zZeRMB1me8xSuHU" })
  console.log({ dataset })

  return (
    <DatasetProvider dataset={dataset}>
      <div className="px-8">
        <div className="flex flex-row max-lg:flex-col-reverse max-lg:gap-4 justify-between mb-14">
          <EntryAuthor
            src={dataset.author.avatar}
            name={dataset.author.name}
            updatedAt={dataset.updatedAt}
            createdAt={dataset.createdAt}
            likes={10}
          />
          <div className="flex flex-row gap-3 max-lg:justify-end">
            <Button variant="outlined" icon={<AddIcon />}>
              New Notebook
            </Button>
            <Button variant="black">Download</Button>
          </div>
        </div>
        <EntryHeading
          title={dataset.title}
          description="Explore and utilize a diverse range of machine learning models, from advanced diffusion models to cutting-edge large language models (LLMs), tailored to meet various needs and applications."
          imageSrc="/img/dataset-image.png"
        />
      </div>
      <DatasetNavigation />
      {children}
    </DatasetProvider>
  )
}
