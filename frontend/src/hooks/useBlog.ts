import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

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

export const useBlog = (id: string) => {
  const [blog, setBlog] = useState<IBlog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const fetchBlog = async (id: string) => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
        headers: { Authorization: localStorage.getItem("Authorization") },
      });
      setLoading(false);
      setBlog(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          setError(error.response.data.msg);
          if (error.response.status === 401) {
            navigate("/signin");
          }
        } else {
          setError(error.message);
        }
      } else {
        setError("there was an error fetching the blog");
        console.log(error);
      }
    }
  };

  useEffect(() => {
    fetchBlog(id);
  }, [id]);

  return { blog, loading, error };
};
