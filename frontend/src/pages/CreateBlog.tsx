import { ChangeEvent, useState } from "react";
import { Appbar } from "../components/Appbar";
import axios, { isAxiosError } from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { ButtonPublish } from "../components/ButtonPublish";

export const CreateBlog = () => {
  const navigate = useNavigate();
  const [blog, setBlog] = useState({ title: "", content: "" });
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    e.preventDefault();
    setBlog((prev) => {
      return {
        ...prev,
        [e.target.id]: e.target.value,
      };
    });
  };

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setIsSubmitting(true);
      const response = await axios.post(`${BACKEND_URL}/api/v1/blog`, blog, {
        headers: { Authorization: localStorage.getItem("Authorization") },
      });
      alert("new blog created!");
      navigate(`/blogs/${response.data.id}`);
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response) {
          alert(error.response.data.msg);
          setIsSubmitting(false)
        } else {
          alert(error.message);
          setIsSubmitting(false)
        }
      } else {
        console.log(error);
        setIsSubmitting(false)
      }
    }
  };
  
  return (
    <div className="h-screen w-full flex flex-col place-items-center gap-5 ">
      <Appbar />
      <form
        className="md:max-w-3xl w-full p-10 flex flex-col gap-6 "
        onSubmit={submitForm}
      >
        <input
          className="md:text-5xl text-4xl font-bold outline-none"
          placeholder="Title"
          id="title"
          onChange={handleChange}
        />
        <textarea
          className="font-roman md:leading-loose tracking-wide md:text-xl leading-relaxed outline-none"
          rows={15}
          placeholder="Tell your story..."
          id="content"
          onChange={handleChange}
        />
        <ButtonPublish isSubmitting={isSubmitting} />
      </form>
    </div>
  );
};
