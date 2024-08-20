import axios, { isAxiosError } from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { ButtonPublish } from "../components/ButtonPublish";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createBlogSchema, CreateBlogSchema } from "@ekanshk/medium-common";
import { useEffect } from "react";

export const CreateBlog = () => {
  const navigate = useNavigate();
  // const [isSubmitting, setIsSubmitting] = useState(false);


  const {register, handleSubmit, formState: {errors, isSubmitting}} = useForm<CreateBlogSchema>({resolver: zodResolver(createBlogSchema)})

  
  const submitForm = async (data: CreateBlogSchema) => {
    
    try {
      const response = await axios.post(`${BACKEND_URL}/api/v1/blog`, data, {
        headers: { Authorization: localStorage.getItem("Authorization") },
      });
      alert("new blog created!");
      navigate(`/blogs/${response.data.id}`);
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response) {
          // setError("root", error.response.data.msg)
          alert(error.response.data.msg);
          if (error.response.status === 401) {
            navigate("/signin");
          }
        } else {
          // setError("root", error)
          alert(error.message);
        }
      } else {
        console.log(error);
      }
    }
  };
  
  useEffect(() => {
    if (errors.title || errors.content || errors.root) {
      alert(errors.title?.message || errors.content?.message || errors.root?.message) 
    }
  }, [errors])

  return (
      <form
        className="md:max-w-3xl w-full p-10 flex flex-col gap-6 "
        onSubmit={handleSubmit(submitForm)}
      >
        <input
          className="md:text-5xl text-4xl font-bold outline-none"
          placeholder="Title"
          id="title"
          {...register("title")}
        />
        <textarea
          className="font-roman md:leading-loose tracking-wide md:text-xl leading-relaxed outline-none focus:outline-none border-none"
          rows={15}
          placeholder="Tell your story..."
          id="content"
          {...register("content")}
        />
        <ButtonPublish isSubmitting={isSubmitting} />
        {/* {errors? <div>{errors.root?.message}</div> : null} */}
      </form>
  );
};
