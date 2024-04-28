"use client"

import { CircleUserRound, CalendarDays, FilePen, Save } from "lucide-react";
import { format } from "date-fns";
import Image from "next/image"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Textarea } from "@/components/ui/textarea"
import { Item, Attach } from "@prisma/client"
import { AttachmentsTable } from "@/components/attachments-table";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { AttachmentCreator } from "./attachment-creator";


interface PresentationDetailsProps {
  item: Item,
  attachments: Attach[]
}

const formSchema = z.object({
  title: z.string().min(1, { message: "Title is required!" }),
  introduction: z.string().min(1, { message: "Introducation is required!" }),
  motivation: z.string().min(1, { message: "Motivation is required!" }),
  conclusion: z.string().min(1, { message: "Conclusion is required!" }),
  inspiration: z.string().min(1, { message: "Inspiration is required!" })
})


export const PresentationDetails = ({
  item,
  attachments
}: PresentationDetailsProps) => {
  const [editable, setEditable] = useState(false)
  const allAttachments: Attach[] = [
    {
      id: "ppt",
      title: item.title,
      pdfLink: item.pptLink,
      codeLink: "",
      presentationLink: "",
      itemId: item.id,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt
    },
    ...attachments
  ]

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: item.title,
      introduction: item.introduction === null ? "" : item.introduction,
      motivation: item.motivation === null ? "" : item.motivation,
      conclusion: item.conclusion === null ? "" : item.conclusion,
      inspiration: item.inspiration === null ? "" : item.inspiration,
    }
  })

  const onSubmit = async () => {
    const formData = form.getValues()
    const response = await axios.patch(`/api/item/${item.id}`, JSON.stringify({
      title: formData.title,
      introduction: formData.introduction,
      motivation: formData.motivation,
      conclusion: formData.conclusion,
      inspiration: formData.inspiration,
    }))
    if (!response || response.status !== 200) {
      toast.error("Failed to update presentation info!")
    } else {
      setEditable(false)
      toast.success("Presentation info updated!");
    }
  }

  return (
    <div className="h-full w-full flex items-center justify-center">
      <div className="h-full w-full flex flex-col 2xl:w-1/2 p-6 gap-y-8">
        <div className="flex items-center justify-center">
          <Image
            src={"/men.svg"}
            height={400}
            width={400}
            alt=""
          />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex gap-x-8">
            <div className="flex items-center gap-x-1 text-sm text-muted-foreground">
              <CircleUserRound className="h-4 w-4" /> test user
            </div>
            <div className="flex items-center gap-x-1 text-sm text-muted-foreground">
              <CalendarDays className="h-4 w-4" />
              <span className="text-xs text-muted-foreground">
                {format(new Date(Date.now()), "yyyy/MM/dd")}
              </span>
            </div>
          </div>
          {editable ? (
            <Button
              variant="secondary"
              size="sm"
              className="text-xs text-muted-foreground text-green-500"
              disabled={form.formState.isSubmitting}
              onClick={onSubmit}
            >
              <Save className="h-4 w-4 mr-1" /> Save
            </Button>
          ) : (
            <Button
              variant="secondary"
              size="sm"
              className="text-xs text-muted-foreground text-green-500"
              onClick={() => { setEditable(true) }}
            >
              <FilePen className="h-4 w-4 mr-1" /> Edit
            </Button>
          )}
        </div>
        {editable ? (
          <Form {...form}>
            <form className="space-y-8 flex flex-col">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xl font-medium text-sky-500">Title</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder={form.getValues().title}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="introduction"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xl font-medium text-sky-500">Introduction</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder={form.getValues().introduction}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="motivation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xl font-medium text-sky-500">Motivation</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder={form.getValues().motivation}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="conclusion"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xl font-medium text-sky-500">Conclusion</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder={form.getValues().conclusion}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="inspiration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xl font-medium text-sky-500">Inspiration</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder={form.getValues().inspiration}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        ) : (
          <>
            <h2 className="text-2xl font-semibold text-sky-500">
              {form.getValues().title}
            </h2>
            <div className="flex flex-col gap-y-2">
              <h3 className="text-xl font-medium text-sky-500">Introduction</h3>
              <p>{form.getValues().introduction}</p>
            </div>
            <div className="flex flex-col gap-y-2">
              <h3 className="text-xl font-medium text-sky-500">Motivation</h3>
              <p>{form.getValues().motivation}</p>
            </div>
            <div className="flex flex-col gap-y-2">
              <h3 className="text-xl font-medium text-sky-500">Conclusion</h3>
              <p>{form.getValues().conclusion}</p>
            </div>
            <div className="flex flex-col gap-y-2">
              <h3 className="text-xl font-medium text-sky-500">Inspiration</h3>
              <p>{form.getValues().inspiration}</p>
            </div>
          </>
        )}
        <div className="flex flex-col gap-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-medium text-sky-500">Attachments</h3>
            <AttachmentCreator itemId={item.id} />
          </div>
          <AttachmentsTable attachmemts={allAttachments} />
        </div>
      </div>
    </div>
  )
}