import styles from './more.module.css';
import { TfiMoreAlt } from "react-icons/tfi";

const More = ({onclickmore}) => {
  return (
    <div className={styles['more-wrapper']}>
      <button className={styles['more-btn']} onClick={onclickmore}>
        <span className={styles['icon']}><TfiMoreAlt /></span> More
      </button>
    </div>
  );
}

export default More;
