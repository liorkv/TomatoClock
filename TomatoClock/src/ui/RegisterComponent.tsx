import { FC, useState } from "react";
import styles from "./RegisterComponent.module.css";
import globalStyles from "./Global.module.css";

const RegisterComponent: FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className={`${styles.container} ${globalStyles.divShadow}`}>
      <h1 className={styles.signInTitle}>Sign out</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          name="username"
          value={username}
          onChange={handleUsernameChange}
          className={styles.textbox}
          placeholder="Username"
        />
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
          className={styles.textbox}
          placeholder="Password"
        />
        <button type="submit" className={styles.loginButton}>
          Sign out
        </button>
      </form>
    </div>
  );
};

export default RegisterComponent;
