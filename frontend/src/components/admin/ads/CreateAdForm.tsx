import { UploadButton } from "@bytescale/upload-widget-react";
import axios from "axios";
import React, { useState, ChangeEvent, FormEvent } from "react";
import usePostAds from "../../../hooks/admin/usePostAds";
import IAds from "../../../types/IAds";
import { useNavigate } from "react-router-dom";
import { APP_CLOUDNAME, APP_PRESET_KEY } from "../../../config/config";

interface Errors {
  [key: string]: string;
}

const presetKey: string = APP_PRESET_KEY;
const cloudname: string = APP_CLOUDNAME;

const CreateAdForm: React.FC = () => {
  const [picLoading, setPicLoading] = useState(false);
  const [formData, setFormData] = useState<IAds>({
    adImageUrl: "",
    adLink: "",
    adTitle: "",
    adDescription: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const { postAds, loading } = usePostAds();

  const navigate = useNavigate();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length === 0) {
      // Handle form submission logic here
      formData.adImageUrl = uploadedImage || "";

      const response = await postAds(formData);
      if (response) {
        navigate("/admin/ads");
      }
      console.log(formData);
    } else {
      setErrors(errors);
    }
  };

  const validate = (): Errors => {
    const errors: Errors = {};
    if (!formData.adLink || formData.adLink.trim() === "") {
      errors.adLink = "Ad Link is required";
    }
    if (!formData.adTitle || formData.adTitle.trim() === "") {
      errors.adTitle = "Ad Title is required";
    }
    if (!formData.adDescription || formData.adDescription.trim() == "") {
      errors.adDescription = "Ad Description is required";
    }
    if (!uploadedImage) {
      errors.adImage = "Ad Image is required";
    }
    return errors;
  };

  const options = {
    apiKey: "free",
    maxFileCount: 1,
  };

  // Function for handling picture upload
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handlePictureUpload = (files: any[]) => {
    setPicLoading(true);

    if (files.length === 0) {
      setPicLoading(false);
      return;
    }

    const file = files[0]?.originalFile.file;

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
        setUploadedImage(res.data.secure_url);
        setErrors({ ...errors, adImage: "" });
      })
      .catch((err) => console.error(err))
      .finally(() => {
        setPicLoading(false);
      });
  };

  const removeUploadedImage = () => {
    setUploadedImage(null);
  };
  return (
    <div className="flex justify-center w-full items-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="max-w-md w-full bg-base-200 p-8 rounded-lg shadow-lg "
      >
        <h2 className="text-2xl font-bold mb-6 font-roboto-condensed">
          Create Ad
        </h2>
        <div className="form-control w-full mb-4">
          <label htmlFor="adLink" className="label">
            <span className="label-text font-roboto-condensed">Ad Link</span>
          </label>
          <input
            type="text"
            id="adLink"
            name="adLink"
            value={formData.adLink}
            onChange={handleChange}
            className={`input input-bordered w-full ${
              errors.adLink ? "input-error" : ""
            }`}
          />
          {errors.adLink && (
            <p className="text-error mt-2 font-roboto-condensed">
              {errors.adLink}
            </p>
          )}
        </div>
        <div className="form-control w-full mb-4">
          <label htmlFor="adTitle" className="label">
            <span className="label-text font-roboto-condensed">Ad Title</span>
          </label>
          <input
            type="text"
            id="adTitle"
            name="adTitle"
            value={formData.adTitle}
            onChange={handleChange}
            className={`input input-bordered w-full ${
              errors.adTitle ? "input-error" : ""
            }`}
          />
          {errors.adTitle && (
            <p className="text-error mt-2 font-roboto-condensed">
              {errors.adTitle}
            </p>
          )}
        </div>
        <div className="form-control w-full mb-4">
          <label htmlFor="adDescription" className="label">
            <span className="label-text font-roboto-condensed">
              Ad Description
            </span>
          </label>
          <textarea
            id="adDescription"
            name="adDescription"
            value={formData.adDescription}
            onChange={handleChange}
            className={`textarea textarea-bordered h-24 ${
              errors.adDescription ? "input-error" : ""
            }`}
          />
          {errors.adDescription && (
            <p className="text-error mt-2 font-roboto-condensed">
              {errors.adDescription}
            </p>
          )}
        </div>
        <div className="form-control w-full mb-4">
          <label
            className="label-text font-roboto-condensed"
            htmlFor="multiple_files"
          >
            Upload Ad Image
          </label>
          <UploadButton options={options} onComplete={handlePictureUpload}>
            {({ onClick }) => (
              <button
                onClick={onClick}
                className="btn btn-sm border-cyan-500 hover:text-white hover:bg-cyan-500 bg-white text-cyan-500 font-roboto-condensed"
              >
                {picLoading ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  <span>Upload Image</span>
                )}
              </button>
            )}
          </UploadButton>
          {errors.adImage && (
            <p className="text-error mt-2 font-roboto-condensed">
              {errors.adImage}
            </p>
          )}
          {uploadedImage && (
            <div className="mt-4 relative">
              <img
                src={uploadedImage}
                alt="Uploaded File"
                className="max-w-xs h-auto"
              />
              <button
                onClick={removeUploadedImage}
                className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 m-1"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>
        <button
          type="submit"
          className="mt-8 btn btn-success text-white font-roboto-condensed w-full"
        >
          {loading ? (
            <span className="loading loading-spinner"></span>
          ) : (
            "Create"
          )}
        </button>
      </form>
    </div>
  );
};

export default CreateAdForm;
