import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import axios from "../api/axios";
import styles from "./LoginComponent.module.css";
import globalStyles from "./Global.module.css";

const LoginComponent: FC = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { auth, setAuth } = useAuth();

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "/auth",
        JSON.stringify({ user: username, pwd: password }),
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;

      setAuth({ accessToken, roles, username });

      axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

      console.log("Logged in successfully!");

      console.log(auth);

      navigate("/clock");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={`${styles.container} ${globalStyles.divShadow}`}>
      <h1 className={styles.signInTitle}>Sign in</h1>
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
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginComponent;
