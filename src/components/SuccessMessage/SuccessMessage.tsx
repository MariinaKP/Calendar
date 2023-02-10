import styles from "./SuccessMessage.module.scss";


type Props = {
  children: React.ReactNode;
};
export const SuccessMessage = ({children}: Props) => {
  return (
    <div className={styles.success_message}>
      {children}
    </div>
  );
};
