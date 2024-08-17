import { Link } from "react-router-dom";
import { Appbar } from "../components/Appbar";
import { BlogPreview } from "../components/BlogPreview";
import { useBlogs } from "../hooks/useBlogs";

export const Blogs = () => {
  const { blogsState, loading } = useBlogs();

  return (
    <div className="h-screen w-full flex flex-col place-items-center">
      <Appbar />
      {loading ? (
        <div className="h-full w-2/3 p-10 flex flex-col justify-center place-items-center">
          loading...
        </div>
      ) : (
        <div className="md:max-w-3xl w-full p-10 flex flex-col">
          <div className="border-b-2 border-gray-200 flex gap-5 justify-start p-4">
            <Link to={"/create-blog"} className="cursor-pointer">Create new </Link>
            <span className="border-b-2 border-black cursor-pointer">
              For you
            </span>
          </div>
          <div className="max-w-full h-auto flex flex-col gap-3 justify-center place-items-center ">
            {blogsState.map((blog) => (
              <BlogPreview key={blog.id} blog={blog} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
