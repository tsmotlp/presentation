"use client"

import { Presentation } from "lucide-react"
import Link from "next/link"
import { ItemCreator } from "@/components/item-creator"
import { SignInButton, useAuth, UserButton } from "@clerk/nextjs"
import { ModeToggle } from "./mode-toggle"

export const Navbar = () => {
  const { isSignedIn } = useAuth()
  return (
    <div className="w-full flex items-center justify-center">
      <div className="w-full 2xl:w-1/2 flex items-center justify-between p-6 border-b">
        <Link href="/">
          <div className="flex items-center gap-x-2 text-sky-500">
            <Presentation />
            <h1 className="text-xl font-bold">Presentations</h1>
          </div>
        </Link>
        <div className="flex items-center gap-x-2">
          <ItemCreator />
          {isSignedIn ? (
            <UserButton afterSignOutUrl="/" />
          ) : (
            <div className="text-sm">
              <SignInButton />
            </div>
          )}
          <ModeToggle />
        </div>
      </div>
    </div>
  )
}