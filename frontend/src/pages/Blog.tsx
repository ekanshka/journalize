import { useParams } from "react-router-dom"
import { useBlog } from "../hooks/useBlog"
import { Appbar } from "../components/Appbar"


export const Blog = () => {

  const { id } = useParams()

  const { blog, loading, error } = useBlog(id || "")


  return (
    <div className="h-screen w-full flex flex-col place-items-center">
      <Appbar />
      {loading ? (
        <div className="h-full w-2/3 p-10 flex flex-col justify-center place-items-center">
          loading...
        </div>
      ) : (
        <div className="w-1/2 p-10 flex flex-col gap-5">
          <div>{blog?.title}</div>
          <div>{blog?.content}</div>
        </div>
      )}
    </div>
  )
}
