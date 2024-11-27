"use client"

import { TagPill } from "@/components/TagPill/TagPill"
import { useDatasetContext } from "@/features/DatasetProvider/DatasetProvider"

export const EntryDetails = () => {
  const { dataset } = useDatasetContext()

  return (
    <div className="flex flex-col gap-7 w-52 flex-shrink-0">
      <div className="flex flex-col gap-2">
        <p className="font-inter text-xl font-medium text-black">Usability</p>
        <p className="font-inter text-md text-[#6E6E6E]">4.8</p>
      </div>
      <div className="flex flex-col gap-2">
        <p className="font-inter text-xl font-medium text-black">License</p>
        <p className="font-inter text-md text-[#6E6E6E]">CC0: Public Domain</p>
      </div>
      <div className="flex flex-col gap-2">
        <p className="font-inter text-xl font-medium text-black">Tags</p>
        <div className="flex flex-row flex-wrap gap-2">
          {dataset?.tags?.filter((tag) =>
              ["Field-Of-Study", "Domain", "Method", "Is-Data-Clean", "Status"].includes(tag.name)
            )
            .map((tag) => (
              <TagPill size="small" key={tag.name}>
                {tag.name}: {tag.value}
              </TagPill>
            ))}
        </div>
      </div>
    </div>
  )
}
