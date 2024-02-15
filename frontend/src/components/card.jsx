import { useState, useEffect } from "react";
import { getUserByUserId, getUserByToken, deletePost } from "../utils/fetch";
import { MdOutlineModeEditOutline, MdDeleteOutline } from "react-icons/md";
import EditButton from "./editButton";
import DeleteButton from "./deleteButton";
export default function Card({ post }) {
  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState("");
  const [userId, setUserId] = useState(0);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUserByUserId(post.user_id);
        setUsername(userData.user.username);
        setAvatar(userData.user.avatar);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchUser();
  }, []);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userDatas = await getUserByToken();
        setUserId(userDatas.user.id);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchUsers();
  }, []);
  const datePost = post.created_at;
  const [year, month, day] = datePost.split("T")[0].split("-");
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const linkUserProfile = `/profile/${post.user_id}`;
  const handleEdit = async () => {
    alert("handle edit");
    // try {
    // } catch (error) {}
  };
  const handleDelete = async () => {
    alert("handle delete");
    // try {
    // } catch (error) {}
  };
  return (
    <div className="flex flex-col max-w-sm p-6 space-y-6 overflow-hidden rounded-lg shadow-md text-gray-800">
      <div className="flex space-x-4">
        <img
          alt=""
          src={avatar}
          className="object-cover w-12 h-12 rounded-full shadow bg-gray-500"
        />
        <div className="flex flex-col space-y-1">
          <a
            rel="noopener noreferrer"
            href={linkUserProfile}
            className="text-sm font-semibold"
          >
            {username}
          </a>
          <span className="text-xs text-gray-600">
            {day} {monthNames[Number(month) - 1]} {year}
          </span>
        </div>
      </div>
      <div>
        <img
          src={post.image}
          alt={post.caption}
          className="object-cover w-full mb-4 h-60 sm:h-96 bg-gray-500"
        />
        <h2 className="mb-1 text-lg font-semibold">{post.caption}</h2>
      </div>
      {userId == post.user_id && (
        <div className="flex flex-wrap justify-end">
          <div className="flex space-x-2 text-sm text-gray-600">
            <EditButton post={post} />
            <DeleteButton post={post} />
          </div>
        </div>
      )}
    </div>
  );
}
