import Layout from "./components/layout/Layout";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Strategies from "./pages/Strategies";
import Workspace from "./pages/Workspace";
import Dashboard from "./pages/Dashboard";
import Checkout from "./pages/Checkout";
import { UserProvider } from "./components/UserContext";
import { StrategyProvider } from "./components/StrategyContext";

function App() {
  const location = useLocation();

  return (
    <UserProvider>
      <StrategyProvider>
        <Layout>
          <Routes location={location} key={location.pathname}>
            <Route path="/" exact element={<Home />} />
            <Route path="/dashboard" exact element={<Dashboard />} />
            <Route path="/strategies" exact element={<Strategies />} />
            <Route path="/workspace" exact element={<Workspace />} />
            <Route path="/checkout" exact element={<Checkout />} />
          </Routes>
        </Layout>
      </StrategyProvider>
    </UserProvider>
  );
}

export default App;
