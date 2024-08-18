import { Outlet } from 'react-router-dom'
import { Appbar } from '../components/Appbar'

export const BlogLayout = () => {
  return (
    <div className='h-screen w-full flex flex-col place-items-center'>
        <Appbar />
        <Outlet />
    </div>
  )
}
