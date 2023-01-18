import styles from "../Counter.module.css";
import { useCounterContext } from "../useCounterContext";

export interface IncrementProps {
  icon?: string;
}

const Increment: React.FC<IncrementProps> = ({ icon = "ri-add-line" }) => {
  const { handleIncrement } = useCounterContext();
  return (
    <button className={styles.increment} onClick={handleIncrement}>
      <i className={icon}></i>
    </button>
  );
};

export default Increment;
