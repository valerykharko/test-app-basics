import React from "react";
import { Menu } from "antd";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useActions } from "../../hooks/useActions";
import { LOGIN_ROUTE, PROFILE_ROUTE, USERS_ROUTE } from "../../routes/routes";

import styles from "./Navbar.module.scss";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, isAuth } = useSelector((state) => state.users);
  const { logout } = useActions();

  return (
    <div className={styles.navbar}>
      {isAuth ? (
        <>
          <div className={styles.user} onClick={() => navigate(PROFILE_ROUTE)}>
            <img
              src={process.env.REACT_APP_SERVER_URL + "/" + user?.photo}
              alt="user-photo"
            />
            <div className={styles.user__info}>
              <strong style={{ color: "black" }}>{user?.name}</strong>
              <span>{user.email}</span>
            </div>
          </div>
          <Menu
            style={{
              display: "flex",
              backgroundColor: "transparent",
              border: "none",
            }}
            mode="vertical"
            selectable={false}
          >
            <Menu.Item
              style={{ marginRight: 10, backgroundColor: "white" }}
              onClick={() => navigate(USERS_ROUTE)}
              key={3}
            >
              Пользователи
            </Menu.Item>
            <Menu.Item
              style={{ backgroundColor: "white" }}
              onClick={logout}
              key={2}
            >
              Выйти
            </Menu.Item>
          </Menu>
        </>
      ) : (
        <>
          <div> </div>
          <Menu
            style={{ backgroundColor: "transparent", border: "none" }}
            mode="vertical"
            selectable={false}
          >
            <Menu.Item
              style={{ backgroundColor: "white" }}
              onClick={() => navigate(LOGIN_ROUTE)}
              key={1}
            >
              Войти
            </Menu.Item>
          </Menu>
        </>
      )}
    </div>
  );
};

export default Navbar;
