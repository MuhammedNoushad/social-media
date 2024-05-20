import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { FaRegFlag, FaTrash, FaUserMinus, FaUserPlus } from "react-icons/fa";

import { RootState } from "../../../store/store";
import IPosts from "../../../types/IPosts";
import IConnection from "../../../types/IConnection";
import ImageModal from "../common/ImageModal";
import IComment from "../../../types/IComment";
import IUserDetails from "../../../types/IUserDetails";
import useLikePost from "../../../hooks/user/useLikePost";
import Dialog from "../../common/Dialog";
import useReportPost from "../../../hooks/user/useReportPost";
import useDeletePost from "../../../hooks/user/useDeletePost";
import { useNavigate } from "react-router-dom";
import { shuffle } from "lodash";
import formatDate from "../../../utils/formatData";
import useFollow from "../../../hooks/user/useFollow";

function Post() {
  const navigate = useNavigate();
  const [reason, setReason] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showReportDialog, setShowReportDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [postReported, setPostReported] = useState("");
  const [selectedPost, setSelectedPost] = useState<{
    userId?: IUserDetails;
    imageUrl: string;
    _id: string;
    description: string;
    comments?: IComment[];
    likes?: string[];
  } | null>(null);

  const { deletePost } = useDeletePost();
  const { likePost } = useLikePost();
  const { reportPost } = useReportPost();
  const { follow, unfollow } = useFollow();

  const posts = useSelector((state: RootState) => state.posts.posts);
  const currentUser = useSelector((state: RootState) => state.user);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const connections: any = useSelector(
    (state: RootState) => state.connection.connection
  );

  const detailsElement = document.querySelector("details");

  const isFollowingAnyUser =
    connections?.following?.length > 0 ||
    posts.some((post: IPosts) => post.userId?._id === currentUser._id);

  let filteredPosts = isFollowingAnyUser
    ? posts.filter((post: IPosts) => {
        const isFollowingOrOwnPost =
          connections?.following?.some(
            (user: IConnection) => user._id === post.userId?._id
          ) || post.userId?._id === currentUser._id;

        const hasReportedPost = post.reports?.some((report) => {
          return report.userId._id === currentUser._id;
        });

        const isNotReportedByCurrentUser = !hasReportedPost;

        return isFollowingOrOwnPost && isNotReportedByCurrentUser;
      })
    : shuffle(posts).slice(0, 5);

  if (filteredPosts.length < 5) {
    const remainingPosts = shuffle(
      posts.filter(
        (post: IPosts) =>
          !filteredPosts.some((filteredPost) => filteredPost._id === post._id)
      )
    ).slice(0, 5 - filteredPosts.length);
    filteredPosts = [...filteredPosts, ...remainingPosts];
  }

  const handleImageClick = (post: {
    userId: IUserDetails;
    imageUrl: string;
    _id: string;
    description: string;
    comments?: IComment[];
    likes?: string[];
  }) => {
    setSelectedPost(post);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedPost(null);
  };

  // Function for liking post
  const handleLike = async (postId: string) => {
    try {
      await likePost(postId);
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

    const reported = await reportPost(postReported, currentUser._id, reason);

    if (reported) {
      setSelectedPost(null);
      setPostReported("");
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
  const openDeleteModal = (postId: string) => {
    setSelectedPost(posts.find((post) => post._id === postId) || null);
    setShowDeleteDialog(true);
  };

  // Function to close the delete modal
  const closeDeleteModal = () => {
    setShowDeleteDialog(false);
    setSelectedPost(null);
  };

  // Function to confirm delete
  const confirmDelete = async () => {
    if (selectedPost) {
      try {
        await deletePost(selectedPost._id);
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

  const handleFollow = async (userId: string) => {
    try {
      await follow(currentUser._id, userId);
    } catch (error) {
      console.log(error, "error from handleFollow");
    }
  };

  // Function for handle unfollow User
  const handleUnfollow = async (userId: string) => {
    try {
      await unfollow(currentUser._id, userId);
    } catch (error) {
      console.log(error, "error from handleUnfollow");
    }
  };

  return (
    <>
      <div className="max-w-3xl mx-auto">
        <div className=" max-w-lg mx-auto ">
          {filteredPosts &&
            filteredPosts.map((image: IPosts) => (
              <div className="mb-6 " key={image._id}>
                <section className="my-3 px-3 text-black">
                  <div className="flex items-center justify-between space-x-4">
                    <div className="flex items-center space-x-2">
                      <img
                        src={image.userId?.profileimg}
                        alt="millionaires-formula"
                        className="w-10 h-10 rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 p-0.5 hover:cursor-pointer"
                      />
                      <h6
                        onClick={() => {
                          const { userId } = image;
                          const currentUserId = currentUser?._id;

                          if (userId?._id === currentUserId) {
                            navigate("/profile");
                          } else {
                            navigate(`/profile/${userId?._id}`);
                          }
                        }}
                        className="font-medium text-sm cursor-pointer"
                      >
                        {image.userId?.username}
                      </h6>
                      <span className="text-gray-500 text-2xl">&middot;</span>
                      <span className="text-gray-500 text-xs">
                        {formatDate(image.createdAt)}{" "}
                      </span>
                    </div>

                    <details className="dropdown">
                      <summary className="m-1 btn btn-ghost text-white hover:text-white hover:bg-transparent">
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
                      {image && image.userId?._id === currentUser._id ? (
                        <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
                          <li onClick={() => openDeleteModal(image._id)}>
                            <a>
                              <FaTrash className="mr-2" /> Delete
                            </a>
                          </li>
                        </ul>
                      ) : (
                        <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
                          <li>
                            <a
                              onClick={() => {
                                setPostReported(image._id);
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
                            <a>
                              {connections?.following?.some(
                                (user: IConnection) =>
                                  user._id === image.userId._id
                              ) ? (
                                <>
                                  <FaUserMinus className="mr-2" />{" "}
                                  <a
                                    onClick={() =>
                                      handleUnfollow(image.userId?._id)
                                    }
                                    href=""
                                  >
                                    Unfollow
                                  </a>
                                </>
                              ) : (
                                <>
                                  <FaUserPlus className="mr-2" />{" "}
                                  <a
                                    onClick={() => {
                                      handleFollow(image.userId?._id);
                                    }}
                                    href=""
                                  >
                                    Follow
                                  </a>
                                </>
                              )}
                            </a>
                          </li>
                        </ul>
                      )}
                    </details>
                  </div>
                  <div className="py-3 h-96">
                    <img
                      onClick={() => handleImageClick(image)}
                      src={image.imageUrl}
                      alt="meme-1"
                      className="rounded-lg w-full h-full object-cover hover:cursor-pointer"
                    />
                  </div>

                  {/* Like Sections */}
                  <div className="flex justify-between">
                    <div className="flex space-x-4">
                      {image.likes?.includes(currentUser._id) ? (
                        <svg
                          aria-label="Unlike"
                          className="x1lliihq x1n2onr6 cursor-pointer"
                          color="rgb(255, 48, 64)"
                          fill="rgb(255, 48, 64)"
                          height="24"
                          role="img"
                          viewBox="0 0 48 48"
                          width="24"
                          onClick={() => handleLike(image._id)}
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
                          onClick={() => handleLike(image._id)}
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
                        onClick={() => handleImageClick(image)}
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
                  <div className="my-2 font-medium text-sm">
                    {image.likes?.length} likes
                  </div>
                  <div className="flex space-x-2 text-sm">
                    <a className=" font-bold">{image.userId?.username}</a>
                    <p>{image.description}</p>
                  </div>
                  <div
                    onClick={() => handleImageClick(image)}
                    className="text-sm text-gray-400 py-2 cursor-pointer"
                  >
                    {image.comments?.length !== 0 &&
                      `View all ${image.comments?.length} comments`}
                  </div>
                </section>
                <hr className="border-gray-700" />
              </div>
            ))}
        </div>
      </div>
      {showModal && selectedPost && (
        <ImageModal
          showModal={showModal}
          selectedPost={selectedPost}
          onClose={handleCloseModal}
        />
      )}

      <dialog id="my_modal_1" className="modal">
        <ul className="modal-box w-80 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
          <h3 className="font-bold text-lg">
            Why are you reporting this post?
          </h3>
          <form method="dialog">
            <button
              onClick={() => handleReport("It's spam")}
              className="cursor-pointer w-full mt-4 px-4 py-2 border-b border-gray-200 rounded-t-lg dark:border-gray-600"
            >
              It's spam
            </button>
            <button
              onClick={() => handleReport("Nudity or sexual activity")}
              className="cursor-pointer w-full px-4 py-2 border-b border-gray-200 dark:border-gray-600"
            >
              Nudity or sexual activity
            </button>
            <button
              onClick={() => handleReport("Scam or fraud")}
              className="cursor-pointer w-full px-4 py-2 border-b border-gray-200 dark:border-gray-600"
            >
              Scam or fraud
            </button>
            <button
              onClick={() => handleReport("False information")}
              className="cursor-pointer w-full px-4 py-2 border-b border-gray-200 dark:border-gray-600"
            >
              False information
            </button>
            <button
              onClick={() => handleReport("I just don't like it")}
              className="cursor-pointer w-full px-4 py-2 border-b border-gray-200 dark:border-gray-600"
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
}

export default Post;
