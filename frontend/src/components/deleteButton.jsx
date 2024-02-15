import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { MdDeleteOutline } from "react-icons/md";
import { Cross2Icon } from "@radix-ui/react-icons";
import { deletePost } from "../utils/fetch";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
export default function DeleteButton({ post }) {
  const navigate = useNavigate();
  const id = post.id;
  const handleDelete = async () => {
    try {
      const postData = await deletePost(id);
      await Swal.fire({
        title: "Deleting Post",
        icon: "info",
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
            <MdDeleteOutline />
          </div>
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className=" data-[state=open]:animate-overlayShow fixed inset-0" />
        <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
          <Dialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
            Delete Post
          </Dialog.Title>
          <Dialog.Description className=" mt-[10px] mb-5 text-[15px] leading-normal">
            Are u sure want to delete this post?
          </Dialog.Description>
          <div className="mt-[25px] flex justify-end">
            <Dialog.Close asChild>
              <button
                onClick={handleDelete}
                className="green4-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none"
              >
                Sure, delete this post.
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
