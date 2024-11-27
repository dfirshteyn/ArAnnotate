import {
  Table,
  TableBody,
  TableHeader,
  TableRow,
  TableCell,
  TableHead,
} from "@/components/ui/table"
import { StarIcon } from "lucide-react"


export default function RankingsPage() {

  const rankings = [
    { id: 1, name: "OpenAI Whisper large-v2", rank: 1, downloads: 550000, type: "model", rating: 4.9 },
    { id: 2, name: "Microsoft Speech to Text", rank: 2, downloads: 520000, type: "model", rating: 4.8 },
    { id: 3, name: "Google Cloud Speech-to-Text", rank: 3, downloads: 480000, type: "model", rating: 4.7 },
    { id: 4, name: "Mozilla Common Voice", rank: 1, downloads: 1200000, type: "dataset", rating: 4.9 },
    { id: 5, name: "ImageNet", rank: 2, downloads: 1050000, type: "dataset", rating: 4.6 },
    // ... more data
  ]

  return (
    <div className="container mx-auto py-5 px-4">
      <h1 className="text-3xl mb-6 flex gap-4 items-center font-inter text-[48px] font-medium">
        <StarIcon className="h-7 w-7 text-yellow-400" />
        Rankings <span className="text-xl font-thin">(example)</span>
      </h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Rank</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Downloads</TableHead>
            <TableHead>Rating</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rankings.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.rank}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell className="capitalize">{item.type}</TableCell>
              <TableCell>{item.downloads}</TableCell>
              <TableCell>{item.rating}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
