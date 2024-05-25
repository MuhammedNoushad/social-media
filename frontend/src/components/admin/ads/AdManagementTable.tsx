import { useState } from "react";
import Pagination from "../common/Pagination";
import useFetchAd from "../../../hooks/admin/useFetchAd";
import formatDate from "../../../utils/formatData";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";

function AdManagementTable() {
  const [currentPage, setCurrentPage] = useState(1);

  const { ads, totalPages } = useFetchAd(currentPage);

  const navigate = useNavigate();

  //   Function for handle page change
  const handlePageChange = async (pageNumber: number) => {
    // setTotalAds(pageNumber);
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container mt-10 mx-auto sm:w-2/3 px-4 sm:px-8">
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
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider font-roboto-condensed">
                  Photo
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider font-roboto-condensed">
                  Link
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider font-roboto-condensed">
                  Title
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider font-roboto-condensed">
                  Description
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider hidden md:table-cell font-roboto-condensed">
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
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 font-roboto-condensed whitespace-no-wrap">
                        {ad.adDescription}
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm hidden md:table-cell">
                      <p className="text-gray-900 font-roboto-condensed whitespace-no-wrap">
                        {formatDate(ad.createdAt || "")}
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm sm:table-cell">
                      <div className="flex gap-4">
                        <FaEdit className="text-indigo-500 cursor-pointer" />
                        <FaTrash className="text-red-500 cursor-pointer" />
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
          {ads && (
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default AdManagementTable;
