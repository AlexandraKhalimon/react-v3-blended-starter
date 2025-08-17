import axios from "axios";
import { Post, NewPost } from "../types/post";

axios.defaults.baseURL = "https://jsonplaceholder.typicode.com";

interface FetchPostsResponse {
  posts: Post[];
  totalPages: number;
}

const LIMIT = 8;

export const fetchPosts = async (searchText: string, page: number): Promise<FetchPostsResponse> => {
  const response = await axios.get<Post[]>("/posts", {
    params: {
      ...(searchText !== "" && { q: searchText }),
      _page: page,
      _limit: LIMIT,
    },
  });
  return {
    posts: response.data,
    totalPages: Math.ceil(Number(response.headers["x-total-count"]) / LIMIT),
  };
};

export const createPost = async (newPost: NewPost): Promise<Post> => {
  console.log(newPost);
  
  const response = await axios.post<Post>("/posts", newPost);
  return response.data;
};

// export const editPost = async (newDataPost) => {};

export const deletePost = async (postId: number): Promise<Post> => {
  const { data } = await axios.get<Post>(`/posts/${postId}`);
  return data;
};