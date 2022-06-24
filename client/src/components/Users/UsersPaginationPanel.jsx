import React from "react";
import { Pagination } from "antd";
import { useSelector } from "react-redux";

import { useActions } from "../../hooks/useActions";

import styles from "./UsersPaginationPanel.module.scss";

const UsersPaginationPanel = () => {
  const { totalCount, limit, page } = useSelector((state) => state.users);

  const { setCurrentPage } = useActions();

  const onChange = (value) => {
    setCurrentPage(value);
  };

  return (
    <div className={styles.wrapper}>
      <Pagination
        current={page}
        defaultPageSize={limit}
        total={totalCount}
        onChange={onChange}
      />
    </div>
  );
};

export default UsersPaginationPanel;
