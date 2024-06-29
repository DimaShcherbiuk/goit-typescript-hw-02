import css from "./ImageCard.module.css";

interface ImageCardProps {
  urls: {
    small: string;
    regular: string;
  };
  imgDescr: string;
  openModal: (url: string) => void;
}

const ImageCard: React.FC<ImageCardProps> = ({ urls, imgDescr, openModal }) => {
  return (
    <div className={css.image}>
      <img
        src={urls.small}
        alt={imgDescr}
        onClick={() => {
          openModal(urls.regular);
        }}
      />
    </div>
  );
};

export default ImageCard;
