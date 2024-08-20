import { Route, Routes } from "react-router-dom"
import { SignupPage } from "./pages/SignupPage"
import { SigninPage } from "./pages/SigninPage"
import { Blogs } from "./pages/Blogs"
import { NotFound } from "./pages/NotFound"
import { Blog } from "./pages/Blog"
import { CreateBlog } from "./pages/CreateBlog"
import { BlogLayout } from "./pages/BlogLayout"


function App() {

  return (
    <Routes>
      <Route path="/signup" element={<SignupPage />}/>
      <Route path="/signin" element={<SigninPage />}/>
      <Route path="/blogs" element={<BlogLayout />}>
        <Route path="" element={<Blogs />}/>
        <Route path=":id" element={<Blog />}/>
        <Route path="publish" element={<CreateBlog />}/>
      </Route>
      <Route path="*" element={<NotFound />}/>
    </Routes>
  )
}

export default App
