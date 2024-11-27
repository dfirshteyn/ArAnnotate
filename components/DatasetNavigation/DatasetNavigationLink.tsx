"use client"

import Link from "next/link"
import { PropsWithChildren } from "react"
import classNames from "classnames"
import { usePathname } from "next/navigation"

interface DatasetNavigationLinkProps extends PropsWithChildren {
  href: string
}

export const DatasetNavigationLink = ({ children, href }: DatasetNavigationLinkProps) => {
  const pathname = usePathname()
  const isActive = pathname.endsWith(href)

  return (
    <Link
      href={href}
      className={classNames(
        "py-4 whitespace-normal text-center min-w-[80px]",
        isActive ? "border-b-2 border-black text-black" : "text-[#737373] hover:text-black"
      )}
    >
      {children}
    </Link>
  )
}
