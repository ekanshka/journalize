import { Quote } from "../components/Quote"
import { SigninForm } from "../components/SigninForm"


export const SigninPage = () => {
  return (
    <div className="w-full h-screen grid grid-cols-1 lg:grid-cols-2">
        <div className="w-full h-screen flex flex-col justify-center items-center">
          <SigninForm />
        </div>
        <div className="w-full h-screen hidden lg:flex lg:flex-col lg:justify-center lg:items-center">
          <Quote />
        </div>
    </div>
  )
}
