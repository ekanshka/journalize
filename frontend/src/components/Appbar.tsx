import { Link } from "react-router-dom"
import { Avatar } from "./Avatar"


export const Appbar = () => {
  return (
    <div className="w-full flex justify-between place-items-center px-9 py-3 border-b">
        <Link to={"/blogs"} className="logo text-3xl font-bold font-playfair">Journalize</Link>
        <div className="">
          <Link to={"/create-blog"}><button type="button" className="mr-4 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 ">New</button></Link>
          <Avatar name="Ekansh"/>
        </div>
    </div>
  )
}
