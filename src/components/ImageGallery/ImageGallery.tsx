import ImageCard from "./ImageCard/ImageCard";
import css from "./ImageGallery.module.css";
import { Image } from "../types";

interface ImageGalleryProps {
  images: Image[];
  openModal: (slug: string) => void;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, openModal }) => (
  <ul className={css.list}>
    {images.map(({ id, urls, slug }) => (
      <li key={id} className={css.item}>
        <ImageCard urls={urls} imgDescr={slug} openModal={openModal} />
      </li>
    ))}
  </ul>
);

export default ImageGallery;
