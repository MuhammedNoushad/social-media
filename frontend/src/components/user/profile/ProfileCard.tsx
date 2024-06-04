import React, { useEffect, useState } from "react";
import {
  BiMailSend,
  BiUser,
  BiMessageSquareAdd,
  BiUserPlus,
  BiCheck,
} from "react-icons/bi";
import { useNavigate } from "react-router-dom";

import IUserState from "../../../types/IUserState";
import axios from "../../../axios/axios";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import useFollow from "../../../hooks/user/useFollow";
import ConnectionModal from "./ConnectionModal";
import RenderRazorpay from "../razorPay/RenderRazorPay";

const ProfileCard: React.FC<{ userDetails: IUserState; profile: string }> = ({
  userDetails,
  profile,
}) => {
  const navigate = useNavigate();

  const [displayRazorpay, setDisplayRazorpay] = useState(false);
  const [orderDetails, setOrderDetails] = useState({
    orderId: "",
    currency: "",
    amount: 0,
  });
  const [purchaseLoading, setPurchaseLoading] = useState(false);
  const [following, setFollowing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [followedByUser, setFollowedByUser] = useState(false);
  const [modalType, setModalType] = useState<"followers" | "following" | "">(
    ""
  );

  const user = useSelector((state: RootState) => state.user);
  console.log(user, "user");
  const post = useSelector((state: RootState) => state.posts.posts);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const connections: any = useSelector(
    (state: RootState) => state.connection.connection
  );

  const { follow, unfollow } = useFollow();

  const ownPosts = post.filter((post) => {
    return post.userId?._id === userDetails._id;
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const numberOfFollowers = connections?.followers?.length || 0;
  const numberOfFollowing = connections?.following?.length || 0;

  // Function for fetch Connection
  const fetchConnection = async () => {
    try {
      const response = await axios.get(`/api/connection/${user._id}`);
      const data = response.data;
      if (data.success) {
        const isFollowing = data.connections.following.some(
          (followingUser: { _id: string }) =>
            followingUser._id === userDetails._id
        );
        setFollowing(isFollowing);
        const isFollowedByUser = data.connections.followers.some(
          (follower: { _id: string }) => follower._id === userDetails._id
        );
        setFollowedByUser(isFollowedByUser);
      }
    } catch (error) {
      console.log(error, "error from fetchConnection");
    }
  };

  useEffect(() => {
    fetchConnection();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user._id, userDetails._id]);

  // Function for handle follow User
  const handleFollow = async () => {
    try {
      const response = await follow(user._id, userDetails._id);
      if (response) {
        setFollowing(true);
      }
    } catch (error) {
      console.log(error, "error from handleFollow");
    }
  };

  // Function for handle unfollow User
  const handleUnfollow = async () => {
    try {
      const response = await unfollow(user._id, userDetails._id);
      if (response) {
        setFollowing(false);
      }
    } catch (error) {
      console.log(error, "error from handleUnfollow");
    }
  };

  // Function for handleFollowingModal
  const handleFollowingModal = () => {
    setShowModal(true);
    setModalType("following");
    console.log("handleFollowingModal");
  };

  // Function for handleFollowersModal
  const handleFollowersModal = () => {
    setShowModal(true);
    setModalType("followers");
    console.log("handleFollowersModal");
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Function for redirect to message of user
  const handleProfileMessage = (userId: string) => {
    navigate("/message", { state: { userId } });
  };

  // Function for handle verification purchase
  const handlePurchase = async () => {
    try {
      setPurchaseLoading(true);
      const response = await axios.post(`/api/payment/`);
      const data = response.data;

      if (data.success) {
        const { orderId, currency, amount } = data.responseData;
        setOrderDetails({
          orderId,
          currency,
          amount,
        });
        setDisplayRazorpay(true);
      }
    } catch (error) {
      console.log(error, "error from handlePurchase");
    } finally {
      setPurchaseLoading(false);
    }
  };

  return (
    <>
      <div className="relative w-auto min-w-0 break-words bg-light/30 draggable max-h-max font-roboto-condensed">
        {/* card body */}
        <div className=" py-9 lg:mr-40 flex flex-col items-center justify-center h-full">
          <div className="flex flex-wrap mb-6 xl:flex-nowrap gap-12">
            <div className="mb-5 mr-5">
              <div className="relative inline-block shrink-0 rounded-2xl">
                <img
                  className="object-cover inline-block shrink-0 rounded-full w-[50px] h-[50px] sm:w-[80px] sm:h-[80px] lg:w-[120px] lg:h-[120px]"
                  src={userDetails.profileimg || "/public/avathar.png"}
                  alt="image"
                />
              </div>
            </div>
            <div className="grow gap-y-5">
              <div className="flex flex-wrap items-center justify-between mb-2">
                <div className="flex flex-col items-center">
                  <div className="flex items-center mb-2">
                    <p className="inline-flex items-center text-secondary-inverse font-bold hover:text-red-600 transition-colors duration-200 ease-in-out text-[1.2rem] mr-1 font-roboto-condensed">
                      {userDetails.username}
                      {userDetails.isVerified && (
                        <span className="ml-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-4 h-4"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill="#052ae6"
                              fillRule="evenodd"
                              d="M4.252 14H4a2 2 0 1 1 0-4h.252c.189-.734.48-1.427.856-2.064l-.18-.179a2 2 0 1 1 2.83-2.828l.178.179A7.952 7.952 0 0 1 10 4.252V4a2 2 0 1 1 4 0v.252c.734.189 1.427.48 2.064.856l.179-.18a2 2 0 1 1 2.828 2.83l-.179.178c.377.637.667 1.33.856 2.064H20a2 2 0 1 1 0 4h-.252a7.952 7.952 0 0 1-.856 2.064l.18.179a2 2 0 1 1-2.83 2.828l-.178-.179a7.952 7.952 0 0 1-2.064.856V20a2 2 0 1 1-4 0v-.252a7.952 7.952 0 0 1-2.064-.856l-.179.18a2 2 0 1 1-2.828-2.83l.179-.178A7.952 7.952 0 0 1 4.252 14M9 10l-2 2l4 4l6-6l-2-2l-4 4z"
                            />
                          </svg>
                        </span>
                      )}
                    </p>
                    {profile === "own" && (
                      <a
                        onClick={() => {
                          navigate("/edit-profile");
                        }}
                        className="inline-block ml-2 px-2 py-1 text-xs sm:text-sm sm:ml-4 sm:px-3 sm:py-1 font-roboto-condensed font-medium leading-normal text-center text-secondary-inverse rounded-full bg-neutral-100 hover:bg-neutral-200 transition-all duration-200 ease-in-out border-0 shadow-none cursor-pointer"
                      >
                        Edit Profile
                      </a>
                    )}
                  </div>
                  <div className="flex flex-wrap justify-center pr-0 sm:pr-2 mb-2 font-roboto-condensed font-medium text-xs sm:text-sm">
                    <a className="flex items-center mr-5 text-secondary-dark hover:text-red-600">
                      <span className="mr-1">
                        <BiUser />
                      </span>{" "}
                      {userDetails.firstName} {userDetails.lastName}
                    </a>
                    <a
                      href={`mailto:${userDetails.email}`}
                      className="flex items-center mr-5 text-secondary-dark hover:text-red-600"
                    >
                      <span className="mr-1">
                        <BiMailSend />
                      </span>{" "}
                      {userDetails.email}{" "}
                    </a>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap justify-center">
                <div className="flex flex-wrap items-center">
                  <p className="text-base sm:text-lg text-gray-700 from-neutral-600 mb-2 sm:mb-4 text-center max-w-md font-roboto-condensed">
                    {userDetails.bio}
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap justify-center">
                <div className="flex flex-wrap items-center">
                  <p className="cursor-pointer mr-3 mb-2 inline-flex items-center justify-center text-secondary-inverse rounded-full bg-neutral-100 hover:bg-neutral-200 transition-all duration-200 ease-in-out px-2 py-1 text-xs font-roboto-condensed font-medium leading-normal">
                    {ownPosts.length} posts
                  </p>
                  <p
                    onClick={handleFollowingModal}
                    className="cursor-pointer mr-3 mb-2 inline-flex items-center justify-center text-secondary-inverse rounded-full bg-neutral-100 hover:bg-neutral-200 transition-all duration-200 ease-in-out px-2 py-1 text-xs font-roboto-condensed font-medium leading-normal"
                  >
                    {numberOfFollowing} Following
                  </p>
                  <p
                    onClick={handleFollowersModal}
                    className="cursor-pointer mr-3 mb-2 inline-flex items-center justify-center text-secondary-inverse rounded-full bg-neutral-100 hover:bg-neutral-200 transition-all duration-200 ease-in-out px-2 py-1 text-xs font-roboto-condensed font-medium leading-normal"
                  >
                    {numberOfFollowers} Followers
                  </p>
                </div>
              </div>
              {profile === "own" && user.isVerified === false && (
                <div className="flex justify-center my-4">
                  <div className="flex items-center bg-gray-100 rounded-lg p-2">
                    <div className="flex items-center mr-4">
                      <span className="text-green-500 text-xl mr-2">
                        <BiCheck />
                      </span>
                      <div>
                        <h3 className="text-sm font-semibold">Get Verified</h3>
                        <p className="text-xs text-gray-500">
                          Boost credibility
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={handlePurchase}
                      className="bg-green-500 text-white py-1 px-3 rounded-md text-sm transition duration-200 hover:bg-green-600"
                    >
                      {purchaseLoading ? (
                        <span className="loading loading-spinner"></span>
                      ) : (
                        <span>Purchase</span>
                      )}
                    </button>
                  </div>
                </div>
              )}
              {/* follow and message button here */}
              {profile === "others" && (
                <div className="flex justify-center my-4">
                  {following ? (
                    <button
                      onClick={handleUnfollow}
                      className="flex items-center justify-center  bg-neutral-100 hover:bg-neutral-200 text-black font-roboto-condensed font-medium px-4 py-2 rounded-lg mr-2"
                    >
                      <BiUserPlus className="mr-2" /> Unfollow
                    </button>
                  ) : followedByUser ? (
                    <button
                      onClick={handleFollow}
                      className="flex items-center justify-center  bg-blue-500 hover:bg-blue-600 text-white font-roboto-condensed font-medium px-4 py-2 rounded-lg mr-2"
                    >
                      <BiUserPlus className="mr-2" /> Follow Back
                    </button>
                  ) : (
                    <button
                      onClick={handleFollow}
                      className="flex items-center justify-center  bg-blue-500 hover:bg-blue-600 text-white font-roboto-condensed font-medium px-4 py-2 rounded-lg mr-2"
                    >
                      <BiUserPlus className="mr-2" /> Follow
                    </button>
                  )}

                  <button
                    onClick={() => {
                      handleProfileMessage(userDetails._id);
                    }}
                    className="flex items-center justify-center  bg-neutral-100 hover:bg-neutral-200 text-black font-roboto-condensed font-medium px-4 py-2 rounded-lg"
                  >
                    <BiMessageSquareAdd className="mr-2" /> Message
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {showModal && (
        <ConnectionModal
          type={modalType}
          followers={connections.followers}
          following={connections.following}
          onClose={handleCloseModal}
        />
      )}
      {displayRazorpay && (
        <RenderRazorpay
          setDisplayRazorpay={setDisplayRazorpay}
          amount={orderDetails.amount}
          currency={orderDetails.currency}
          orderId={orderDetails.orderId}
          keyId="rzp_test_3CEVpy1JezNykg"
          keySecret="ZYKVp92VufAjeFaMHJloI15f"
        />
      )}
    </>
  );
};

export default ProfileCard;
