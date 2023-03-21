import { Route, Routes, useLocation } from "react-router-dom";
import Home from "../pages/Home";
import Strategies from "../pages/Strategies";
import Login from "../pages/Login";
import Marketplace from "../pages/Marketplace";

import { AnimatePresence } from "framer-motion";

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path="/" exact element={<Home />} />
        <Route path="/strategies" exact element={<Strategies />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/marketplace" exact element={<Marketplace />} />
      </Routes>
    </AnimatePresence>
  );
}

export default AnimatedRoutes;