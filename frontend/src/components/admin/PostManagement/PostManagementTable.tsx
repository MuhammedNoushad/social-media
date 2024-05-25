import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

import useReportedPosts from "../../../hooks/admin/UseReportedPosts";
import IPosts from "../../../types/IPosts";
import formatDate from "../../../utils/formatData";
import axios from "../../../axios/axios";
import Pagination from "../common/Pagination";

function PostManagementTable() {
  const [posts, setPosts] = useState<IPosts[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);

  const { reportedPosts } = useReportedPosts();

  const fetch = async () => {
    const data = await reportedPosts(1);
    if (data) {
      const postData = data.reportedPosts;
      const totalPosts = data.totalPosts;
      setTotalPosts(totalPosts - 1);
      setPosts(postData);
    }
  };

  // Memoize the fetch function
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const memoizedFetch = useMemo(() => fetch, []);

  useEffect(() => {
    memoizedFetch();
  }, [memoizedFetch]);

  //   Function for handle block
  const handleBlock = async (postId: string) => {
    try {
      const response = await axios.put(`/api/admin/block-post/${postId}`);
      const data = response.data;

      if (data.success) {
        toast.success(data.message);
      }
    } catch (error) {
      console.log("Error blocking post:", error);
    }
  };

  //   Function for handle page change
  const handlePageChange = async (pageNumber: number) => {
    setCurrentPage(pageNumber);
    const data = await reportedPosts(pageNumber);
    const postData = data.reportedPosts;
    setPosts(postData);
  };

  return (
    <div className="container mt-10 mx-auto sm:w-2/3 px-4 sm:px-8">
      <div className="py-8 overflow-x-auto">
        <div className="flex flex-col sm:flex-row justify-between mb-4 p-3 sm:p-0">
          <h2 className="text-sm sm:text-xl font-semibold mb-2 sm:mb-0 font-roboto-condensed">
            Post Management
          </h2>
        </div>
        <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
          <table className="min-w-full leading-normal ">
            <thead>
              <tr>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider font-roboto-condensed">
                  Post
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider font-roboto-condensed">
                  Report Type
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider hidden md:table-cell font-roboto-condensed">
                  Posted At
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider sm:table-cell font-roboto-condensed">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post._id}>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 w-10 h-10">
                        <img
                          className="w-full h-full rounded-full"
                          src={post.imageUrl || "/public/avathar.jpeg"}
                          alt="reported post"
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap font-roboto-condensed">
                      <span className="font-semibold">
                        {post.reports &&
                          post.reports.length > 0 &&
                          post.reports[0].content}
                      </span>
                      <br />
                      {post.reports?.length} reports
                    </p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm hidden md:table-cell">
                    <p className="text-gray-900 whitespace-no-wrap font-roboto-condensed">
                      {formatDate(post.createdAt || "")}
                    </p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm sm:table-cell">
                    <button
                      className={`px-3 py-1 rounded-md text-white ${
                        post.isBlocked === true
                          ? "bg-green-500 hover:bg-green-600"
                          : "bg-red-500 hover:bg-red-600"
                      }`}
                      onClick={() => handleBlock(post._id)}
                    >
                      {post.isBlocked === true ? "Unblock" : "Block"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-center mt-6">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPosts}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
}

export default PostManagementTable;
