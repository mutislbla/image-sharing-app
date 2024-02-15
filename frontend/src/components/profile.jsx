import { getUserByToken } from "../utils/fetch";
import { useState, useEffect } from "react";
import EditProfile from "./editProfile";
export default function Profile({ id, username, avatar, bio, countPost }) {
  const [userId, setUserId] = useState(0);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const UserData = await getUserByToken();
        setUserId(UserData.user.id);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchUser();
  }, []);
  return (
    <div className="p-6 sm:p-12 text-gray-800">
      <div className="flex flex-col space-y-4 md:space-y-0 md:space-x-6 md:flex-row">
        <img
          src={avatar}
          alt={username}
          className="self-center flex-shrink-0 w-24 h-24 border rounded-full md:justify-self-start border-gray-300"
        />
        <div className="flex flex-col">
          <h4 className="text-lg font-semibold text-center md:text-left">
            {username}
          </h4>
          <div>
            <p className="text-gray-600">{bio}</p>
            <p className="text-gray-600">{countPost} posts</p>
          </div>
          {id == userId && (
            <div className="my-3">
              <EditProfile userAvatar={avatar} userBio={bio} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
