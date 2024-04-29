import { useState } from "react";
import { useSelector } from "react-redux";
import { UploadButton } from "@bytescale/upload-widget-react";

import { RootState } from "../../../store/store";
import IUserDetails from "../../../types/IUserDetails";
import useEditProfile from "../../../hooks/user/useEditProfile";
import axios from "../../../axios/axios";
import useDeleteProfilePic from "../../../hooks/user/useDeleteProfilePic";

function EditProfileCard() {
  const presetKey: string = import.meta.env.VITE_REACT_APP_PRESET_KEY;
  const cloudname: string = import.meta.env.VITE_REACT_APP_CLOUDNAME;

  const userDetails = useSelector((state: RootState) => state.user);
  const editProfile = useEditProfile();
  const { deleteProfilePic, loading } = useDeleteProfilePic();

  const [changePicLoading, setchangePicLoading] = useState<boolean>(false);
  const [profilePic, setProfilePic] = useState(userDetails.profileimg);
  const [formData, setFormData] = useState<Omit<IUserDetails, "password">>({
    username: userDetails.username,
    firstName: userDetails.firstName,
    lastName: userDetails.lastName,
    profileimg: userDetails.profileimg || "",
    bio: userDetails.bio || "",
    dob: userDetails.dob
      ? new Date(userDetails.dob).toISOString().split("T")[0]
      : "",
    phone: userDetails.phone || undefined,
    email: userDetails.email || "",
    _id: userDetails._id,
    isAdmin: userDetails.isAdmin,
    isBlock: userDetails.isBlock,
  });

  // Function to handle the inputs in the form
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Function to handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission here
    editProfile(formData, userDetails._id);
  };

  // Function to handle profile pic upload
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handlePictureUpload = (files: any[]) => {
    setchangePicLoading(true);

    const file = files[0].originalFile.file;

    const profileForm = new FormData();
    profileForm.append("file", file);
    profileForm.append("upload_preset", presetKey || "");

    axios({
      method: "post",
      url: `https://api.cloudinary.com/v1_1/${cloudname}/image/upload`,
      data: profileForm,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((res) => {
        const updatedFormData: Omit<IUserDetails, "password"> = {
          ...formData,
          profileimg: res.data.secure_url,
        };
        setProfilePic(res.data.secure_url);
        setFormData(updatedFormData);
      })
      .catch((err) => console.error(err))
      .finally(() => {
        setchangePicLoading(false);
      });
  };

  const handleDeleteProfilePic = async () => {
    try {
      await deleteProfilePic(userDetails._id);
      setProfilePic("");
    } catch (error) {
      console.log("error from handleDeleteProfilePic EditProfileCard", error);
    }
  };

  return (
    <div className="bg-white w-3/4 max-w-screen-xl mx-auto flex flex-col gap-5 px-3 md:px-16 lg:px-28 md:flex-row text-[#161931] sm:h-auto md:h-auto">
      <main className="w-full min-h-screen py-1 md:w-2/3 lg:w-3/4">
        <div className="p-2 md:p-4">
          <div className="w-full px-6 pb-8 mt-8 sm:max-w-xl sm:rounded-lg">
            <h2 className="pl-6 text-2xl font-bold sm:text-xl">
              Public Profile
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="grid max-w-2xl mx-auto mt-8">
                <div className="flex flex-col items-center space-y-5 sm:flex-row sm:space-y-0">
                  <img
                    className="object-cover w-40 h-40 p-1 rounded-full ring-2 ring-indigo-300 dark:ring-indigo-500"
                    src={profilePic || "avathar.jpeg"}
                    alt="Bordered avatar"
                  />

                  <div className="flex flex-col space-y-5 sm:ml-8">
                    <UploadButton
                      options={{ apiKey: "free", maxFileCount: 1 }}
                      onComplete={handlePictureUpload}
                    >
                      {({ onClick }) => (
                        <button
                          onClick={onClick}
                          type="button" // Ensure it doesn't submit the form
                          className="py-3.5 px-7 text-base font-medium text-indigo-100 focus:outline-none bg-[#202142] rounded-lg border border-indigo-200 hover:bg-indigo-900 focus:z-10 focus:ring-4 focus:ring-indigo-200"
                        >
                          {changePicLoading ? (
                            <span className="loading loading-spinner"></span>
                          ) : (
                            "Change Picture"
                          )}
                        </button>
                      )}
                    </UploadButton>
                    <button
                      type="button"
                      onClick={handleDeleteProfilePic}
                      className="py-3.5 px-7 text-base font-medium text-indigo-900 focus:outline-none bg-white rounded-lg border border-indigo-200 hover:bg-indigo-100 hover:text-[#202142] focus:z-10 focus:ring-4 focus:ring-indigo-200 "
                    >
                      {loading ? (
                        <span className="loading loading-spinner"></span>
                      ) : (
                        "Delete Picture"
                      )}
                    </button>
                  </div>
                </div>

                <div className="items-center mt-8 sm:mt-14 text-[#202142]">
                  <div className="mb-2 sm:mb-6">
                    <label
                      htmlFor="username"
                      className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
                    >
                      Username
                    </label>
                    <input
                      type="text"
                      id="username"
                      name="username"
                      className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                      placeholder="username"
                      value={formData.username}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="flex flex-col items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
                    <div className="w-full">
                      <label
                        htmlFor="first_name"
                        className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
                      >
                        Your first name
                      </label>
                      <input
                        type="text"
                        id="first_name"
                        name="firstName"
                        className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                        placeholder="Your first name"
                        value={formData.firstName}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="w-full">
                      <label
                        htmlFor="last_name"
                        className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
                      >
                        Your last name
                      </label>
                      <input
                        type="text"
                        id="last_name"
                        name="lastName"
                        className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                        placeholder="Your last name"
                        value={formData.lastName}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="mb-2 sm:mb-6">
                    <label
                      htmlFor="dob"
                      className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
                    >
                      Birthday
                    </label>
                    <input
                      type="date"
                      id="dob"
                      name="dob"
                      className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                      placeholder="birthday"
                      value={formData.dob}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="mb-2 sm:mb-6">
                    <label
                      htmlFor="phone"
                      className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
                    >
                      Mobile
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                      placeholder="mobile"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="mb-6">
                    <label
                      htmlFor="message"
                      className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
                    >
                      Bio
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      name="bio"
                      className="block p-2.5 w-full text-sm text-indigo-900 bg-indigo-50 rounded-lg border border-indigo-300 focus:ring-indigo-500 focus:border-indigo-500 "
                      placeholder="Write your bio here..."
                      value={formData.bio}
                      onChange={handleInputChange}
                    ></textarea>
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="text-white bg-indigo-700  hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}

export default EditProfileCard;
