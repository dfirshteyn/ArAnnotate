import { AuthorInfo } from "@/components/AuthorInfo/AuthorInfo"
import { getDaysAgo } from "@/utils/getDaysAgo"
import { formatDate } from "@/utils/formatDate"
import { HeartIcon } from "@/components/icons/HeartIcon/HeartIcon"

interface EntryAuthorProps {
  src: string
  name: string
  updatedAt: Date
  createdAt: Date
  likes: number
}

export const EntryAuthor = ({ src, name, updatedAt, createdAt, likes }: EntryAuthorProps) => {
  return (
    <div className="flex items-center gap-2 text-[14px] text-[#6e6e6e] font-inter">
      <AuthorInfo src={src} name={name} />

      <div className="w-[2px] h-[2px] rounded-full bg-black" />
      <span>Updated {getDaysAgo(updatedAt.toISOString())}</span>

      <div className="w-[2px] h-[2px] rounded-full bg-black" />
      <span>Created on {formatDate(createdAt.toISOString())}</span>

      <div className="w-[2px] h-[2px] rounded-full bg-black" />
      <span className="flex items-center gap-1">
        {likes}
        <span className="text-[#D72B00]">
          <HeartIcon filled />
        </span>
      </span>
    </div>
  )
}
