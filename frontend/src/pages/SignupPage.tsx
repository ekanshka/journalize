import { Quote } from "../components/Quote"
import { SignupForm } from "../components/SignupForm"


export const SignupPage = () => {
  return (
    <div className="w-full h-screen grid grid-cols-1 lg:grid-cols-2">
        <div className="w-full h-screen flex flex-col justify-center items-center">
          <SignupForm />
        </div>
        <div className="w-full h-screen hidden lg:flex lg:flex-col lg:justify-center lg:items-center">
          <Quote />
        </div>
    </div>
  )
}
