import { useForm } from "react-hook-form"
import { SignupSchema } from "@ekanshk/medium-common";
import { Link, useNavigate } from "react-router-dom";
import axios, { isAxiosError } from "axios";
import { BACKEND_URL } from "../config";


export const SignupForm = () => {

    const navigate = useNavigate();
  const { register, handleSubmit, formState: { isSubmitting } } = useForm<SignupSchema>();

    const onSubmit = async (data: SignupSchema) => {
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/signup`, data)
            const token = response.data.token;
            localStorage.setItem("Authorization", `Bearer ${token}`);
            navigate("/blogs");
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                alert(error.response.data.msg);
            }
        }
        // .catch((error) => {
        // })
    }

  return (
    // <form className="max-w-96 p-7 flex flex-col gap-7 rounded-xl border-gray-950 shadow-2xl">
    <form className="max-w-96 p-7 flex flex-col gap-7 " onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-3 text-center">
            <h3 className="text-4xl font-bold p-3">Create an account</h3>
            <h4 className="text-gray-500">Already have an account? <Link to="/signin" className="cursor-pointer text-gray-500 underline">Login</Link></h4>
        </div>
        <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-900">Email: </label>
                <input {...register("email")} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" type="email" placeholder="example@email.com"/>
            </div>
            <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-900">Username: </label>
                <input {...register("name")} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" type="text" placeholder="username"/>
            </div>
            <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-900">Password: </label>
                <input {...register("password")} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" type="password" placeholder="password"/>
            </div>
        </div>
        <button type="submit" disabled={isSubmitting} className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
            {
                isSubmitting ?
                "Loading..." :
                "Sign up"
            }
        </button>
    </form>
  )
}
