import styles from "./Header.module.css";
import globalStyles from "./Global.module.css";
import { GiTomato } from "react-icons/gi";
import { FaClock, FaChartLine, FaCogs, FaSignInAlt } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";

function Header() {
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 34 * 16);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 34 * 16);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className={`${styles.header} ${globalStyles.divShadow}`}>
      <div className={styles.logo}>
        <GiTomato className={styles.logoIcon} />
        <h1>TomatoClock</h1>
      </div>
      <div className={styles.navContainer}>
        {isMobileView ? (
          <>
            <NavLink to="/clock" className={styles.navLink}>
              <FaClock />
            </NavLink>
            <NavLink to="/statistics" className={styles.navLink}>
              <FaChartLine />
            </NavLink>
            <NavLink to="/settings" className={styles.navLink}>
              <FaCogs />
            </NavLink>
            <NavLink to="/login" className={styles.navLink}>
              <FaSignInAlt />
            </NavLink>
          </>
        ) : (
          <>
            <NavLink to="/clock" className={styles.navLink}>
              Clock
            </NavLink>
            <NavLink to="/statistics" className={styles.navLink}>
              Statistics
            </NavLink>
            <NavLink to="/settings" className={styles.navLink}>
              Settings
            </NavLink>
            <NavLink to="/login" className={styles.navLink}>
              Login
            </NavLink>
          </>
        )}
      </div>
    </div>
  );
}

export default Header;
