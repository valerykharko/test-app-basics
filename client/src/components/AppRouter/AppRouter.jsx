import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { LOGIN_ROUTE, PROFILE_ROUTE } from "../../routes/routes";
import { privateRoutes, publicRoutes } from "../../routes";

const AppRouter = () => {
  const { isAuth } = useSelector((state) => state.users);

  return isAuth ? (
    <Routes>
      {privateRoutes.map((route) => (
        <Route
          path={route.path}
          exact={route.exact}
          element={route.component}
          key={route.path}
        />
      ))}
      <Route path="*" element={<Navigate to={PROFILE_ROUTE} />} />
    </Routes>
  ) : (
    <>
      <Routes>
        {publicRoutes.map((route) => (
          <Route
            path={route.path}
            exact={route.exact}
            element={route.component}
            key={route.path}
          />
        ))}
        <Route path="*" element={<Navigate to={LOGIN_ROUTE} />} />
      </Routes>
    </>
  );
};

export default AppRouter;
