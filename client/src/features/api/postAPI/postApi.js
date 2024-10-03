import { api } from "../api";

export const postApi = api.injectEndpoints({
  endpoints: (builder) => ({
    

    getPostData: builder.query({
      query: () => ({
        url: `https://jsonplaceholder.typicode.com/albums`,
        method: "GET",
      }),
      providesTags: ["postTag"],
    }),
    getMyPostData: builder.query({
      query: (id) => ({
        url: `https://jsonplaceholder.typicode.com/albums/${id}/photos`,
        method: "GET",
      }),
      providesTags: ["postTag"],
    }),

  }) 
   
  
});

// Export hooks for usage in functional components
export const {
  
  useGetPostDataQuery,
  useGetMyPostDataQuery,
 
} = postApi;