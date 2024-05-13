// ImageModal.tsx
import React, { useState } from "react";
import { FaTelegramPlane, FaTimes } from "react-icons/fa";
import IComment from "../../../types/IComment";
import IUserDetails from "../../../types/IUserDetails";
import usePostComment from "../../../hooks/user/usePostComment";
import useLikePost from "../../../hooks/user/useLikePost";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

interface ImageModalProps {
  showModal: boolean;
  selectedPost: {
    likes?: string[];
    userId: IUserDetails;
    comments?: IComment[];
    imageUrl: string;
    _id: string;
    description: string;
  } | null;
  onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({
  showModal,
  selectedPost,
  onClose,
}) => {
  const [comments, setComments] = useState<IComment[]>(
    selectedPost?.comments || []
  );
  const [commentInput, setCommentInput] = useState<string>("");
  const { postComment } = usePostComment();
  const { likePost } = useLikePost();
  const currentUser = useSelector((state: RootState) => state.user);
  const [liked, setLiked] = useState(
    selectedPost?.likes?.includes(currentUser._id)
  );

  if (!showModal || !selectedPost) {
    return null;
  }

  // Function for adding a new comment
  const handlePostComment = async () => {
    try {
      const newComment = await postComment(commentInput, selectedPost._id);
      if (newComment) {
        setComments([...comments, newComment]);
      }
      setCommentInput("");
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  // Function for liking post
  const handleLike = async (postId: string) => {
    try {
      await likePost(postId);
      setLiked(!liked);
    } catch (error) {
      console.log("Error liking post:", error);
    }
  };

  return (
    <div className="fixed z-50 inset-0 flex items-center justify-center">
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 w-3/4 h-3/4 bg-white rounded-lg shadow-lg">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <FaTimes size={24} />
        </button>
        <div className="flex h-full">
          <div className="w-2/3 h-full">
            <img
              className="h-full w-full object-cover object-center rounded-l-lg"
              src={selectedPost.imageUrl}
              alt={`gallery-photo-${selectedPost._id}`}
            />
          </div>
          <div className="w-1/3 h-full p-4 flex flex-col">
            <div className="flex-grow overflow-y-auto">
              {/* Image description */}
              <div className="bg-gray-100 p-2 rounded-md mb-2 flex items-start">
                <img
                  src={selectedPost.userId.profileimg}
                  alt={selectedPost.userId.username}
                  className="w-8 h-8 rounded-full mr-2"
                />
                <div>
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold mr-2">
                      {selectedPost.userId.username}:
                    </span>
                    {selectedPost.description}
                  </p>
                </div>
              </div>
              {/* Comments section */}
              {comments?.map((comment: IComment) => (
                <div
                  key={comment._id}
                  className="bg-gray-100 p-1 rounded-md mb-2 flex items-start"
                >
                  <img
                    src={comment.userId.profileimg}
                    alt={comment.userId.username}
                    className="w-8 h-8 rounded-full mr-2"
                  />
                  <div>
                    <p className="text-sm text-gray-600">
                      <span className="font-semibold mr-2">
                        {comment.userId.username}:
                      </span>
                      {comment.comment}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <hr className="border-gray-700" />

            <div className="flex justify-between my-4 p-1 ">
              <div className="flex space-x-4">
                <svg
                  aria-label="Like"
                  className={`x1lliihq x1n2onr6 cursor-pointer ${
                    liked ? "fill-red-500" : "hover:fill-red-500"
                  }`}
                  fill={liked ? "red" : "black"}
                  height="24"
                  role="img"
                  viewBox="0 0 24 24"
                  width="24"
                  onClick={() => handleLike(selectedPost._id)}
                >
                  <title>Like</title>
                  <path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z" />
                </svg>
                <svg
                  aria-label="Comment"
                  className="x1lliihq x1n2onr6 cursor-pointer hover:text-gray-400"
                  color="black"
                  fill="black"
                  height="24"
                  role="img"
                  viewBox="0 0 24 24"
                  width="24"
                >
                  <title>Comment</title>
                  <path
                    d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z"
                    fill="none"
                    stroke="currentColor"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  ></path>
                </svg>
                <svg
                  aria-label="Share Post"
                  className="x1lliihq x1n2onr6 cursor-pointer hover:text-gray-400"
                  color="black"
                  fill="black"
                  height="24"
                  role="img"
                  viewBox="0 0 24 24"
                  width="24"
                >
                  <title>Share Post</title>
                  <line
                    fill="none"
                    stroke="currentColor"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    x1="22"
                    x2="9.218"
                    y1="3"
                    y2="10.083"
                  ></line>
                  <polygon
                    fill="none"
                    points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334"
                    stroke="currentColor"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  ></polygon>
                </svg>
              </div>

              <div>
                <svg
                  aria-label="Save"
                  className="x1lliihq x1n2onr6 cursor-pointer"
                  color="black"
                  fill="black"
                  height="24"
                  role="img"
                  viewBox="0 0 24 24"
                  width="24"
                >
                  <title>Save</title>
                  <polygon
                    fill="none"
                    points="20 21 12 13.44 4 21 4 3 20 3 20 21"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  ></polygon>
                </svg>
              </div>
            </div>
            <hr className="border-gray-700 mb-2" />
            <div className="w-auto mt-auto">
              <div className="relative w-full min-w-[200px] h-10">
                <div className="absolute grid w-5 h-5 place-items-center text-blue-gray-500 top-2/4 right-3 -translate-y-2/4">
                  <FaTelegramPlane
                    className="cursor-pointer"
                    aria-hidden="true"
                    onClick={handlePostComment}
                  />
                </div>
                {/* Like Sections */}

                <input
                  className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] !pr-9 border-blue-gray-200 focus:border-gray-900"
                  placeholder=" "
                  value={commentInput}
                  onChange={(e) => setCommentInput(e.target.value)}
                />
                <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
                  Add a comment...
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
