import React, { useEffect, useState } from "react";
import useFetchStoryOfSingleUser from "../../../hooks/user/useFetchStoryOfSingleUser";

interface CarouselModalProps {
  statusUserId: string;
  isOpen: boolean;
  onClose: () => void;
}

interface Story {
  story: {
    storyImg: string;
  }[];
}

const CarouselModal: React.FC<CarouselModalProps> = ({
  isOpen,
  onClose,
  statusUserId,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [stories, setStories] = useState<Story>({ story: [] });

  const { fetchStoryOfSingleUser } = useFetchStoryOfSingleUser();

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

  const showNextAndPrevButtons = stories.story && stories.story.length > 1;
  const showNextButton =
    showNextAndPrevButtons && currentSlide < stories.story.length - 1;
  const showPrevButton = showNextAndPrevButtons && currentSlide > 0;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black opacity-70"
        onClick={() => {
          onClose();
          setCurrentSlide(0);
        }}
      />
      <div className="relative z-10 w-full max-w-4xl p-6 bg-white rounded-lg shadow-lg">
        <div className="relative">
          <div className="overflow-hidden w-full min-h-[24rem] bg-gray-100 rounded-lg">
            <div
              className="flex transition-transform duration-700"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {stories.story &&
                stories.story.map((slide, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 w-full flex justify-center items-center p-4"
                  >
                    <img
                      src={slide.storyImg}
                      alt={`Story ${index + 1}`}
                      className="w-full h-full object-cover rounded-lg shadow-md"
                      style={{ width: "500px", height: "500px" }}
                    />
                  </div>
                ))}
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
  );
};

export default CarouselModal;
