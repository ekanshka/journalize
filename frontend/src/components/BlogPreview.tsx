import { Avatar } from "./Avatar";


interface IBlog {
  id: string;
  title: string;
  content: string;
  published: boolean;
  author: {
    name: string
  };
  authorId: string;
}

interface IBlogPreviewProps {
  blog: IBlog;
}

export const BlogPreview = ({ blog }: IBlogPreviewProps) => {

  const authorName: string = blog.author.name || "Anonymous";

  return (
    <div className="flex flex-col gap-2 border-b-2 w-full px-3 py-5">
        {/* <div className="font-semibold text-sm">{blog.author.name? blog.author.name : "Anonymous"}</div> */}
        <div className="flex place-items-center gap-3">
          <Avatar name={authorName}/>
          <div className="text-sm">Anonymous</div>
          <Circle />
          <div className="text-sm">8 Aug 2024</div>
        </div>
        <div className="font-bold text-2xl">{blog.title}</div>
        <div>{blog.content.slice(0, 100) + "..."}</div>
        <div className="text-gray-700 text-sm mt-3">{Math.ceil(blog.content.length / 100) + " minute(s) read"}</div>
    </div>
);
};


function Circle () {
  return <div className="w-1 h-1 rounded-full bg-slate-500"></div>
}

