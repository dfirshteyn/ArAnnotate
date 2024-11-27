import { Dataset } from "@/types/dataset"
import { DatasetResponse } from "@/utils/requests/fetchDatasetById"

export function datasetFactory(response: DatasetResponse): Dataset {
  const transaction = response.transactions[0]
  const decodedTags = transaction.tags.map((tag) => ({
    name: atob(tag.name),
    value: atob(tag.value),
  }))

  // Find specific tags by decoded name
  const getTagValue = (tagName: string) => decodedTags.find((tag) => tag.name === tagName)?.value

  return {
    id: transaction.id,
    title: getTagValue("Dataset-Name") || "Untitled",
    description: getTagValue("Description") || "",
    author: {
      address: getTagValue("Wallet-Address") || "",
      name: getTagValue("Author-Name") || "Anonymous",
      email: getTagValue("Author-Email") || "",
      avatar: "/img/small-avatar.png",
    },
    createdAt: new Date(),
    updatedAt: new Date(),
    tags: decodedTags,
    fieldOfStudy: getTagValue("Field-Of-Study") || "",
    domain: getTagValue("Domain") || "",
    method: getTagValue("Method") || "",
    dataClean: getTagValue("Is-Data-Clean") || "",
    status: (getTagValue("Status") as Dataset["status"]) || "draft",
    files: [
      {
        id: transaction.data_root,
        name: getTagValue("File-Name") || "unnamed",
        size: Number(transaction.data_size),
        type: getTagValue("Content-Type") || "application/octet-stream",
        url: transaction.data,
      },
    ],
  }
}
