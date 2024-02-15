import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { Cross2Icon } from "@radix-ui/react-icons";
import { useState } from "react";
import { editPost } from "../utils/fetch";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
export default function EditButton({ post }) {
  const navigate = useNavigate();
  const [caption, setCaption] = useState(post.caption);
  const id = post.id;
  const handleEdit = async () => {
    try {
      const postData = await editPost(id, caption);
      //   console.log("postData", postData);
      await Swal.fire({
        title: "Updating Success",
        icon: "success",
      });
      navigate(0);
    } catch (error) {
      console.error("Error edit post:", error);
    }
  };
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="flex items-center p-1 space-x-1.5">
          <div className="h-4 w-4">
            <MdOutlineModeEditOutline />
          </div>
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
        <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
          <Dialog.Title className="text-mauve12 mb-5 text-[17px] font-medium">
            Edit Caption
          </Dialog.Title>
          <fieldset className="mb-[15px] flex items-center gap-5">
            <textarea
              type="text"
              name="caption"
              id="caption"
              placeholder="input caption here..."
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="w-full rounded-md focus:ring focus:ri focus:ri border-gray-00 text-gray-900 bg-gray-50 outline outline-offset-2 outline-1 p-3 h-32"
            />
          </fieldset>
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
