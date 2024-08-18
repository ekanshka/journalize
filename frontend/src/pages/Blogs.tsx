import { useState } from "react";
import { BlogPreview } from "../components/BlogPreview";
import { useBlogs } from "../hooks/useBlogs";

export const Blogs = () => {
  const { blogsState, loading, setSearchParams } = useBlogs();
  const [active, setActive] = useState<boolean>(true);

  function changeActive (e:React.MouseEvent<HTMLDivElement>) {
    setActive((prev) => (!prev))
    setSearchParams((prev) => {
      prev.set("tab", (e.target as HTMLDivElement).id)
      return prev
    })
  }

  if (loading) {
    return (
      <div className="h-full w-2/3 p-10 flex flex-col justify-center place-items-center">
        loading...
      </div>
    );
  }
  return (
    <div className="md:max-w-3xl w-full p-10 flex flex-col">
      <div className="flex gap-8 justify-start p-4">
        <div className={`cursor-pointer py-3 px-1 border-slate-800 text-lg ease-in duration-100 ${active ? "border-b-4" : ""}`} id="for-you" onClick={changeActive}>For you</div>
        <div className={`cursor-pointer py-3 px-1 border-slate-800 text-lg ease-in duration-100 ${active ? "" : "border-b-4"}`} id="my-blogs" onClick={changeActive}>My Blogs</div>
      </div>
      <div className="max-w-full h-auto flex flex-col gap-3 justify-center place-items-center ">
        {blogsState.map((blog) => (
          <BlogPreview key={blog.id} blog={blog} />
        ))}
      </div>
    </div>
  );
};
