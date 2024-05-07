"use client"
import Link from "next/link";
import Image from "next/image";
import { CircleUserRound, CalendarDays, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { Button } from "./ui/button";
import axios from "axios";
import { toast } from "sonner"
import { useAuth } from '@clerk/clerk-react';

interface ItemProps {
  id: string,
  title: string,
  coverLink: string,
  itemUserId: string,
  username: string,
  date: Date,
  introduction: string,
}

export const Item = ({
  id,
  title,
  coverLink,
  itemUserId,
  username,
  date,
  introduction,
}: ItemProps) => {
  const handleRemoveItem = async () => {
    const response = await axios.delete(`/api/item/${id}`)
    if (!response || response.status !== 200) {
      toast.error("Failed to remove item")
    } else {
      toast.success("Item removed!")
      location.reload()
    }
  }
  
  const { isSignedIn, userId } = useAuth()
  return (
    <div className="w-full flex flex-col rounded-lg border hover:cursor-pointer shadow transition hover:shadow-xl dark:bg-secondary dark:hover:bg-primary/10 p-4">
      <Link href={`/${id}`} legacyBehavior>
        <div className="w-full">
          <div className="flex gap-x-6">
            <Image
              src={coverLink}
              height={200}
              width={200}
              alt="Profile Image"
            />
            <div className="w-full flex flex-col gap-y-4">
              <h3 className="text-xl font-medium text-sky-500">
                {title}
              </h3>
              <p className="break-words flex-1">
                {introduction}
              </p>
              <div className="flex gap-x-8">
                <div className="flex items-center gap-x-1 text-sm text-muted-foreground">
                  <CircleUserRound className="h-4 w-4" /> {username}
                </div>
                <div className="w-full flex items-center justify-between">
                  <div className="flex items-center gap-x-1 text-sm text-muted-foreground">
                    <CalendarDays className="h-4 w-4" />
                    <span className="text-xs text-muted-foreground">
                      {format(new Date(date), "yyyy/MM/dd")}
                    </span>
                  </div>
                  {isSignedIn && userId === itemUserId && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleRemoveItem}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}
