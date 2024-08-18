import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";
import { useNavigate, useSearchParams } from "react-router-dom";

interface IBlog {
  id: string;
  title: string;
  content: string;
  published: Date;
  author: { name: string };
  authorId: string;
}

export const useBlogs = () => {
  const [blogsState, setBlogsState] = useState<IBlog[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams({tab: "for-you"});
  const tab = searchParams.get("tab") || ""

  const fetchBlogs = async (tab: string) => {

    let link = "/api/v1/blog/bulk";

    if (tab === "my-blogs") {
      link = "/api/v1/blog/my-blogs"
    } else {
      link = "/api/v1/blog/bulk"
    }

    try {
      const response = await axios.get(BACKEND_URL + link, {
        headers: {
          Authorization: localStorage.getItem("Authorization"),
        },
      });
      const blogs = response.data;
      setBlogsState(blogs);
      setLoading(false);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          alert(error.response.data.msg);

          if (error.response.status === 401) {
            navigate("/signin");
          }
        } else {
          alert(error.message);
        }
      } else {
        console.log(error);
      }
    }
  };


  useEffect(() => {
    fetchBlogs(tab);
  }, [tab]);

  return { blogsState, loading, setSearchParams };
};
