"use client"

import { useState } from "react"
import { z } from "zod"
import { CirclePlus } from "lucide-react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import axios from "axios";
import { toast } from "sonner"


interface AttachmentCreatorProps {
  itemId: string
}

const formSchema = z.object({
  title: z.string().min(1, { message: "Title is required!" }),
  pdfLink: z.string().min(1, { message: "Attachment file link is required!" }),
})

export const AttachmentCreator = ({
  itemId
}: AttachmentCreatorProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      pdfLink: "",
    }
  })

  const onSubmit = async () => {
    const formData = form.getValues()
    const response = await axios.post("/api/attachment", JSON.stringify({
      title: formData.title,
      itemId: itemId,
      pdfLink: formData.pdfLink,
    }))
    if (!response || response.status !== 200) {
      toast.error("Failed to update presentation info!")
    } else {
      setIsDialogOpen(false)
      toast.success("Presentation info updated!");
      location.reload()
    }
  }

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={(isOpen) => {
        setIsDialogOpen(isOpen)
        form.reset()
      }}
    >
      <DialogTrigger asChild>
        <Button
          variant="secondary"
          size="sm"
          className="text-xs text-muted-foreground text-purple-500"
        >
          <CirclePlus className="h-4 w-4 mr-1" />
          Add an attachment
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-2 text-center">Add a new attachment to your presentation</DialogTitle>
        </DialogHeader>
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex flex-col">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormDescription>The title of your attachement</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="pdfLink"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Attachment Link</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormDescription>The link of your attachment</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex w-full items-center justify-center gap-x-2">
                <Button
                  type="submit"
                  disabled={form.formState.isSubmitting}
                  variant="secondary"
                  size="sm"
                >
                  Submit
                </Button>
                <Button
                  onClick={() => { setIsDialogOpen(false) }}
                  variant="secondary"
                  size="sm"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  )
}