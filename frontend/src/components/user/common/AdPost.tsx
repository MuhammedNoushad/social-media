import { useEffect, useState } from "react";
import useFetchAd from "../../../hooks/admin/useFetchAd";

function AdPost() {
  const { ads } = useFetchAd(1);
  const [randomAd, setRandomAd] = useState(ads[0]);

  useEffect(() => {
    pickRandomAd();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ads]);

  const pickRandomAd = () => {
    if (ads.length > 0) {
      const randomIndex = Math.floor(Math.random() * ads.length);
      setRandomAd(ads[randomIndex]);
    }
  };

  const handleAdClick = () => {
    window.open(randomAd.adLink, "_blank");
  };

  return (
    <div className="mb-6 ">
      <section className="my-3 px-3 text-black">
        <div className="flex items-center justify-between space-x-4">
          <div className="flex items-center space-x-2">
            <img
              src={randomAd?.adImageUrl}
              alt="millionaires-formula"
              className="w-10 h-10 rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 p-0.5 hover:cursor-pointer"
            />
            <h6
              onClick={handleAdClick}
              className="font-medium text-sm cursor-pointer font-roboto-condensed"
            >
              {randomAd?.adTitle}
            </h6>
            <span className="text-gray-500 text-2xl">&middot;</span>
            <span className="text-gray-500 text-xs font-roboto-condensed">Sponsered post</span>
          </div>
        </div>
        <div className="py-3 h-96">
          <img
            onClick={handleAdClick}
            src={randomAd?.adImageUrl}
            alt="meme-1"
            className="rounded-lg w-full h-full object-cover hover:cursor-pointer"
          />
        </div>

        <div className="flex space-x-2 text-sm font-roboto-condensed">
          <p>{randomAd?.adDescription}</p>
        </div>
      </section>
      <hr className="border-gray-700" />
    </div>
  );
}

export default AdPost;
