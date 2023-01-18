import styles from "../Counter.module.css";
import { useCounterContext } from "../useCounterContext";

const Count = () => {
  const { count } = useCounterContext();
  return <div className={styles.count}>{count}</div>;
};

export default Count;
