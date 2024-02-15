import { useState } from "react";
import { addPost } from "../utils/fetch";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
export default function AddPost() {
  const navigate = useNavigate();
  const [caption, setCaption] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!caption || imageFile == null) {
      Swal.fire({
        title: "Form data",
        text: "Please make sure all fields are filled in before submitting the form.",
        icon: "warning",
      });
    } else {
      try {
        const formData = new FormData();
        formData.append("caption", caption);
        formData.append("image", imageFile);
        const postData = await addPost(formData);
        console.log("postData", postData);
        Swal.fire({
          title: "Posting Blog",
          text: "Wait a minute until posted",
          icon: "info",
        });
        navigate("/profile");
      } catch (error) {
        console.error("Error add post:", error);
      }
    }
  };
  return (
    <main className="w-full h-screen bg-gray-100 flex flex-col items-center justify-center px-4">
      <div className="max-w-xl w-full text-gray-600 space-y-5">
        <div className="text-center pb-8">
          <div className="mt-5">
            <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">
              Create New Post
            </h3>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div class="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8">
            <div class="h-full rounded-lg">
              <label
                htmlFor="file-upload"
                className="flex flex-col items-center justify-center w-full h-32 p-4 border-dashed border-2 border-gray-300 rounded-md cursor-pointer"
              >
                <input
                  id="file-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Selected"
                    width={500}
                    height={500}
                    className="w-32 h-32 object-cover mb-2 rounded-md"
                  />
                ) : (
                  <div className="flex flex-col items-center">
                    <svg
                      className="w-10 h-10 text-gray-400 mb-2"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M12 4v16m8-8H4"></path>
                    </svg>
                    <p className="text-sm text-gray-500">
                      Click to select a image
                    </p>
                  </div>
                )}
              </label>
              {imagePreview && (
                <div className="mt-4">
                  <p className="text-lg font-semibold text-gray-700">
                    {imagePreview.name}
                  </p>
                </div>
              )}
            </div>
            <div class="h-full rounded-lg">
              <div>
                <textarea
                  type="text"
                  name="caption"
                  id="caption"
                  placeholder="input caption here..."
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  className="w-full rounded-md focus:ring focus:ri focus:ri border-gray-00 text-gray-900 bg-gray-50 outline outline-offset-2 outline-1 p-3 h-32"
                />
              </div>
            </div>
          </div>
          <button className="w-full mt-4 px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150 ">
            Upload
          </button>
        </form>
      </div>
    </main>
  );
}
