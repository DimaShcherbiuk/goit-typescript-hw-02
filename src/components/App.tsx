import { useState, useEffect } from "react";
import SearchBar from "./SearchBar/SearchBar";
import { getPhotos } from "./apiService";
import LoadMoreBtn from "./LoadMoreBtn/LoadMoreBtn";
import Loader from "./Loader/Loader";
import ImageModal from "./ImageModal/ImageModal";
import ImageGallery from "./ImageGallery/ImageGallery";
import ErrorMessage from "./ErrorMessage/ErrorMessage";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";
import { Image } from "./types";

interface Responce {
  results:[];
  total: number;
}

function App() {
  const [query, setQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [images, setImages] = useState<Image[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean | null>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  //modal
  const [modalUrl, setModalUrl] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isEmpty, setIsEmpty] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        setIsLoading(true);
        const resonse = await getPhotos<Responce>(query, page);
        const { results, total } = resonse;
        if (results.length === 0) {
          setIsEmpty(true);
        } else {
          setIsEmpty(false);
        }
        if (page === 1) {
          setImages(results);
        } else {
          setImages((prevArticles) => [...prevArticles, ...results]);
        }
        setIsVisible(total === 10);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    if (query !== "") {
      fetchData();
    }
  }, [query, page]);

  const onHandleSubmit = (value: string) => {
    setQuery(value);
    setImages([]);
    setPage(1);
    setError(null);
    setIsVisible(false);
    setIsEmpty(false);
  };

  const onLoadMoreBtn = () => {
    setPage((prevPage) => prevPage + 1);
  };

  //modal
  const openModal = (url: string) => {
    setShowModal(true);
    setModalUrl(url);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalUrl("");
  };

  return (
    <>
      <SearchBar onSubmit={onHandleSubmit} />
      {isLoading && <Loader />}
      {error && <ErrorMessage />}
      {isEmpty && <p>{toast.error("No results found for your query.")}</p>}
      {images.length > 0 && (
        <ImageGallery images={images} openModal={openModal} />
      )}

      {isVisible && (
        <LoadMoreBtn onClick={onLoadMoreBtn} disabled={isLoading}>
          {isLoading ? "Loading..." : "Load more"}
        </LoadMoreBtn>
      )}

      <ImageModal
        modalIsOpen={showModal}
        closeModal={closeModal}
        modalUrl={modalUrl}
      />
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
}

export default App;
