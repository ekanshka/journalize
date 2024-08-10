import { Avatar } from "./Avatar"


export const Appbar = () => {
  return (
    <div className="w-full flex justify-between place-items-center px-10 py-2 border-2 ">
        <div className="logo text-2xl">Medium</div>
        <Avatar name="Ekansh"/>
    </div>
  )
}
