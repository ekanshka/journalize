import { Link, useNavigate } from "react-router-dom";
import { Avatar } from "./Avatar";
import { useUser } from "../hooks/useUser";
import { Dropdown } from "flowbite-react";

export const Appbar = () => {
  const navigate = useNavigate();

  const { user, error, loading } = useUser();

  const handleLogout = () => {
    localStorage.removeItem("Authorization");
    alert("Logged out!");
    navigate("/signin");
  };

  const handleAllBlogRedirect = () => {
    navigate("/blogs?tab=for-you");
  };

  const handleMyBlogRedirect = () => {
    navigate("/blogs?tab=my-blogs");
  };

  if (!user || error || loading) {
    return;
  }

  const name = user.name ? user.name : "Anonymous";

  return (
    <div className="w-full flex justify-between place-items-center px-9 py-3 border-b">
      <Link to={"/blogs"} className="logo text-3xl font-bold font-playfair">
        Journalize
      </Link>
      <div className="flex justify-center place-items-center gap-4">
        <Link to={"/blogs/publish"}>
          <button
            type="button"
            className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 "
          >
            New
          </button>
        </Link>
        {/* <div className="border p-1 rounded-md border-blue-600">
            <Avatar name={name} />
            <span className="p-1">Hi, {name}</span>
          </div> */}

        <Dropdown
          label=""
          renderTrigger={() => (
            <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 ">
              <span className="relative px-3 py-1.5 transition-all ease-in duration-75 bg-white rounded-md flex gap-3 justify-center place-items-center">
                <Avatar name={name} />
                <span className="p-1">Hi, {name}</span>
              </span>
            </button>
          )}
        >
          <Dropdown.Header>
            <span className="block text-sm">{name}</span>
            <span className="block truncate text-sm font-medium">
              {user.email}
            </span>
          </Dropdown.Header>
          <Dropdown.Item onClick={handleAllBlogRedirect}>For You</Dropdown.Item>
          <Dropdown.Item onClick={handleMyBlogRedirect}>My Blogs</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item onClick={handleLogout}>Sign out</Dropdown.Item>
        </Dropdown>
        {/* <button
          type="button"
          onClick={handleLogout}
          className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
        >
          Logout
        </button> */}
      </div>
    </div>
  );
};
