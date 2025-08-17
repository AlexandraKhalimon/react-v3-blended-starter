import Modal from "../Modal/Modal";
import CreatePostForm from "../CreatePostForm/CreatePostForm";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import PostList from "../PostList/PostList";
import SearchBox from "../SearchBox/SearchBox";
import Pagination from "../Pagination/Pagination";

import { fetchPosts } from "../../services/postService";
import css from "./App.module.css";

export default function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [debousedSerchQuery] = useDebounce(searchQuery, 1000);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const { data } = useQuery({
    queryKey: ["posts", debousedSerchQuery, currentPage],
    queryFn: () => fetchPosts(debousedSerchQuery, currentPage),
    placeholderData: keepPreviousData,
  });

  const handleChange = (query: string) => {
    setCurrentPage(1);
    setSearchQuery(query);
  };

  const openModal = () => setIsOpenModal(true);
  const closeModal = () => setIsOpenModal(false);


  
  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onSearch={handleChange} value={searchQuery}/>
        
        <button className={css.button} onClick={openModal}>Create post</button>
      </header>
      {isOpenModal && <Modal onClose={closeModal} children={<CreatePostForm onClose={closeModal} />}>{ }</Modal> }
      {data && data.posts.length > 0 && <PostList posts={data.posts} />}
      {data && data.totalPages > 1 && (
        <Pagination
          totalPages={data.totalPages}
          currentPage={currentPage}
          onPageChange={setCurrentPage} />
      )}
      <Toaster />
    </div>
  );
}
