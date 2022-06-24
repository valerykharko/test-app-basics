import { LoginPage, RegistrationPage, ProfilePage, UsersPage } from "../pages";
import {
  LOGIN_ROUTE,
  PROFILE_ROUTE,
  REGISTRATION_ROUTE,
  USERS_ROUTE,
} from "./routes";

export const publicRoutes = [
  {
    path: LOGIN_ROUTE,
    component: <LoginPage />,
    exact: true,
  },
  {
    path: REGISTRATION_ROUTE,
    component: <RegistrationPage />,
    exact: true,
  },
];

export const privateRoutes = [
  {
    path: PROFILE_ROUTE,
    component: <ProfilePage />,
    exact: true,
  },
  {
    path: USERS_ROUTE,
    component: <UsersPage />,
    exact: true,
  },
];
