

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
