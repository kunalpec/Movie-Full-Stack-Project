import style from "./Header.module.css";

const Header = () => {
  return (
    <>
    <header className={style["header-1"]}>
      <div className={style.brand}>MOVIE RECOMMENDATION APP</div>
      <ul className={style["ui-1"]}>
        <li><a href="">Home</a></li>
        <li><a href="">Login</a></li>
        <li><a href="">Signup</a></li>
      </ul>
    </header>
    </>
  );
};

export default Header;
