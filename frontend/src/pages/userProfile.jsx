import { useState, useEffect } from "react";
import { getUserByUserId, getPostByUserId } from "../utils/fetch";
import Card from "../components/card";
import Profile from "../components/profile";
import { useParams } from "react-router-dom";
export default function UserProfile() {
  const { id } = useParams();
  const [posts, setPosts] = useState([]);
  const [countPosts, setCountPosts] = useState(0);
  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState("");
  const [bio, setBio] = useState("");
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const postData = await getPostByUserId(id);
        console.log("postData", postData);
        setPosts(postData);
        setCountPosts(postData.posts.length);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPost();
  }, [id]);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const UserData = await getUserByUserId(id);
        console.log("UserData", UserData);
        setUsername(UserData.user.username);
        setAvatar(UserData.user.avatar);
        setBio(UserData.user.bio);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchUser();
  }, [id]);
  return (
    <div className="bg-gray-100 mt-10">
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
