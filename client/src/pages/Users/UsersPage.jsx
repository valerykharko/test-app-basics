import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useActions } from "../../hooks/useActions";
import getCurrentAge from "../../utils/getCurrentAge";

import styles from "./UsersPage.module.scss";
import { UsersPaginationPanel } from "../../components";

const UsersPage = () => {
  const { users, totalCount, page, limit } = useSelector(
    (state) => state.users
  );

  const { fetchUsers } = useActions();

  useEffect(() => {
    fetchUsers(page, limit);
  }, [page]);

  return (
    <div className={styles.container}>
      {users ? (
        <>
          <div>
            <h3>
              Общее количество: <b>{totalCount}</b>
            </h3>
          </div>
          <div className={styles.users}>
            {users.map((user) => (
              <div className={styles.userBlock} key={user.id}>
                <div className={styles.user}>
                  <img
                    src={process.env.REACT_APP_SERVER_URL + "/" + user?.photo}
                    alt="user-photo"
                  />
                  <div className={styles.userInfo}>
                    <div className={styles.userInfo__name}>
                      <strong>{user.name}</strong>
                      <span>{getCurrentAge(user.date_of_birth)} лет</span>
                    </div>
                    <div className={styles.userInfo__email}>
                      <span>e-mail: {user.email}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <UsersPaginationPanel />
        </>
      ) : (
        <div className={styles.emptyList}>
          <h2>Список пользоватей пуст :(</h2>
        </div>
      )}
    </div>
  );
};

export default UsersPage;
