import { useEffect, useState } from "react";
import { FaTelegramPlane, FaImages, FaTimes } from "react-icons/fa";
import useFetchUserPosts from "../../../hooks/user/useFetchUserPosts";
import SkeletonLoader from "../../common/SkeletonLoader";

export function DefaultGallery({ userId }: { userId: string }) {
  const [loading, setLoading] = useState(true);
  const { fetchUserPosts } = useFetchUserPosts();
  const [posts, setPosts] = useState<
    { imageUrl: string; _id: string; description: string }[]
  >([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState<{
    imageUrl: string;
    _id: string;
    description: string;
  } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const postsData = await fetchUserPosts(userId);
        const updatedPosts = postsData.map(
          (post: { imageUrl: string; _id: string; description: string }) => ({
            ...post,
            imageUrl: post.imageUrl,
          })
        );
        console.log(updatedPosts);
        setPosts(updatedPosts);
        setLoading(false);
      } catch (error) {
        console.log("Error fetching posts:", error);
      }
    };
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  const handleImageClick = (post: {
    imageUrl: string;
    _id: string;
    description: string;
  }) => {
    setSelectedPost(post);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedPost(null);
  };

  return (
    <div>
      <div className="flex justify-center items-center mb-4">
        <div className="w-full h-px bg-gray-300"></div>
        <span className="mx-4 text-gray-600 font-semibold flex items-center">
          <FaImages className="mr-2" /> Posts
        </span>
        <div className="w-full h-px bg-gray-300"></div>
      </div>
      <div className="p-0 mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {loading
          ? Array.from({ length: 9 }, (_, index) => (
              <SkeletonLoader key={index} />
            ))
          : posts.map((post) => (
              <div key={post._id} onClick={() => handleImageClick(post)}>
                <img
                  className="h-40 w-full max-w-full rounded-lg object-cover object-center cursor-pointer"
                  src={post.imageUrl}
                  alt={`gallery-photo-${post._id}`}
                />
              </div>
            ))}
      </div>

      {showModal && selectedPost && (
        <div className="fixed z-50 inset-0 flex items-center justify-center">
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div className="relative z-10 w-3/4 h-3/4 bg-white rounded-lg shadow-lg">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={handleCloseModal}
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
                  <div className="bg-gray-100 p-2 rounded-md mb-2">
                    <p className="text-sm text-gray-600">
                      <span className="font-semibold mr-2">Aslah</span>
                      {selectedPost.description}
                    </p>
                  </div>
                  {/* Comments section */}
                  {/* Add your comments section code here */}
                  <div className="bg-gray-100 p-2 rounded-md mb-2">
                    <p className="text-sm text-gray-600">
                      <span className="font-semibold mr-2">diyakrishna:</span>
                      Thinner diya with Shorter Hair
                      <span className="text-gray-500 ml-2">@aswin_ganesh_</span>
                    </p>
                  </div>
                  <div className="bg-gray-100 p-2 rounded-md mb-2">
                    <p className="text-sm text-gray-600">
                      <span className="font-semibold mr-2">anupama_anuzp:</span>
                      😍
                    </p>
                  </div>
                  {/* Add more comments here */}
                </div>
                <div className="w-auto mt-auto">
                  <div className="relative w-full min-w-[200px] h-10">
                    <div className="absolute grid w-5 h-5 place-items-center text-blue-gray-500 top-2/4 right-3 -translate-y-2/4">
                      <FaTelegramPlane aria-hidden="true" />
                    </div>
                    <input
                      className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] !pr-9 border-blue-gray-200 focus:border-gray-900"
                      placeholder=" "
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
      )}
    </div>
  );
}
