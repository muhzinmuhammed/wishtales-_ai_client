import { useState } from 'react';
import { useGetMyPostDataQuery } from '../../features/api/postAPI/postApi';
import { useNavigate } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const Album = ({ albumId }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 8;
    const navigate = useNavigate();

    // Fetch post data using RTK Query
    const { data, isLoading, isError } = useGetMyPostDataQuery(albumId);

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
            {/* Back button */}
            <div className="flex justify-start p-4">
                <button
                    onClick={() => navigate('/')}
                    className="px-4 py-2 bg-gray-500 text-white rounded-lg"
                >
                    Back
                </button>
            </div>

            {/* Search Form */}
            <form className="flex justify-center mt-5" onSubmit={(e) => e.preventDefault()}>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search posts..."
                    className="px-4 py-2 border rounded-lg w-full max-w-md"
                />
                <button
                    type="submit"
                    className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
                >
                    Search
                </button>
            </form>

            {/* Display posts */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-5 p-4">
                {currentPosts && currentPosts.length > 0 ? (
                    currentPosts?.map((card) => (
                        <div key={card.id} className="bg-white max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg rounded-lg overflow-hidden shadow-lg">
                            <img
                                className="w-full"
                                src={card?.thumbnailUrl}
                                alt={card.title}
                            />
                            <div className="px-4 py-4">
                                {/* Flex container to align text and image horizontally */}
                                <div className="flex items-center mb-2">
                                    <span className="font-bold text-lg sm:text-xl">Photo:</span>
                                    <img src={card?.url} alt="Sample Image" className="w-10 h-10 sm:w-12 sm:h-12 ml-4 sm:ml-6 rounded-full" />
                                </div>

                                <div className="font-bold text-lg sm:text-xl mb-2">Title: {card?.title}</div>
                                <p className="text-gray-700 text-sm sm:text-base">Album ID: {card?.albumId}</p>
                            </div>
                        </div>
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

export default Album;
