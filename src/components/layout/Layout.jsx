import MainNavigation from "./MainNavigation";
import NavBar from "./NavBar";

import { useState } from "react";

function Layout(props) {
  const [isNavBarActive, setIsNavBarActive] = useState(false);

  function toggleNavBar() {
    console.log("Bar Toggled");
    setIsNavBarActive(!isNavBarActive);
  }
  
  return (
    <div>
      <MainNavigation toggleNavBar={toggleNavBar}/>
      <main>
        {props.children}
        <NavBar isActive={isNavBarActive} toggleActive={toggleNavBar} />
      </main>
    </div>
  );
}

export default Layout;