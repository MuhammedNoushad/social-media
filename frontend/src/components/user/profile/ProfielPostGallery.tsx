import { useEffect, useState } from "react";
import { FaImages } from "react-icons/fa";
import useFetchUserPosts from "../../../hooks/user/useFetchUserPosts";
import SkeletonLoader from "../../common/SkeletonLoader";
import ImageModal from "../common/ImageModal";
import { useNavigate } from "react-router-dom";

export function DefaultGallery({
  userId,
  profile,
}: {
  userId: string;
  profile: string;
}) {
  const navigate = useNavigate();
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
    <>
      <div className="flex justify-center items-center mb-4">
        <div className="w-full h-px bg-gray-300"></div>
        <span className="mx-4 text-gray-600 font-semibold flex items-center">
          <FaImages className="mr-2" /> Posts
        </span>
        <div className="w-full h-px bg-gray-300"></div>
      </div>
      {posts.length === 0 && !loading && profile === "own" ? (
        <div className="p-4 mb-6">
          <div className="m-auto flex justify-center">
            <img
              src="/public/placeholder.jpg"
              className="w-80 h-72"
              alt="placeholder"
            />
          </div>

          <button
            onClick={() => {
              navigate("/post");
            }}
            className="btn  p-4 bg-red-400 hover:bg-red-600 rounded-md m-auto flex justify-center text-white"
          >
            Add post
          </button>
        </div>
      ) : (
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
      )}
      {showModal && selectedPost && (
        <ImageModal
          showModal={showModal}
          selectedPost={selectedPost}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
}
