import { Item as PresentationItem } from "@/components/item"
import { getAllItems } from "@/data/item"
import { Image } from "next/image"

const ItemsPage = async () => {
  const items = await getAllItems()
  return (
    <>
      {items && items.length > 0 ? (
        <div className="w-full flex items-center justify-center">
          <div className="w-full 2xl:w-1/2 grid grid-cols-1 gap-6 p-6">
            {items
              .sort(
                (a, b) => {
                  return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                }
              )
              .map((item) => (
                <PresentationItem
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  coverLink={item.coverLink}
                  itemUserId={item.userId}
                  username={item.username}
                  date={item.createdAt}
                  introduction={item.introduction ? item.introduction : ""}
                />
            ))}
          </div>
        </div>
    ): (
      <div className="h-full w-full flex flex-col items-center justify-center">
        <h3 className="font-semibold text-lg">No items Found!</h3>
      </div>
    )}
    </>
  );
}

export default ItemsPage
