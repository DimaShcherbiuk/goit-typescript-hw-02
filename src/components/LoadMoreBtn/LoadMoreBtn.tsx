import { ReactNode } from "react";
import css from "./LoadMoreBtn.module.css";

interface LoadMoreBtnProps {
  children: ReactNode;
  onClick: () => void;
  disabled: boolean;
}

const LoadMoreBtn: React.FC<LoadMoreBtnProps> = ({ children, onClick, disabled }) => {
  return (
    <div>
      <button className={css.button} onClick={onClick} disabled={disabled}>
        {children}
      </button>
    </div>
  );
};

export default LoadMoreBtn;
