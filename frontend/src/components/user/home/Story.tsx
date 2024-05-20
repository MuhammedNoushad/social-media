import React, { useEffect, useRef, useState } from "react";
import useFetchAllStory from "../../../hooks/user/useFetchAllStory";
import IStory from "../../../types/IStory";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import CarouselModal from "./StoryModal";

const StoryComponent: React.FC = () => {
  const [stories, setStories] = useState<IStory[]>([]);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [statusId, setStatusId] = useState<string>("");

  const containerRef = useRef<HTMLDivElement>(null);

  const { fetchAllStory } = useFetchAllStory();

  const loggedInUser = useSelector((state: RootState) => state.user);

  useEffect(() => {
    const fetchStories = async () => setStories(await fetchAllStory());

    fetchStories();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  const storyOfOthers = stories.filter(
    (story) => story.userId._id !== loggedInUser._id
  );

  const showStoryModal = (userId : string) => {
    setOpenModal(true);
    setStatusId(userId);
  };

  return (
    <>
      <div className="relative max-w-3xl mx-auto">
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white border border-gray-300 rounded-full p-1 shadow-md z-10"
          aria-label="Scroll Left"
        >
          &lt;
        </button>
        <div
          ref={containerRef}
          className="my-3 px-1 flex space-x-4 items-center overscroll-auto overflow-x-auto scrollbar-hide"
        >
          <div className="relative flex-shrink-0 w-24 cursor-pointer">
            <img
              onClick={()=>{showStoryModal(loggedInUser._id)}}
              src={loggedInUser.profileimg}
              alt={loggedInUser.username}
              className="w-16 h-16 rounded-full "
            />
            <div className="absolute top-11 left-12 rounded-full cursor-pointer bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500">
              <svg
                aria-label="Plus icon"
                className="x1lliihq x1n2onr6"
                color="rgb(0, 149, 246)"
                fill="rgb(0, 149, 246)"
                height="16"
                role="img"
                viewBox="0 0 24 24"
                width="16"
              >
                <title>Add Story</title>
                <path d="M12.001.504a11.5 11.5 0 1 0 11.5 11.5 11.513 11.513 0 0 0-11.5-11.5Zm5 12.5h-4v4a1 1 0 0 1-2 0v-4h-4a1 1 0 1 1 0-2h4v-4a1 1 0 1 1 2 0v4h4a1 1 0 0 1 0 2Z"></path>
              </svg>
            </div>
            <span className="text-xs text-gray-600 mt-1 font-semibold font-roboto-condensed">
              {loggedInUser.username.length > 6
                ? loggedInUser.username.slice(0, 6) + "..."
                : loggedInUser.username}
            </span>
          </div>
          {storyOfOthers.map((story, index) => (
            <div
              key={index}
              className="flex flex-col gap-1 justify-center items-center cursor-pointer flex-shrink-0 w-24"
            >
              <img
              onClick={()=>{showStoryModal(story.userId._id)}}
                src={story.userId.profileimg}
                alt={story.userId.username}
                className={`w-16 h-16 rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 p-0.5`}
              />
              <span className="text-xs text-gray-600 mt-1 font-semibold font-roboto-condensed">
                {story.userId.username.length > 6
                  ? story.userId.username.slice(0, 6) + "..."
                  : story.userId.username}
              </span>
            </div>
          ))}
        </div>
        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white border border-gray-300 rounded-full p-1 shadow-md z-10"
          aria-label="Scroll Right"
        >
          &gt;
        </button>
      </div>
      <CarouselModal
      statusUserId = {statusId}
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
      />
    </>
  );
};

export default StoryComponent;