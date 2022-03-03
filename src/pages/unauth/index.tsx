import { useState } from "react";
import { Register } from "./components/register";
import { Login } from "./components/login";
import Logo from "../../img/logo.svg";
import bg from "../../img/bg.svg";
import styles from "./index.module.css";
import { useLogin } from "../../utils/hooks/useLogin";

export const UnAuthPage = () => {
  const [isLogin, setLogin] = useState(true);
  return (
    <div
      className={`${styles.unauth} full-page flex-col-start`}
      style={{
        backgroundImage: `url(${bg})`,
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className={`${styles.header}`}>
        <img style={{ height: "100%" }} src={Logo} />
      </div>
      <div className={`${styles.content} flex-center`}>
        <div className={`${styles["form-outer"]} flex-col-start`}>
          {isLogin ? <Login /> : <Register setLogin={setLogin} />}
          <div className={`${styles.tip}`}>
            {isLogin ? (
              <div onClick={() => setLogin(false)}>没有账号？注册新账号</div>
            ) : (
              <div onClick={() => setLogin(true)}>已有账号？直接登录</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
