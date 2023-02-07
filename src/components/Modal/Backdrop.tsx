import styles from "./Modal.module.scss";

type Props = { onClose: () => void; children?: React.ReactNode };

export const Backdrop = ({ onClose, children }: Props) => {
  return (
    <div className={styles.backdrop} onClick={onClose}>
      {children}
    </div>
  );
};
