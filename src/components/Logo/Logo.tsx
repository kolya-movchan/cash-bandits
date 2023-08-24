import classNames from "classnames";
import { useAppSelector } from "../../hooks/hooks";

export function Logo() {
  const { darkMode } = useAppSelector((state) => state.darkMode);

  return (
    <div className="side-container">
      <a href="#" className="logo-container">
        <img src="./logo.jpg" className="logo logo--dark-mode" alt="mopobank logo" />
        <h2
          className={classNames('title', { 'title--dark-mode': darkMode })}
          style={{ textDecoration: 'none' }}
        >
          mopoBank
        </h2>
      </a>
    </div>
  );
}
