import { PresentationDetails } from "@/components/presentation-details";
import { getItemWithAttachments } from "@/data/item";

const ItemPage = async ({
  params
}: {
  params: {
    itemId: string
  }
}) => {
  const item = await getItemWithAttachments(params.itemId)
  return (
    <>
      {item && (
        <PresentationDetails item={item} attachments={item.attaches ? item.attaches : []} />
      )}
    </>
  )
}

export default ItemPage