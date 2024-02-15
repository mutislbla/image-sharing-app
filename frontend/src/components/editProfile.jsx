import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { useState, useEffect } from "react";
import { editProfil } from "../utils/fetch";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
export default function EditProfile({ userAvatar, userBio }) {
  const navigate = useNavigate();
  const [bio, setBio] = useState(userBio);
  const [imagePreview, setImagePreview] = useState(userAvatar);
  const [imageFile, setImageFile] = useState(null);
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
  const handleEdit = async () => {
    try {
      const formData = new FormData();
      formData.append("avatar", imageFile);
      formData.append("bio", bio);
      const userData = await editProfil(formData);
      await Swal.fire({
        title: "Updating Profile",
        icon: "info",
      });
      if (userData) {
        navigate(0);
      }
    } catch (error) {
      console.error("Error edit profile:", error);
    }
  };
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="px-2 py-1 text-white duration-100 bg-indigo-600 rounded-lg shadow-md focus:shadow-none ring-offset-2 ring-indigo-600 focus:ring-2">
          Edit Profile
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
        <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
          <Dialog.Title className="text-mauve12 mb-5 text-[17px] font-medium">
            Edit Profile
          </Dialog.Title>{" "}
          <div class="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8">
            <fieldset class="h-full rounded-lg">
              <label
                htmlFor="file-upload"
                className="flex flex-col items-center justify-center w-full h-full p-4 border-dashed border-2 border-gray-300 rounded-md cursor-pointer"
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
                      Click to change avatar
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
            </fieldset>

            <fieldset className="mb-[15px] flex items-center gap-5">
              <textarea
                type="bio"
                name="bio"
                id="bio"
                placeholder="change bio here..."
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full rounded-md focus:ring focus:ri focus:ri border-gray-00 text-gray-900 bg-gray-50 outline outline-offset-2 outline-1 p-3 h-32"
              />
            </fieldset>
          </div>
          <div className="mt-[25px] flex justify-end">
            <Dialog.Close asChild>
              <button
                onClick={handleEdit}
                className="bg-green4 text-green11 hover:bg-green5 focus:shadow-green7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none"
              >
                Save changes
              </button>
            </Dialog.Close>
          </div>
          <Dialog.Close asChild>
            <button
              className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
              aria-label="Close"
            >
              <Cross2Icon />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
