import styles from './more.module.css';

const More = ({onclickmore}) => {
  return (
    <div className={styles['more-wrapper']}>
      <button className={styles['more-btn']} onClick={onclickmore}>More</button>
    </div>
  );
}

export default More;
