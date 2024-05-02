import React, { useState } from "react";
import { UploadButton } from "@bytescale/upload-widget-react";

import IFileUpload from "../../../types/IFileUpload";
import Image from "../../../types/IFileImage";
import axios from "../../../axios/axios";
import useCreatePost from "../../../hooks/user/useCreatePost";

const presetKey: string = import.meta.env.VITE_REACT_APP_PRESET_KEY;
const cloudname: string = import.meta.env.VITE_REACT_APP_CLOUDNAME;

const PostCreate: React.FC = () => {
  const { createPost } = useCreatePost();
  const [, setPostUrl] = useState<string>("");
  const [desc, setDesc] = useState("");
  const [images, setImages] = useState<Image[]>([]);
  const [changePicLoading, setChangePicLoading] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handlePictureUpload = (files: IFileUpload[] | any) => {
    if (files.length > 0) {
      setChangePicLoading(true);
      const newImages = files.map((file: IFileUpload) => ({
        url: file.fileUrl,
        name: file.originalFile.originalFileName,
        preview: ["jpg", "jpeg", "png", "gif"].includes(
          file.originalFile.originalFileName.split(".").pop()?.toLowerCase() ||
            ""
        ),
        size:
          file.originalFile.size > 1024
            ? file.originalFile.size > 1048576
              ? `${Math.round(file.originalFile.size / 1048576)} MB`
              : `${Math.round(file.originalFile.size / 1024)} KB`
            : `${file.originalFile.size} B`,
      }));
      setImages((prevImages) => [...prevImages, ...newImages]);
      setChangePicLoading(false);
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setChangePicLoading(true);
    e.preventDefault();
  
    console.log("desc:", desc);
    console.log("Images:", images);
  
    const file = images[0];
  
    try {
      const blobPromise = fetch(file.url).then((res) => res.blob());
      const blob = await blobPromise;
  
      const profileForm = new FormData();
      profileForm.append("file", blob, file.name);
      profileForm.append("upload_preset", presetKey || "");
  
      const res = await axios({
        method: "post",
        url: `https://api.cloudinary.com/v1_1/${cloudname}/image/upload`,
        data: profileForm,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      const url = res.data.secure_url;
      setPostUrl(url);
  
      const postData = await createPost({ desc, imageUrl: url });
      console.log(postData);
    } catch (error) {
      console.error(error);
    } finally {
      setChangePicLoading(false);
    }
  };

  return (
    <div className="bg-white ml-4 shadow w-3/4 p-4 py-8">
      <div className="heading text-center font-bold text-2xl m-5 text-gray-800 bg-white">
        New Post
      </div>
      <form
        onSubmit={handleSubmit}
        className="editor mx-auto w-10/12 flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg max-w-2xl"
      >
        <input
          className="desc bg-gray-100 border border-gray-300 p-2 mb-4 outline-none"
          spellCheck="false"
          placeholder="Write a caption..."
          type="text"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        {/* Icons */}
        <div className="icons flex text-gray-500 m-2">
          <UploadButton
            options={{ apiKey: "free", maxFileCount: 4 }}
            onComplete={handlePictureUpload}
          >
            {({ onClick }) => (
              <label htmlFor="select-image" className="cursor-pointer">
                <svg
                  className="mr-2 hover:text-gray-700 border rounded-full p-1 h-7"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  onClick={onClick}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                  />
                </svg>
              </label>
            )}
          </UploadButton>
          <div className="count ml-auto text-gray-400 text-xs font-semibold">
            {images.length}/300
          </div>
        </div>

        {/* Preview image here */}
        <div id="preview" className="my-4  flex flex-wrap">
          {images.map((image, index) => (
            <div
              key={index}
              className="relative w-30 h-30 sm:42 sm:42  md:w-64 md:h-64 object-cover rounded m-2"
            >
              {image.preview ? (
                <div className="relative grid grid-cols-1 w-30 h-30 sm:42 sm:42  md:w-64 md:h-64   object-cover rounded">
                  <img
                    src={image.url}
                    className="w-30 h-30 sm:42 sm:42  md:w-64 md:h-64 object-cover rounded"
                    alt={image.name}
                  />
                  <button
                    className="w-6 h-6 absolute text-center flex items-center top-0 right-0 m-2 text-white text-lg bg-red-500 hover:text-red-700 hover:bg-gray-100 rounded-full p-1"
                    onClick={() => handleRemoveImage(index)}
                  >
                    <span className="mx-auto">×</span>
                  </button>
                </div>
              ) : (
                <div className="relative w-20 h-20 sm:w-64 sm:h-64 object-cover rounded">
                  <svg
                    className="fill-current w-64 h-64 ml-auto pt-1"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path d="M15 2v5h5v15h-16v-20h11zm1-2h-14v24h20v-18l-6-6z" />
                  </svg>
                  <button
                    className="w-6 h-6 absolute text-center flex items-center top-0 right-0 m-2 text-white text-lg bg-red-500 hover:text-red-700 hover:bg-gray-100 rounded-full p-1"
                    onClick={() => handleRemoveImage(index)}
                  >
                    <span className="mx-auto">×</span>
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div
          className={`buttons flex justify-end ${
            changePicLoading ? "cursor-not-allowed" : ""
          }`}
        >
          <button
            type="submit"
            className="btn border border-indigo-500 p-1 px-4 font-semibold cursor-pointer text-gray-200 ml-2 bg-indigo-500 "
            disabled={changePicLoading || images.length === 0}
          >
            {changePicLoading ? (
              <span className="loading loading-spinner"></span>
            ) : (
              "Post"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostCreate;
