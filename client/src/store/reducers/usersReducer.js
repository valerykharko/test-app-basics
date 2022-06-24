const defaultState = {
  user: {},
  isAuth: false,
  users: [],
  page: 1,
  limit: 4,
  totalCount: 0,
};

export const SET_USER = "SET_USER";
export const SET_IS_AUTH = "SET_IS_AUTH";
export const SET_USERS = "SET_USERS";
export const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";

export default function userReducer(state = defaultState, action) {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
    case SET_IS_AUTH:
      return { ...state, isAuth: action.payload };
    case SET_USERS:
      return {
        ...state,
        users: action.payload.users,
        totalCount: action.payload.count,
      };
    case SET_CURRENT_PAGE:
      return {
        ...state,
        page: action.payload,
      };
    default:
      return state;
  }
}
