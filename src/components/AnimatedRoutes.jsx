import { Route, Routes, useLocation } from "react-router-dom";
import Home from "../pages/Home";
import Strategies from "../pages/Strategies";
import Marketplace from "../pages/Marketplace";
import Workspace from "../pages/Workspace";

import { AnimatePresence } from "framer-motion";

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path="/" exact element={<Home />} />
        <Route path="/strategies" exact element={<Strategies />} />
        <Route path="/marketplace" exact element={<Marketplace />} />
        <Route path="/workspace" exact element={<Workspace />} />
      </Routes>
    </AnimatePresence>
  );
}

export default AnimatedRoutes;
