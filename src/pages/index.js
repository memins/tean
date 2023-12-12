import React, { useEffect, useState, useRef, useContext } from "react";
import { usePostContext } from "../contextAPI/PostContext/PostContext";
import Skeleton from "react-loading-skeleton";
import { motion } from "framer-motion";
import DarkModeContext from "../contextAPI/darkMode/DarkModeContext";
import cs from "classnames";

const Home = () => {
  const { posts, filter, setFilter, loadMorePosts } = usePostContext();
  const { darkMode, setDarkMode } = useContext(DarkModeContext);
  const [loading, setLoading] = useState(true);
  const listRef = useRef(null);

  // get the filter from local storage
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("userId", filter?.userId || "");
      localStorage.setItem("id", filter?.id || "");
      localStorage.setItem("title", filter?.title || "");
    }

    setLoading(false);
  }, [filter]);

  console.log("darkMode", darkMode);

  // filter the posts
  const filteredData = posts.filter(
    (post) =>
      post.userId.toString().includes(filter.userId) &&
      post.id.toString().includes(filter.id) &&
      post.title.includes(filter.title)
  );

  // for list animation
  const variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  // for list animation
  const childVariants = {
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="flex flex-col items-center justify-center py-2 space-y-4">
      {loading ? (
        <>
          {posts && <Skeleton count={3} />}
          <p>loading</p>
        </>
      ) : (
        <>
          <div
            className={cs(
              !darkMode ? "" : "bg-white text-gray-900",
              "flex gap-4 mb-4 flex-col sm:flex-row w-full px-8 justify-center"
            )}
          >
            <div className="flex flex-col space-y-2">
              <label className="text-lg font-bold">Filter by user ID:</label>
              <input
                className="p-2 text-black border-2 border-gray-200 rounded-md"
                value={filter.userId}
                onChange={(e) =>
                  setFilter({ ...filter, userId: e.target.value })
                }
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label className="text-lg font-bold">Filter by ID:</label>
              <input
                className="p-2 text-black border-2 border-gray-200 rounded-md"
                value={filter.id}
                onChange={(e) => setFilter({ ...filter, id: e.target.value })}
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label className="text-lg font-bold">Filter by title:</label>
              <input
                className="p-2 text-black border-2 border-gray-200 rounded-md"
                value={filter.title}
                onChange={(e) =>
                  setFilter({ ...filter, title: e.target.value })
                }
              />
            </div>
          </div>
          <motion.ul
            className="mx-8 space-y-4"
            ref={listRef}
            variants={variants}
            initial="hidden"
            animate="show"
          >
            <p className="text-gray-600">{filteredData.length} posts</p>
            {filteredData.map((post, index) => (
              <motion.li
                key={index}
                className={cs(
                  !darkMode ? "" : "bg-white text-gray-900",
                  "p-4 border-2 border-gray-200 rounded-md"
                )}
                variants={childVariants}
              >
                <div className="flex items-baseline gap-3">
                  <h2 className="text-xl font-bold">{post.title}</h2>
                  <p className="text-gray-600">User ID: {post.userId}</p>
                  <p className="text-gray-600">ID: {post.id}</p>
                </div>
                <p className="text-gray-600">{post.body}</p>
              </motion.li>
            ))}
          </motion.ul>
          <button
            className="p-3 text-black bg-white rounded-md cursor-pointer"
            onClick={loadMorePosts}
          >
            Load more posts
          </button>
        </>
      )}
    </div>
  );
};

export default Home;
