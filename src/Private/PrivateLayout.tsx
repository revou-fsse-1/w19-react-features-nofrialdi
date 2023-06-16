import { useMemo } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";

const PrivateLayout = () => {
  const navigate = useNavigate();
  const token = window.localStorage.getItem("token");
  const isAuth = useMemo(() => !!token, [navigate]);
  return (
    <div>
      {isAuth ? (
        <div>
          <Outlet />
        </div>
      ) : (
        <Navigate to="/login" replace={true} />
      )}
    </div>
  );
};

export default PrivateLayout;
