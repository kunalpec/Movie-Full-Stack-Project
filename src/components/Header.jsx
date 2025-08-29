import style from "./Header.module.css";

const Header = ({ tpp ,handlegenreClick ,click_genre}) => {
  return (
    <>
    <header className={style["header-1"]}>
      <div className={style.brand}><span className={style.coloring}>Mo</span>ive Review</div>
      {tpp}
      <ul className={style["ui-1"]}>
        <li><a href="">Home</a></li>
        <li><a onClick={handlegenreClick} role="button" className={`${click_genre ? style["active"] : ""}`}>Genre</a></li>
        <li><a href="">Login</a></li>
        <li><a href="">Signup</a></li>
      </ul>
    </header>
    </>
  );
};

export default Header;
