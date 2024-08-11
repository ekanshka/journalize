import { Link } from "react-router-dom"
import { Avatar } from "./Avatar"


export const Appbar = () => {
  return (
    <div className="w-full flex justify-between place-items-center px-9 py-3 border-b">
        <Link to={"/blogs"} className="logo text-3xl font-semibold">Medium</Link>
        <Avatar name="Ekansh"/>
    </div>
  )
}
