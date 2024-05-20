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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black opacity-50" onClick={onClose} />
      <div className="relative z-10 w-full max-w-4xl">
        <div data-hs-carousel='{"isAutoPlay": true}' className="relative">
          <div className="hs-carousel relative overflow-hidden w-full min-h-96 bg-gray-200 rounded-lg">
            <div className="hs-carousel-body flex flex-nowrap transition-transform duration-700" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
              {stories.story && stories.story.length > 0 && stories.story.map((slide, index) => (
                <div key={index} className="hs-carousel-slide flex-shrink-0 w-full">
                  <div className="flex justify-center h-full p-6">
                    <img
                      src={slide.storyImg}
                      alt="story"
                      className="max-w-5xl object-cover rounded-lg"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button
            type="button"
            className="hs-carousel-prev absolute inset-y-0 start-0 inline-flex justify-center items-center w-[46px] h-full text-gray-800 hover:bg-gray-800/10 rounded-s-lg dark:text-white dark:hover:bg-white/10"
            onClick={handlePrevSlide}
          >
            <span className="text-2xl" aria-hidden="true">
              <svg
                className="flex-shrink-0 size-5"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m15 18-6-6 6-6"></path>
              </svg>
            </span>
            <span className="sr-only">Previous</span>
          </button>
          <button
            type="button"
            className="hs-carousel-next absolute inset-y-0 end-0 inline-flex justify-center items-center w-[46px] h-full text-gray-800 hover:bg-gray-800/10 rounded-e-lg dark:text-white dark:hover:bg-white/10"
            onClick={handleNextSlide}
          >
            <span className="text-2xl" aria-hidden="true">
              <svg
                className="flex-shrink-0 size-5"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m9 18 6-6-6-6"></path>
              </svg>
            </span>
            <span className="sr-only">Next</span>
          </button>
          <div className="hs-carousel-pagination flex justify-center absolute bottom-3 start-0 end-0 space-x-2">
            {stories.story && stories.story.length > 0 && stories.story.map((_, index) => (
              <span
                key={index}
                className={`hs-carousel-active:bg-blue-700 hs-carousel-active:border-blue-700 size-3 border border-gray-400 rounded-full cursor-pointer dark:border-neutral-600 dark:hs-carousel-active:bg-blue-500 dark:hs-carousel-active:border-blue-500 ${currentSlide === index ? "bg-blue-700 border-blue-700 dark:bg-blue-500 dark:border-blue-500" : ""}`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarouselModal;
