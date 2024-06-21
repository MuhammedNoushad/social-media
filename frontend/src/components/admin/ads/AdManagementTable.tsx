import { useState } from "react";
import Pagination from "../common/Pagination";
import useFetchAd from "../../../hooks/admin/useFetchAd";
import formatDate from "../../../utils/formatData";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import Dialog from "../../common/Dialog";

function AdManagementTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [confirmationModal, setConfirmationModal] = useState(false);
  const [adId, setAdId] = useState<string | undefined>("");

  const { ads, totalPages, deleteAd } = useFetchAd(currentPage);

  const navigate = useNavigate();

  //   Function for handle page change
  const handlePageChange = async (pageNumber: number) => {
    // setTotalAds(pageNumber);
    setCurrentPage(pageNumber);
  };

  // Function for handle delete
  const handleConfirm = async () => {
    try {
      await deleteAd(adId);

      // Check the deleted ad is the last one in the list
      // If it the last one, go to the previous page
      if (ads.length === 1) {
        setCurrentPage(currentPage - 1 < 1 ? 1 : currentPage - 1);
      }

      setConfirmationModal(false);
    } catch (error) {
      console.error(error);
    }
  };

  // Function for handle cancel
  const handleCancel = () => {
    setConfirmationModal(false);
  };

  return (
    <>
      <div className="w-10/12 container mt-10 mx-auto sm:w-2/3 px-4 sm:px-8">
        <div className="py-8 overflow-x-auto">
          <div className="flex flex-col sm:flex-row justify-between mb-4 p-3 sm:p-0">
            <h2 className="text-sm sm:text-xl font-semibold mb-2 sm:mb-0 font-roboto-condensed">
              Ad Management
            </h2>
            <button
              onClick={() => navigate("/admin/ads/add")}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded font-roboto-condensed"
              type="button"
            >
              Add New
            </button>
          </div>
          <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
            <table className="w-full leading-normal table-auto">
              <thead>
                <tr>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider font-roboto-condensed">
                    Photo
                  </th>
                  <th className="hidden md:table-cell px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider font-roboto-condensed">
                    Link
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider font-roboto-condensed">
                    Title
                  </th>
                  <th className="hidden md:table-cell px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider font-roboto-condensed">
                    Description
                  </th>
                  <th className="hidden md:table-cell px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider font-roboto-condensed">
                    Created At
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider sm:table-cell font-roboto-condensed">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {ads && ads.length > 0 ? (
                  ads.map((ad) => (
                    <tr key={ad._id}>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 w-10 h-10">
                            <img
                              className="w-full h-full rounded-full"
                              src={ad.adImageUrl}
                              alt=""
                            />
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 font-roboto-condensed whitespace-no-wrap">
                          {ad.adLink}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 font-roboto-condensed whitespace-no-wrap">
                          {ad.adTitle}
                        </p>
                      </td>
                      <td className="hidden md:table-cell px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 font-roboto-condensed whitespace-no-wrap">
                          {ad.adDescription}
                        </p>
                      </td>
                      <td className="hidden md:table-cell px-5 py-5 border-b border-gray-200 bg-white text-sm ">
                        <p className="text-gray-900 font-roboto-condensed whitespace-no-wrap">
                          {formatDate(ad.createdAt || "")}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm sm:table-cell">
                        <div className="flex gap-4">
                          <FaEdit
                            onClick={() =>
                              navigate(`/admin/ads/edit/${ad._id}`)
                            }
                            className="text-indigo-500 cursor-pointer"
                          />
                          <FaTrash
                            onClick={() => {
                              setAdId(ad._id);
                              setConfirmationModal(true);
                            }}
                            className="text-red-500 cursor-pointer"
                          />
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center"
                    >
                      <div className="flex justify-center items-center">
                        <img
                          src="/undraw_No_data_re_kwbl.png"
                          alt="No Data"
                          className="w-48 h-48 object-contain"
                        />
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="flex justify-center mt-4">
            {ads && ads.length !== 0 && (
              <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={handlePageChange}
              />
            )}
          </div>
        </div>
      </div>
      {confirmationModal && (
        <Dialog
          onConfirm={handleConfirm}
          onCancel={handleCancel}
          isOpen={confirmationModal}
          title="Delete Ad"
          message="Are you sure you want to delete this ad?"
        />
      )}
    </>
  );
}

export default AdManagementTable;
