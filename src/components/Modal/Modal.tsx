import styles from "./Modal.module.scss";
import {icons} from "../../assets/icons";
import { Backdrop } from "./Backdrop";

type Props = {
  onClose: () => void;
  onClick?: () => void;
  children?: React.ReactNode;
};

export const Modal = ({ onClose, onClick, children }: Props) => {
  return (
    <>
      <Backdrop onClose={onClose} />
      <div onClick={onClick} className={styles.modal}>
        <icons.GrFormClose className={styles.close_icon} onClick={onClose}/>
        {children}
      </div>
    </>
  );
};
