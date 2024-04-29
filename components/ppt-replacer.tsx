"use client"

import axios from "axios";
import { toast } from "sonner"

interface pptReplacerProps {
  itemId: string
  title: string
  pdfLink: string
}

export const PPTReplacer = ({
  itemId,
  title,
  pdfLink
}: pptReplacerProps) => {
  const handleRemoveAttachment = async () => {
    const response = await axios.delete(`/api/attach/${attachment.id}`)
    if (!response || response.status !== 200) {
      toast.error("Failed to remove item")
      return
    } else {
      toast.success("Item removed!")
    }
  }
  return (
    
  )
}