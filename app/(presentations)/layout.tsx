import { Navbar } from "@/components/navbar"

const Layout = ({
  children
}: {
  children: React.ReactNode
}) => {
  return (
    <div className="h-full w-full flex flex-col">
      <Navbar />
      <div className="h-full w-full">{children}</div>
    </div>
  )
}

export default Layout