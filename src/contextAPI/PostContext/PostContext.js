import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

// create context
const PostContext = createContext();

// create provider
const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState({
    userId:
      typeof window !== "undefined" ? localStorage.getItem("userId") || "" : "",
    id: typeof window !== "undefined" ? localStorage.getItem("id") || "" : "",
    title:
      typeof window !== "undefined" ? localStorage.getItem("title") || "" : "",
  });

  // fetch posts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=10`
        );
        setPosts((oldPosts) => [...oldPosts, ...response.data]);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchData();
  }, [page]);

  const loadMorePosts = () => {
    setPage((oldPage) => oldPage + 1);
  };

  return (
    <PostContext.Provider value={{ posts, filter, setFilter, loadMorePosts }}>
      {children}
    </PostContext.Provider>
  );
};

// create custom hook for using post context
const usePostContext = () => {
  return useContext(PostContext);
};

export { PostProvider, usePostContext };
