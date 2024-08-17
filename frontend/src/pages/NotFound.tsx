import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const NotFound = () => {
  
  const navigate = useNavigate();

  const redirect = () => {
    navigate("/blogs")
  }

  useEffect(() => {
    redirect();
  }, [])

  return (
    <div className="text-red-600 bold text-5xl w-full flex justify-center mt-16">
        404 Not Found
    </div>
  )
}
