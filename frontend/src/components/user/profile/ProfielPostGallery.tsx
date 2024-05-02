import { useEffect, useState } from "react";
import { FaImages } from "react-icons/fa";
import useFetchUserPosts from "../../../hooks/user/useFetchUserPosts";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

export function DefaultGallery() {
  const { fetchUserPosts } = useFetchUserPosts();
  const user = useSelector((state: RootState) => state.user);
  const [posts, setPosts] = useState<{ imageUrl: string; _id: string }[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const postsData = await fetchUserPosts(user._id);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const updatedPosts = postsData.map(
          (post: { imageUrl: string; _id: string }) => ({
            ...post,
            imageUrl: post.imageUrl,
          })
        );
        setPosts(updatedPosts);
      } catch (error) {
        console.log("Error fetching posts:", error);
      }
    };

    fetchData();
  }, [fetchUserPosts, user._id]);

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
        {posts.map((post) => (
          <div key={post._id}>
            <img
              className="h-40 w-full max-w-full rounded-lg object-cover object-center"
              src={post.imageUrl}
              alt={`gallery-photo-${post._id}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
