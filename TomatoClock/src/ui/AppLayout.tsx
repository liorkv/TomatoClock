import { Outlet } from "react-router-dom";
import styles from "./AppLayout.module.css";
import Header from "./Header";

function AppLayout() {
  return (
    <div className={styles.container}>
      <div className={styles.centralContainer}>
        <Header />
        <Outlet />
      </div>
    </div>
  );
}

export default AppLayout;
