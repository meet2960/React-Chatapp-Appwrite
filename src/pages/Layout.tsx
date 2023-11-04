import React, { useRef, useEffect } from "react";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { userStore } from "../state/userStore";
import { account } from "../config/appwriteConfig";
import toast from "react-hot-toast";

const Layout = () => {
  const isRendered = useRef<boolean>(false);
  const userState = userStore();
  const navigate = useNavigate();
  // console.log("isRendered", isRendered);
  useEffect(() => {
    if (!isRendered.current) {
      account
        .get()
        .then((res) => {
          // console.log("get User Called", res);
          userState.updateUser(res);
        })
        .catch(() => {
          userState.resetState();
          navigate("/login");
          toast.error(`Your session got expired.please login again`);
        });
      isRendered.current = true;
    }
  }, []);

  return (
    <React.Fragment>
      <div className="wrapper">
        <Header />
        <div className="main py-4">
          <Outlet />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Layout;
