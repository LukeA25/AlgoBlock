import MainNavigation from "./MainNavigation";
import NavBar from "./NavBar";
import Popup from "../Popup";
import Login from "../Login";
import Signup from "../Signup";

import { useState } from "react";
import Footer from "./Footer";
import ResetPassword from "../ResetPassword";
import AlgoBlockIcon from "../../assets/AlgoBlockIcon.png";

function Layout(props) {
  const [isNavBarActive, setIsNavBarActive] = useState(false);
  const [isLoginActive, setIsLoginActive] = useState(false);
  const [isSignUpActive, setIsSignUpActive] = useState(false);
  const [resetPasswordActive, setResetPassword] = useState(false);

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
