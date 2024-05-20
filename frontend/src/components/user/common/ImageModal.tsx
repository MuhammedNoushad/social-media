// ImageModal.tsx
import React, { useEffect, useRef, useState } from "react";
import {
  FaEdit,
  FaRegFlag,
  FaTelegramPlane,
  FaTimes,
  FaTrash,
  FaUserMinus,
  FaUserPlus,
} from "react-icons/fa";
import { toast } from "sonner";

import IComment from "../../../types/IComment";
import IUserDetails from "../../../types/IUserDetails";
import usePostComment from "../../../hooks/user/usePostComment";
import useLikePost from "../../../hooks/user/useLikePost";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import IConnection from "../../../types/IConnection";
import useFollow from "../../../hooks/user/useFollow";
import useReportPost from "../../../hooks/user/useReportPost";
import useDeletePost from "../../../hooks/user/useDeletePost";
import Dialog from "../../common/Dialog";
import axios from "../../../axios/axios";
import { setPosts } from "../../../store/features/postsSlice";

interface ImageModalProps {
  showModal: boolean;
  selectedPost: {
    likes?: string[];
    userId?: IUserDetails;
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
  const [reason, setReason] = useState("");
  const [comments, setComments] = useState<IComment[]>(
    selectedPost?.comments || []
  );
  const [showReportDialog, setShowReportDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [commentInput, setCommentInput] = useState<string>("");
  const [editingCommentId, setEditingCommentId] = useState("");
  const [editedComment, setEditedComment] = useState("");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const connections: any = useSelector(
    (state: RootState) => state.connection.connection
  );
  const currentUser = useSelector((state: RootState) => state.user);
  const [liked, setLiked] = useState(
    selectedPost?.likes?.includes(currentUser._id)
  );

  const { postComment } = usePostComment();
  const { likePost } = useLikePost();
  const { follow, unfollow } = useFollow();
  const { reportPost } = useReportPost();
  const { deletePost } = useDeletePost();

  const dispatch = useDispatch();

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        handleCancelEdit();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (!showModal || !selectedPost) {
    return null;
  }

  const detailsElement = document.querySelector("details");

  // Function for adding a new comment
  const handlePostComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!commentInput) return;
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

  // Function for Show report modal
  const handleReport = (reason: string) => {
    setReason(reason);

    const modal = document.getElementById("my_modal_1");
    if (modal && modal instanceof HTMLDialogElement) {
      modal.close();
    }
    setShowReportDialog(true);
  };

  // Function for confirm report
  const confirmReport = async () => {
    setShowReportDialog(false);

    const reported = await reportPost(
      selectedPost._id,
      currentUser._id,
      reason
    );

    if (reported) {
      setReason("");
      toast.success("Post reported successfully");
      if (detailsElement) {
        detailsElement.open = false;
      }
    }
  };

  // Function for cancel report
  const cancelReport = () => {
    if (detailsElement) {
      detailsElement.open = false;
    }
    setShowReportDialog(false);
  };

  // Function to open the delete modal
  const openDeleteModal = () => {
    setShowDeleteDialog(true);
  };

  // Function to close the delete modal
  const closeDeleteModal = () => {
    setShowDeleteDialog(false);
  };

  // Function to confirm delete
  const confirmDelete = async () => {
    if (selectedPost) {
      try {
        await deletePost(selectedPost._id);
        window.location.reload();
      } catch (error) {
        console.log("Error deleting post:", error);
      }
    }
    closeDeleteModal();
  };

  // Function to cancel delete
  const cancelDelete = () => {
    closeDeleteModal();
  };

  const handleFollow = async () => {
    try {
      await follow(currentUser._id, selectedPost.userId?._id || "");
    } catch (error) {
      console.log(error, "error from handleFollow");
    }
  };

  // Function for handle edit comment
  const handleEditComment = (commentId: string) => {
    setEditingCommentId(commentId);
    setEditedComment(
      comments.find((comment) => comment?._id === commentId)?.comment || ""
    );
  };

  const handleSaveComment = async (commentId: string) => {
    if (!editedComment) {
      return setEditingCommentId("");
    }
    const response = await axios.put(
      `/api/posts/comment/${selectedPost._id}/${commentId}`,
      { comment: editedComment }
    );

    if (response.data.success) {
      setComments(
        comments.map((comment) =>
          comment._id === commentId
            ? { ...comment, comment: editedComment }
            : comment
        )
      );
      setEditingCommentId("");
      setEditedComment("");
      dispatch(setPosts(response.data.postData));
      toast.success("Comment updated successfully");
    } else {
      toast.error("Error updating comment");
    }
  };

  const handleCancelEdit = () => {
    setEditingCommentId("");
    setEditedComment("");
  };

  // Function for handle delete comment
  const handleDeleteComment = async (commentId: string) => {
    const originalComments = [...comments];
    try {
      setComments(comments.filter((comment) => comment._id !== commentId));

      const response = await axios.delete(
        `/api/posts/comment/${selectedPost._id}/${commentId}`
      );

      if (response.data.success) {
        dispatch(setPosts(response.data.postData));
        toast.success("Comment deleted successfully");
      } else {
        toast.error("Error deleting comment");
        setComments(originalComments);
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
      toast.error("Error deleting comment");
      setComments(originalComments);
    }
  };

  // Function for handle unfollow User
  const handleUnfollow = async () => {
    try {
      await unfollow(currentUser._id, selectedPost.userId?._id || "");
    } catch (error) {
      console.log(error, "error from handleUnfollow");
    }
  };

  return (
    <>
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
              <div className="flex-grow ">
                {/* Image description */}
                <div className="bg-gray-100 p-2 rounded-md mb-2 flex items-center ">
                  <img
                    src={selectedPost.userId?.profileimg}
                    alt={selectedPost.userId?.username}
                    className="w-8 h-8 rounded-full mr-2"
                  />
                  <div className="flex items-center">
                    <div>
                      <p className="text-sm text-gray-600">
                        <span className="font-semibold mr-2 font-roboto-condensed">
                          {selectedPost.userId?.username}:
                        </span>
                        {selectedPost.description}
                      </p>
                    </div>
                    <details className="dropdown">
                      <summary className="mr-4 btn btn-ghost text-white hover:text-white hover:bg-transparent">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="25"
                          height="25"
                          viewBox="0 0 256 256"
                          className="text-black fill-current cursor-pointer hover:text-black"
                        >
                          <path d="M112 60a16 16 0 1 1 16 16a16 16 0 0 1-16-16Zm16 52a16 16 0 1 0 16 16a16 16 0 0 0-16-16Zm0 68a16 16 0 1 0 16 16a16 16 0 0 0-16-16Z" />
                        </svg>
                      </summary>
                      {selectedPost &&
                      selectedPost.userId?._id === currentUser._id ? (
                        <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52 font-roboto-condensed">
                          <li>
                            <a>
                              <FaEdit className="mr-2" /> Edit
                            </a>
                          </li>
                          <li onClick={() => openDeleteModal()}>
                            <a>
                              <FaTrash className="mr-2" /> Delete
                            </a>
                          </li>
                        </ul>
                      ) : (
                        <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52 font-roboto-condensed">
                          <li>
                            <a
                              onClick={() => {
                                const modal = document.getElementById(
                                  "my_modal_1"
                                ) as HTMLDialogElement;
                                if (modal) {
                                  modal.showModal();
                                }
                              }}
                            >
                              <FaRegFlag className="mr-2" /> Report
                            </a>
                          </li>
                          <li>
                            {connections?.following?.some(
                              (user: IConnection) =>
                                user._id === selectedPost.userId?._id
                            ) ? (
                              <a onClick={() => handleUnfollow()}>
                                <FaUserMinus className="mr-2" />
                                Unfollow
                              </a>
                            ) : (
                              <a onClick={() => handleFollow()}>
                                <FaUserPlus className="mr-2" />
                                Follow
                              </a>
                            )}
                          </li>
                        </ul>
                      )}
                    </details>
                  </div>
                </div>
                {/* Comments section */}
                {comments?.map((comment) => (
                  <div
                    key={comment._id}
                    className="bg-gray-100 p-1 rounded-md mb-2 flex items-start"
                  >
                    <img
                      src={comment.userId.profileimg}
                      alt={comment.userId.username}
                      className="w-8 h-8 rounded-full mr-2"
                    />
                    <div className="flex-1 max-w-md">
                      {editingCommentId === comment._id ? (
                        <div className="flex">
                          <form
                            onSubmit={(e) => {
                              e.preventDefault();
                              handleSaveComment(comment._id);
                            }}
                            className="flex"
                          >
                            <input
                              type="text"
                              value={editedComment}
                              onChange={(e) => setEditedComment(e.target.value)}
                              className="flex-1 px-2 py-1 rounded-md font-roboto-condensed"
                              ref={inputRef}
                            />
                          </form>
                        </div>
                      ) : (
                        <p className="text-sm text-gray-600 overflow-hidden overflow-ellipsis whitespace-nowrap font-roboto-condensed">
                          <span className="font-semibold mr-2 ">
                            {comment.userId.username}:{" "}
                          </span>
                          {comment.comment}
                        </p>
                      )}
                    </div>
                    {comment.userId._id === currentUser._id &&
                      editingCommentId !== comment._id && (
                        <div className="flex p-2 justify-evenly w-20 cursor-pointer">
                          <FaEdit
                            onClick={() => handleEditComment(comment._id)}
                            className="text-gray-600 w-4 cursor-pointer"
                          />
                          <FaTrash
                            onClick={() => handleDeleteComment(comment._id)}
                            className="text-gray-600 w-4"
                          />
                        </div>
                      )}
                  </div>
                ))}
              </div>
              <hr className="border-gray-700" />

              <div className="flex justify-between my-4 p-1 ">
                <div className="flex space-x-4">
                  {liked ? (
                    <svg
                      aria-label="Unlike"
                      className="x1lliihq x1n2onr6 cursor-pointer"
                      color="rgb(255, 48, 64)"
                      fill="rgb(255, 48, 64)"
                      height="24"
                      role="img"
                      viewBox="0 0 48 48"
                      width="24"
                      onClick={() => handleLike(selectedPost._id)}
                    >
                      <title>Unlike</title>
                      <path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path>
                    </svg>
                  ) : (
                    <svg
                      aria-label="Like"
                      className="x1lliihq x1n2onr6 cursor-pointer hover:fill-red-500"
                      color="black"
                      fill="black"
                      height="24"
                      role="img"
                      viewBox="0 0 24 24"
                      width="24"
                      onClick={() => handleLike(selectedPost._id)}
                    >
                      <title>Like</title>
                      <path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"></path>
                    </svg>
                  )}
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
              <form onSubmit={handlePostComment}>
                <div className="w-auto mt-auto">
                  <div className="relative w-full min-w-[200px] h-10">
                    <button
                      type="submit"
                      className="absolute grid w-5 h-5 place-items-center text-blue-gray-500 top-2/4 right-3 -translate-y-2/4"
                    >
                      <FaTelegramPlane
                        className="cursor-pointer"
                        aria-hidden="true"
                      />
                    </button>
                    {/* Like Sections */}

                    <input
                      className="peer w-full h-full bg-transparent text-blue-gray-700 font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] !pr-9 border-blue-gray-200 focus:border-gray-900 font-roboto-condensed"
                      placeholder=" "
                      value={commentInput}
                      onChange={(e) => setCommentInput(e.target.value)}
                    />
                    <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900 font-roboto-condensed">
                      Add a comment...
                    </label>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <dialog id="my_modal_1" className="modal">
        <ul className="modal-box w-80 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
          <h3 className="font-bold text-lg font-roboto-condensed">
            Why are you reporting this post?
          </h3>
          <form method="dialog">
            <button
              onClick={() => handleReport("It's spam")}
              className="cursor-pointer w-full mt-4 px-4 py-2 border-b border-gray-200 rounded-t-lg dark:border-gray-600 font-roboto-condensed"
            >
              It's spam
            </button>
            <button
              onClick={() => handleReport("Nudity or sexual activity")}
              className="cursor-pointer w-full px-4 py-2 border-b border-gray-200 dark:border-gray-600 font-roboto-condensed"
            >
              Nudity or sexual activity
            </button>
            <button
              onClick={() => handleReport("Scam or fraud")}
              className="cursor-pointer w-full px-4 py-2 border-b border-gray-200 dark:border-gray-600 font-roboto-condensed"
            >
              Scam or fraud
            </button>
            <button
              onClick={() => handleReport("False information")}
              className="cursor-pointer w-full px-4 py-2 border-b border-gray-200 dark:border-gray-600 font-roboto-condensed"
            >
              False information
            </button>
            <button
              onClick={() => handleReport("I just don't like it")}
              className="cursor-pointer w-full px-4 py-2 border-b border-gray-200 dark:border-gray-600 font-roboto-condensed"
            >
              I just don't like it
            </button>
            <div className="modal-action">
              <button>Close</button>
            </div>
          </form>
        </ul>
      </dialog>

      {/* Confirmation Modal for report */}
      <Dialog
        title="Report Post"
        message="Are you sure you want to report this post?"
        isOpen={showReportDialog}
        onConfirm={confirmReport}
        onCancel={cancelReport}
      />

      {/* Confirmation modal for delete post */}
      <Dialog
        title="Delete Post"
        message="Are you sure you want to delete this post?"
        isOpen={showDeleteDialog}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </>
  );
};

export default ImageModal;
