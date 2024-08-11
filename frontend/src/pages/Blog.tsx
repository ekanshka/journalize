import { useParams } from "react-router-dom";
import { useBlog } from "../hooks/useBlog";
import { Appbar } from "../components/Appbar";

export const Blog = () => {
  const { id } = useParams();

  const { blog, loading, error } = useBlog(id || "");

  if (error) {
    alert(error);
  }

  return (
    <div className="h-screen w-full flex flex-col place-items-center gap-5">
      <Appbar />
      {loading || !blog ? (
        <div className="h-full w-2/3 p-10 flex flex-col justify-center place-items-center">
          loading...
        </div>
      ) : (
        <div className="lg:w-1/2 md:w-4/5 w-full p-10 flex flex-col gap-8">
          <div className="md:text-5xl text-4xl font-bold">{blog.title}</div>
          <div className="text-slate-500">
            Posted on {new Date(blog.published).toDateString()}
          </div>
          {blog.author.name ? <div className="font-medium text-right px-10">By {blog.author.name}</div> : null}
          <div>{blog.content}</div>
        </div>
      )}
    </div>
  );
};
