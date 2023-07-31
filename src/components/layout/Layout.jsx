import MainNavigation from "./MainNavigation";
import NavBar from "./NavBar";
import Popup from "../Popup";
import Login from "../Login";
import Signup from "../Signup";

import { useEffect, useState } from "react";
import Footer from "./Footer";
import ResetPassword from "../ResetPassword";
import { useLocation } from "react-router-dom";

function Layout(props) {
  const [isNavBarActive, setIsNavBarActive] = useState(false);
  const [isLoginActive, setIsLoginActive] = useState(false);
  const [isSignUpActive, setIsSignUpActive] = useState(false);
  const [resetPasswordActive, setResetPassword] = useState(false);
  const location = useLocation();

  function toggleNavBar() {
    setIsNavBarActive(!isNavBarActive);
  }

  function toggleLogin() {
    setIsLoginActive(!isLoginActive);
  }

  function toggleSignUp() {
    setIsSignUpActive(!isSignUpActive);
  }

  function toggleResetPassword() {
    setResetPassword(!resetPasswordActive);
  }

  useEffect(() => {
    if (location.hash === "#signup") {
      toggleLogin();
      toggleSignUp();
    }
  }, [])

  return (
    <div>
      <MainNavigation
        toggleNavBar={toggleNavBar}
        toggleLogin={toggleLogin}
        toggleSignUp={toggleSignUp}
        isSignUpActive={isSignUpActive}
        isLoginActive={isLoginActive}
      />
      <main>
        {props.children}
        <Footer />
        {resetPasswordActive ? (
          <Popup
            toggle={() => {
              toggleLogin();
              toggleResetPassword();
            }}
            getActive={isLoginActive}
            title="Reset Password"
          >
            <ResetPassword
              toggleLogin={toggleLogin}
              toggleResetPassword={toggleResetPassword}
            />
          </Popup>
        ) : isSignUpActive ? (
          <Popup toggle={toggleLogin} getActive={isLoginActive} title="Sign Up">
            <Signup toggleLogin={toggleLogin} toggleSignUp={toggleSignUp} />
          </Popup>
        ) : (
          <Popup toggle={toggleLogin} getActive={isLoginActive} title="Login">
            <Login
              toggleLogin={toggleLogin}
              toggleSignUp={toggleSignUp}
              toggleResetPassword={toggleResetPassword}
            />
          </Popup>
        )}
        <NavBar
          isActive={isNavBarActive}
          toggleActive={toggleNavBar}
          toggleLogin={toggleLogin}
          isSignUpActive={isSignUpActive}
          toggleSignUp={toggleSignUp}
        />
      </main>
    </div>
  );
}

export default Layout;
