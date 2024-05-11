import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { FaEdit, FaRegFlag, FaTrash, FaUserMinus } from "react-icons/fa";

import { RootState } from "../../../store/store";
import IPosts from "../../../types/IPosts";
import IConnection from "../../../types/IConnection";
import ImageModal from "../common/ImageModal";
import IComment from "../../../types/IComment";
import IUserDetails from "../../../types/IUserDetails";
import useLikePost from "../../../hooks/user/useLikePost";
import Dialog from "../../common/Dialog";
import useReportPost from "../../../hooks/user/useReportPost";

function Post() {
  const [reason, setReason] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showReportDialog, setShowReportDialog] = useState(false);
  const [postReported, setPostReported] = useState("");
  const [selectedPost, setSelectedPost] = useState<{
    userId: IUserDetails;
    imageUrl: string;
    _id: string;
    description: string;
    comments?: IComment[];
    likes?: string[];
  } | null>(null);

  const { likePost } = useLikePost();
  const { reportPost } = useReportPost();

  const posts = useSelector((state: RootState) => state.posts.posts);
  const currentUser = useSelector((state: RootState) => state.user);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const connections: any = useSelector(
    (state: RootState) => state.connection.connection
  );

  const detailsElement = document.querySelector("details");

  const filteredPosts = posts.filter((post: IPosts) => {
    return (
      connections?.following?.some(
        (user: IConnection) => user._id === post.userId?._id
      ) || post.userId?._id === currentUser._id
    );
  });

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

  return (
    <>
      <div className="max-w-3xl mx-auto">
        <div className=" max-w-lg mx-auto ">
          {filteredPosts.map((image: IPosts) => (
            <div className="mb-6 " key={image._id}>
              <section className="my-3 px-3 text-black">
                <div className="flex items-center justify-between space-x-4">
                  <div className="flex items-center space-x-2">
                    <img
                      src={image.userId.profileimg}
                      alt="millionaires-formula"
                      className="w-10 h-10 rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 p-0.5 hover:cursor-pointer"
                    />
                    <h6 className="font-medium text-sm">
                      {image.userId.username}
                    </h6>
                    <span className="text-gray-500 text-2xl">&middot;</span>
                    <span className="text-gray-500 text-xs">3 m</span>
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
                    {image.userId._id === currentUser._id ? (
                      <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
                        <li>
                          <a>
                            <FaEdit className="mr-2" /> Edit
                          </a>
                        </li>
                        <li>
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
                            <FaUserMinus className="mr-2" /> Unfollow
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
                    <svg
                      aria-label="Like"
                      className={`x1lliihq x1n2onr6 cursor-pointer ${
                        image.likes?.includes(currentUser._id)
                          ? "fill-red-500"
                          : "hover:fill-red-500"
                      }`}
                      fill={
                        image.likes?.includes(currentUser._id) ? "red" : "black"
                      }
                      height="24"
                      role="img"
                      viewBox="0 0 24 24"
                      width="24"
                      onClick={() => handleLike(image._id)}
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
                  <a className="font-medium">{image.userId.username}</a>
                  <p>{image.description}</p>
                </div>
                <div className="text-sm text-gray-400 py-2 cursor-pointer">
                  View all 13 comments
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
    </>
  );
}

export default Post;
