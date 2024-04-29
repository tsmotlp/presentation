import { Item as PresentationItem } from "@/components/item"
import { getAllItems } from "@/data/item"


const ItemsPage = async () => {
  const items = await getAllItems()
  return (
    <div className="h-full w-full flex items-center justify-center">
      <div className="w-full 2xl:w-1/2 grid grid-cols-1 gap-6 p-6">
        {items && items.map((item) => (
          <PresentationItem
            key={item.id}
            id={item.id}
            title={item.title}
            coverLink={item.coverLink}
            username={item.username}
            date={item.createdAt}
            introduction={item.introduction ? item.introduction : ""}
          />
        ))}
      </div>
    </div>
  );
}

export default ItemsPage
