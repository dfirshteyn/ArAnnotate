import clientPromise from "@/lib/mongodb";
import { SearchDatasets } from "@/features/SearchDatasets/SearchDatasets"
import { DatasetsHeading } from "@/components/DatasetsHeading/DatasetsHeading"

async function fetchDatasets() {
  interface Transaction {
    _id: string;
    transaction_id: string;
    time: Date;
  }

  let txn_ids: Transaction[] = [];

  try {
    const client = await clientPromise;
    const db = client.db("arweave-hackathon-db");
    txn_ids = await db.collection("transactions").find({}).toArray();
  } catch (e) {
    console.error(e);
  }

  const txn_ids_array = txn_ids.map(item => item.transaction_id);
  const data = await fetch("http://localhost:3000/auth/fetchAllDataset", {
    body: JSON.stringify({
      "transactionIds": txn_ids_array,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const response = await data.json();
  console.log('res', response);

  // Decode the base64-encoded tags
  response.transactions.forEach(transaction => {
    transaction.tags.forEach(tag => {
      tag.name = atob(tag.name);
      tag.value = atob(tag.value);
    });
  });
  return response;
}

export default async function Dashboard() {
  const datasets = await fetchDatasets();

  return (
    <>
      <DatasetsHeading
        title="Explore Datasets"
        description="Explore and utilize a diverse range of machine learning models, from advanced diffusion models to cutting-edge large language models (LLMs), tailored to meet various needs and applications."
      />
      <SearchDatasets datasets={datasets.transactions} />
    </>
  )
}
