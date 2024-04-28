import Link from "next/link";
import Image from "next/image";
import { CircleUserRound, CalendarDays, User } from "lucide-react";
import { format } from "date-fns";
import { UserButton } from "@clerk/nextjs";

interface ItemProps {
  id: string,
  title: string,
  username: string,
  date: Date,
  introduction: string,
}

export const Item = ({
  id,
  title,
  username,
  date,
  introduction,
}: ItemProps) => {
  return (
    <div className="w-full flex flex-col rounded-lg border hover:cursor-pointer shadow transition hover:shadow-xl dark:bg-secondary dark:hover:bg-primary/10 p-4">
      <Link href={`/${id}`}>
        <div>
          <div className="flex gap-x-6">
            <Image
              src={"/men.svg"}
              height={200}
              width={200}
              alt="Profile Image"
            />
            <div className="flex flex-col gap-y-4">
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
                <div className="flex items-center gap-x-1 text-sm text-muted-foreground">
                  <CalendarDays className="h-4 w-4" />
                  <span className="text-xs text-muted-foreground">
                    {format(new Date(date), "yyyy/MM/dd")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}
