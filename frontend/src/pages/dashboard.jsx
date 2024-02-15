import { useState, useEffect } from "react";
import { getUserByToken, getPostByToken } from "../utils/fetch";
import Card from "../components/card";
import Profile from "../components/profile";
export default function Dashboard() {
  const [posts, setPosts] = useState([]);
  const [countPosts, setCountPosts] = useState(0);
  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState("");
  const [id, setID] = useState(0);
  const [bio, setBio] = useState("");
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const postData = await getPostByToken();
        setPosts(postData);
        setCountPosts(postData.posts.length);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPost();
  }, []);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const UserData = await getUserByToken();
        setUsername(UserData.user.username);
        setID(UserData.user.id);
        setAvatar(UserData.user.avatar);
        setBio(UserData.user.bio);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchUser();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen mt-10">
      <div className="mx-24">
        <Profile
          id={id}
          username={username}
          avatar={avatar}
          bio={bio}
          countPost={countPosts}
        />
      </div>
      <div className="flex justify-center items-center bg-gray-100">
        <div className="my-10">
          {Array.isArray(posts.posts) && posts.posts.length > 0 ? (
            posts.posts.map((post) => (
              <div className="pb-5">
                <Card post={post} />
              </div>
            ))
          ) : (
            <p className="ml-24">No post available.</p>
          )}
        </div>
      </div>
    </div>
  );
}
