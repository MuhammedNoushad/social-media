import React, { useEffect, useState } from "react";
import useFetchStoryOfSingleUser from "../../../hooks/user/useFetchStoryOfSingleUser";
import { BiTrash } from "react-icons/bi";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import IUserDetails from "../../../types/IUserDetails";
import StoryViewedUsers from "./StoryViewedUsers";

interface CarouselModalProps {
  statusUserId: string;
  isOpen: boolean;
  onClose: () => void;
}

interface Story {
  story: {
    _id: string;
    storyImg: string;
    viewed: IUserDetails[];
  }[];
}

const CarouselModal: React.FC<CarouselModalProps> = ({
  isOpen,
  onClose,
  statusUserId,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [stories, setStories] = useState<Story>({ story: [] });
  const [viewedUsers, setViewedUsers] = useState<IUserDetails[]>([]);
  const [openViewedUsers, setOpenViewedUsers] = useState<boolean>(false);

  const { fetchStoryOfSingleUser, deleteStory, addStoryView } =
    useFetchStoryOfSingleUser();

  const loggedInUser = useSelector((state: RootState) => state.user);

  useEffect(() => {
    const fetchStories = async () => {
      const response = await fetchStoryOfSingleUser(statusUserId);
      setStories(response);
    };
    fetchStories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusUserId]);

  const handlePrevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? stories.story.length - 1 : prevSlide - 1
    );
  };

  const handleNextSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === stories.story.length - 1 ? 0 : prevSlide + 1
    );
  };

  // Function for delete story
  const handleDeleteStory = async (storyId: string) => {
    const response = await deleteStory(storyId, loggedInUser._id);

    if (response) {
      toast.success("Story deleted successfully");
      setStories(response);
      onClose();
    }
  };

  // Function for push userId to story view
  const setStoryViews = async (storyId: string) => {
    const response = await addStoryView(
      storyId,
      statusUserId,
      loggedInUser._id
    );
    if (response) {
      setStories(response);
    }
  };

  // Function for showing story viewed users
  const showViewedUsers = (viewed: IUserDetails[]) => {
    setViewedUsers(viewed);
    setOpenViewedUsers(true);
  };

  const showNextAndPrevButtons = stories.story && stories.story.length > 1;
  const showNextButton =
    showNextAndPrevButtons && currentSlide < stories.story.length - 1;
  const showPrevButton = showNextAndPrevButtons && currentSlide > 0;

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div
          className="fixed inset-0 bg-black opacity-70"
          onClick={() => {
            onClose();
            setCurrentSlide(0);
          }}
        />
        <div className="relative z-10 max-w-4xl p-6 bg-white rounded-lg shadow-lg md:w-3/4 lg:w-2/3 xl:w-1/2">
          <div className="relative">
            <div className="overflow-hidden w-full min-h-[24rem] bg-gray-100 rounded-lg">
              <div
                className="flex transition-transform duration-700"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {stories.story &&
                  stories.story.map((slide, index) => {
                    return (
                      <div
                        key={slide._id}
                        className="relative flex-shrink-0 w-full flex justify-center items-center p-4"
                      >
                        <img
                          onLoad={() => {
                            setStoryViews(slide._id);
                          }}
                          src={slide.storyImg}
                          alt={`Story ${index + 1}`}
                          className="w-full h-full object-cover rounded-lg shadow-md"
                          style={{ width: "500px", height: "500px" }}
                        />
                        {loggedInUser._id === statusUserId && (
                          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 cursor-pointer">
                            <div
                              onClick={() => {
                                showViewedUsers(slide.viewed);
                              }}
                              className="flex items-center justify-center  bg-opacity-50 rounded-full p-2"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 text-white"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                />
                              </svg>
                              <span className="ml-2 text-white">
                                {slide.viewed.length}
                              </span>
                            </div>
                          </div>
                        )}
                        {loggedInUser?._id === statusUserId && (
                          <button
                            onClick={() => handleDeleteStory(slide._id)}
                            className="absolute cursor-pointer top-2 z-20 right-12 bg-red-500 text-white py-1 px-2 rounded-3xl"
                          >
                            <BiTrash />
                          </button>
                        )}
                      </div>
                    );
                  })}
              </div>
            </div>
            {showPrevButton && (
              <button
                type="button"
                className="absolute inset-y-0 left-0 flex items-center justify-center p-2 m-2 text-red-900 bg-tr rounded-full hover:bg-gray-100 "
                onClick={handlePrevSlide}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
            )}
            {showNextButton && (
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center justify-center p-2 m-2 text-red-900 bg-tr rounded-full hover:bg-gray-100"
                onClick={handleNextSlide}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>
      {openViewedUsers && (
        <StoryViewedUsers
          viewedUsers={viewedUsers}
          onClose={() => {
            setOpenViewedUsers(false);
          }}
        />
      )}
    </>
  );
};

export default CarouselModal;
