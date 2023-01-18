import styles from "../Counter.module.css";
import { useCounterContext } from "../useCounterContext";

export interface DecrementProps {
  icon?: string;
}

const Decrement: React.FC<DecrementProps> = ({ icon = "ri-subtract-line" }) => {
  const { handleDecrement } = useCounterContext();
  return (
    <button className={styles.decrement} onClick={handleDecrement}>
      <i className={icon}></i>
    </button>
  );
};

export default Decrement;
