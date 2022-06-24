import axios from "axios";
import UserService from "../../http/userAPI";
import openNotification from "../../utils/notifications";
import {
  SET_CURRENT_PAGE,
  SET_IS_AUTH,
  SET_USER,
  SET_USERS,
} from "../reducers/usersReducer";

export function setUser(data) {
  return { type: SET_USER, payload: data };
}

export function setIsAuth(bool) {
  return { type: SET_IS_AUTH, payload: bool };
}

export function setUsers(data) {
  return { type: SET_USERS, payload: data };
}

export function setCurrentPage(value) {
  return { type: SET_CURRENT_PAGE, payload: value };
}

export const login = (email, password) => {
  return async (dispatch) => {
    try {
      const { data } = await UserService.login(email, password);
      localStorage.setItem("token", data.accessToken);
      dispatch(setIsAuth(true));
      dispatch(setUser(data.user));
    } catch (e) {
      openNotification("Произошла ошибка", e.response?.data?.message, true);
    }
  };
};

export const registration = (formData) => {
  return async (dispatch) => {
    try {
      const { data } = await UserService.registration(formData);
      localStorage.setItem("token", data.accessToken);
      dispatch(setIsAuth(true));
      dispatch(setUser(data.user));
    } catch (e) {
      openNotification("Произошла ошибка", e.response?.data?.message, true);
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    try {
      await UserService.logout();
      localStorage.removeItem("token");
      dispatch(setIsAuth(false));
      dispatch(setUser(null));
    } catch (e) {
      console.log(e.response?.data?.message);
    }
  };
};

export const checkAuth = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/auth/refresh`,
        {
          withCredentials: true,
        }
      );
      localStorage.setItem("token", data.accessToken);
      dispatch(setIsAuth(true));
      dispatch(setUser(data.user));
    } catch (e) {
      console.log(e.response?.data?.message);
    }
  };
};

export const fetchUsers = (page, limit) => {
  return async (dispatch) => {
    try {
      const { data } = await UserService.getUsers(page, limit);
      dispatch(setUsers(data));
    } catch (e) {
      openNotification("Произошла ошибка", e.response?.data?.message, true);
    }
  };
};

export const editUser = (formData) => {
  return async (dispatch) => {
    try {
      const { data } = await UserService.editInfo(formData);
      dispatch(setUser(data));
      openNotification("Успешно!", "Ваши изменения сохранены", false);
    } catch (e) {
      console.log(e.response?.data?.message);
    }
  };
};
