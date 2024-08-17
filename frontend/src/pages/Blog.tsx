import { useParams } from "react-router-dom";
import { useBlog } from "../hooks/useBlog";
import { Appbar } from "../components/Appbar";
import { Circle } from "../components/Circle";

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
        <div className="md:max-w-3xl w-full p-10 flex flex-col gap-8">
          <div className="md:text-5xl text-4xl font-bold">{blog.title}</div>
          <div className="flex flex-col gap-1">
          {blog.author.name ? (
                <div className="font-medium">
                  By {blog.author.name}
                </div>
            ) : null}
          <div className="text-slate-500 flex gap-3 place-items-center text-sm">
            Posted on {new Date(blog.published).toDateString()}
            <Circle />
            <span className="">{Math.ceil(blog.content.length / 600) + " minute(s) read"}</span>
          </div>
          </div>
          <div className="font-roman md:leading-loose tracking-wide md:text-xl leading-relaxed">{blog.content}</div>
        </div>
      )}
    </div>
  );
};
