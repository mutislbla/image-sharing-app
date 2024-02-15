import { useState, useRef, useEffect } from "react";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { getUserByToken } from "../utils/fetch";
import EditProfile from "./editProfile";
const ProfileDropDown = (props) => {
  const navigate = useNavigate();
  const [state, setState] = useState(false);
  const profileRef = useRef();
  const [userData, setUserData] = useState([]);
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState(0);
  const [avatar, setAvatar] = useState("");
  const [bio, setBio] = useState("");
  const handleLogout = () => {
    Swal.fire({
      icon: "success",
      title: "Success...",
      text: "Log out Successfully!",
    }).then(() => {
      Cookies.remove("token");
      navigate("/");
    });
  };

  const navigation = [
    { title: "Profile", path: "/profile" },
    { title: "Add Post", path: "/post/add" },
  ];

  useEffect(() => {
    const handleDropDown = (e) => {
      if (!profileRef.current.contains(e.target)) setState(false);
    };
    document.addEventListener("click", handleDropDown);
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const UserData = await getUserByToken();
        console.log("UserData", UserData);
        setUserData(UserData);
        setUsername(UserData.user.username);
        setUserId(UserData.user.id);
        setAvatar(UserData.user.avatar);
        setBio(UserData.user.bio);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchUser();
  }, []);

  return (
    <div className={`relative ${props.class}`}>
      <div className="flex items-center space-x-4">
        <button
          ref={profileRef}
          className="w-10 h-10 outline-none rounded-full ring-offset-2 ring-gray-200 ring-2 lg:focus:ring-indigo-600"
          onClick={() => setState(!state)}
        >
          <img src={avatar} className="w-full h-full rounded-full" />
        </button>
        <div className="lg:hidden">
          <span className="block">{username}</span>
        </div>
      </div>
      <ul
        className={`bg-gray-100 top-12 right-0 mt-5 space-y-5 lg:absolute lg:border lg:rounded-md lg:text-sm lg:w-52 lg:shadow-md lg:space-y-0 lg:mt-0 ${
          state ? "" : "lg:hidden"
        }`}
      >
        {navigation.map((item, idx) => (
          <li>
            <a
              key={idx}
              className="block text-gray-600 lg:hover:bg-gray-50 lg:p-2.5"
              href={item.path}
            >
              {item.title}
            </a>
          </li>
        ))}
        {/* <EditProfile userId={userId} userAvatar={avatar} userBio={bio} /> */}
        <div
          className="block text-gray-600 lg:hover:bg-gray-50 lg:p-2.5"
          onClick={handleLogout}
        >
          Log Out
        </div>
      </ul>
    </div>
  );
};
export default () => {
  const [menuState, setMenuState] = useState(false);
  return (
    <nav className="bg-gray-100 fixed top-0 left-0 right-0 z-50">
      <div className="flex items-center space-x-8 py-3 px-4 max-w-screen-xl mx-auto md:px-8">
        <div className="flex-none lg:flex-initial">
          <a href="/homepage">
            <img
              src="https://res.cloudinary.com/dtwpfnenl/image/upload/v1707658410/logo_vkorzu.png"
              width={120}
              height={50}
              alt="SnapShare"
            />
          </a>
        </div>
        <div className="flex-1 flex items-center justify-between">
          <div
            className={`bg-gray-100 absolute z-20 w-full top-16 left-0 p-4 border-b lg:static lg:block lg:border-none ${
              menuState ? "" : "hidden"
            }`}
          >
            <ProfileDropDown class="mt-5 pt-5 border-t lg:hidden" />
          </div>
          <div className="flex-1 flex items-center justify-end space-x-2 sm:space-x-6">
            <div className="flex items-center space-x-2 rounded-md p-2"></div>
            {/* <form className="flex items-center space-x-2 border rounded-md p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 flex-none text-gray-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                className="w-full outline-none appearance-none placeholder-gray-500 text-gray-500 sm:w-auto bg-gray-100"
                type="text"
                placeholder="Search"
              />
            </form> */}
            <ProfileDropDown class="hidden lg:block" />
            <button
              className="outline-none text-gray-400 block lg:hidden"
              onClick={() => setMenuState(!menuState)}
            >
              {menuState ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
