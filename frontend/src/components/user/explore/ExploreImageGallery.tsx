import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Masonry from "@mui/lab/Masonry";
import { styled } from "@mui/material/styles";

import useFetchAllPosts from "../../../hooks/user/useFetchAllPosts";
import { RootState } from "../../../store/store";
import IComment from "../../../types/IComment";
import IUserDetails from "../../../types/IUserDetails";
import ImageModal from "../common/ImageModal";
import SkeletonLoader from "../../common/SkeletonLoader";

const Label = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(0.5),
  textAlign: "center",
  color: theme.palette.text.secondary,
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0,
}));

function ExploreImageGallery() {
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPost, setSelectedPost] = useState<{
    userId?: IUserDetails;
    imageUrl: string;
    _id: string;
    description: string;
    comments?: IComment[];
    likes?: string[];
  } | null>(null);

  const { fetchAllPosts } = useFetchAllPosts();
  const posts = useSelector((state: RootState) => state.posts.posts);

  useEffect(() => {
    const fetch = async () => {
      try {
        setIsLoading(true);
        await fetchAllPosts();
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Function for handle image click
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

  // Function for handle close modal
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedPost(null);
  };

  return (
    <>
      <Box sx={{ width: "100%", minHeight: 829 }}>
        <Masonry columns={3} spacing={2}>
          {isLoading ? (
            Array.from({ length: 12 }).map((_, index) => (
              <SkeletonLoader key={index} />
            ))
          ) : posts.length === 0 ? ( // Add this condition
            <div>No posts found</div>
          ) : (
            posts.map((post, index) => (
              <div
                key={post._id}
                onClick={() => handleImageClick(post)}
                style={{ cursor: "pointer" }}
              >
                <Label></Label>
                <img
                  srcSet={`${post.imageUrl}?w=162&auto=format&dpr=2 2x`}
                  src={`${post.imageUrl}?w=162&auto=format`}
                  alt={`gallery-photo-${index}`}
                  loading="lazy"
                  style={{
                    borderTopRightRadius: 4,
                    borderTopLeftRadius: 4,
                    borderBottomLeftRadius: 4,
                    borderBottomRightRadius: 4,
                    display: "block",
                    width: "100%",
                  }}
                />
              </div>
            ))
          )}
        </Masonry>
      </Box>
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

export default ExploreImageGallery;
