import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useActions } from "../../hooks/useActions";

import editIcon from "../../assets/images/edit.png";
import styles from "./ProfilePage.module.scss";

const ProfilePage = () => {
  const { user } = useSelector((state) => state.users);

  const [editModeActive, setEditModeActive] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [password, setPassword] = useState("");
  const [img, setImg] = useState("");

  const navigate = useNavigate();
  const { editUser } = useActions();

  const onEdit = () => {
    if (editModeActive) {
      if (password ? password.length > 3 && password.length < 32 : true) {
        const formData = new FormData();
        firstName && formData.append("name", firstName);
        password && formData.append("password", password);
        img && formData.append("photo", img);
        editUser(formData).then(() => navigate("/profile"));
        setEditModeActive(!editModeActive);
      }
    } else {
      setEditModeActive(!editModeActive);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.profileBlock}>
        <div className={styles.mainInfo}>
          <div className={styles.mainInfo__left}>
            <div className={styles.image}>
              <img
                src={process.env.REACT_APP_SERVER_URL + "/" + user?.photo}
                alt="user-photo"
              />
            </div>
            <div className={styles.initials}>
              <strong>{user?.name}</strong>
            </div>
          </div>
          <div className={styles.mainInfo__right}>
            <button
              className={editModeActive && styles.editMode_active}
              onClick={onEdit}
            >
              <img src={editIcon} alt="edit-icon" />
              <span>{editModeActive ? "Сохранить" : "Изменить"}</span>
            </button>
          </div>
        </div>
        <div className={styles.otherInfo}>
          <div className={styles.otherInfo__left}>
            <div className={styles.block}>
              <span>Email:</span>
              <span>{user?.email}</span>
            </div>
            <div className={styles.block}>
              <span>Пол:</span>
              <span>{user?.gender}</span>
            </div>
            <div className={styles.block}>
              <span>Дата рождения:</span>
              <span>{user?.date_of_birth.split("T")[0]}</span>
            </div>
          </div>
          {editModeActive && (
            <div className={styles.otherInfo__right}>
              <div className={styles.blockParameters}>
                <span>Введите новое имя:</span>
                <span>Введите новый пароль:</span>
                <span>Выберите новое фото:</span>
              </div>
              <div className={styles.blockValues}>
                <input
                  value={firstName}
                  type="text"
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <input
                  value={password}
                  type="password"
                  minLength={3}
                  maxLength={32}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <input
                  name="myFile"
                  type="file"
                  onChange={(e) => setImg(e.target.files[0])}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
