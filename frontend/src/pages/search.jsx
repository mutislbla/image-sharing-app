import Card from "../components/card";
import { useState, useEffect } from "react";
import { getAllPost } from "../utils/fetch";
export default function HomePage() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const postData = await getAllPost();
        console.log("postData", postData);
        setPosts(postData);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPost();
  }, []);
  return (
    <div className="flex justify-center items-center bg-gray-100  mt-10">
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
  );
}
