import { useState } from 'react';
import { useGetPostDataQuery } from '../../features/api/postAPI/postApi';
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 8;
  const navigate = useNavigate();

  // Fetch post data using RTK Query
  const { data, isLoading, isError } = useGetPostDataQuery();
  console.log(data, "dataa");

  // Filter posts based on the search term
  const filteredPosts = data?.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts?.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil((filteredPosts?.length || 0) / postsPerPage);

  // Handle "Next" and "Previous" page change
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  // Show spinner while loading
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader ease-linear rounded-full border-4 border-t-4 border-black h-12 w-12 mb-4"></div>
      </div>
    );
  }

  if (isError) return <p>Error loading posts.</p>;

  return (
    <>
      {/* Search Form */}
      <form className="flex justify-center mt-5" onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search posts..."
          className="px-4 py-2 border rounded-lg"
        />
        <button
          type="submit"
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          Search
        </button>
      </form>

      {/* Display posts */}
      <div className="flex flex-wrap justify-center gap-4 mt-5 p-4">
        {currentPosts && currentPosts.length > 0 ? (
          currentPosts?.map((card) => (
            <>
              <Link to={`/album/${card?.id}`} className='cursor-pointer'>

                <div key={card?.id} className="max-w-xs rounded overflow-hidden shadow-lg">

                  <a onClick={() => navigate(`/album/${card.id}`)}> <img
                    className="w-full "
                    src="https://static.wixstatic.com/media/977b8e_6869db9ac03a488a8615a7dbd1445c8e~mv2.png/v1/fill/w_64,h_64,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/Transparent-Logo.png"
                    alt={card.title}
                  />
                  </a>


                  <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">Title: {card?.title}</div>
                    <p className="text-gray-700 text-base">Author: {card?.userId}</p>
                  </div>

                </div>
              </Link>
            </>

          ))
        ) : (
          <p className="text-center text-gray-500">No posts found matching your search.</p>
        )}
      </div>

      {/* Pagination: Previous and Next buttons */}
      {filteredPosts && filteredPosts.length > postsPerPage && (
        <div className="flex justify-center mt-5">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className={`px-4 py-2 mx-1 border rounded-lg ${currentPage === 1 ? "bg-gray-300 text-gray-700 cursor-not-allowed" : "bg-blue-500 text-white"
              }`}
          >
            Previous
          </button>

          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 mx-1 border rounded-lg ${currentPage === totalPages ? "bg-gray-300 text-gray-700 cursor-not-allowed" : "bg-blue-500 text-white"
              }`}
          >
            Next
          </button>
        </div>
      )}
    </>
  );
};

export default Home;
