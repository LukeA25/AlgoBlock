import MainNavigation from "./MainNavigation";
import NavBar from "./NavBar";
import Popup from "../Popup";
import Login from "../Login";

import { useState } from "react";

function Layout(props) {
  const [isNavBarActive, setIsNavBarActive] = useState(false);
  const [isLoginActive, setIsLoginActive] = useState(false);
  const [isSignUpActive, setIsSignUpActive] = useState(false);

  function toggleNavBar() {
    setIsNavBarActive(!isNavBarActive);
  }

  function toggleLogin() {
    setIsLoginActive(!isLoginActive);
  }

  function toggleSignUp() {
    setIsSignUpActive(!isSignUpActive);
  }

  return (
    <div>
      <MainNavigation toggleNavBar={toggleNavBar} toggleLogin={toggleLogin} />
      <main>
        {props.children}
        {isSignUpActive ? (
          <Popup toggle={toggleLogin} getActive={isLoginActive} title="Sign Up">
            <Login toggleLogin={toggleLogin} toggleSignUp={toggleSignUp} accountQuestion="Already have an account? " switchButton="Login" />
          </Popup>
        ) : (
          <Popup toggle={toggleLogin} getActive={isLoginActive} title="Login">
            <Login toggleLogin={toggleLogin} toggleSignUp={toggleSignUp} accountQuestion="Need an account? " switchButton="Sign Up" />
          </Popup>
        )}
        <NavBar isActive={isNavBarActive} toggleActive={toggleNavBar} />
      </main>
    </div>
  );
}

export default Layout;
