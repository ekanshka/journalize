import { Link } from "react-router-dom";
import { Avatar } from "./Avatar";

interface IBlog {
  id: string;
  title: string;
  content: string;
  published: Date;
  author: {
    name: string;
  };
  authorId: string;
}

interface IBlogPreviewProps {
  blog: IBlog;
}

export const BlogPreview = ({ blog }: IBlogPreviewProps) => {
  const authorName: string = blog.author.name || "Anonymous";

  return (
    <Link
      to={`/blogs/${blog.id}`}
      className="flex flex-col gap-3 border-b-2 w-full px-3 py-5 cursor-pointer"
    >
      {/* <div className="font-semibold text-sm">{blog.author.name? blog.author.name : "Anonymous"}</div> */}
      <div className="flex place-items-center gap-3">
        <Avatar name={authorName} size="xs" />
        <div className="text-sm">{blog.author.name || "Anonymous"} </div>
        <Circle />
        <div className="text-sm">{new Date(blog.published).toDateString()}</div>
      </div>
      <div className="font-bold text-2xl">{blog.title}</div>
      <div>{blog.content.slice(0, 100) + "..."}</div>
      <div className="text-gray-700 text-sm mt-3">
        {Math.ceil(blog.content.length / 600) + " minute(s) read"}
      </div>
    </Link>
  );
};

function Circle() {
  return <div className="w-1 h-1 rounded-full bg-slate-500"></div>;
}
