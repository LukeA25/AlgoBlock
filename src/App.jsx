import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import Strategies from "./pages/Strategies";
import Workspace from "./pages/Workspace";
import Tutorial from "./pages/Tutorial";
import Dashboard from "./pages/Dashboard";
import Checkout from "./pages/Checkout";
import ScriptCopy from "./pages/ScriptCopy";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import TermsOfService from "./pages/TermsOfService";
import PrivacyPolicy from "./pages/PrivacyPolicy";

import { Route, Routes, useLocation } from "react-router-dom";
import { UserProvider } from "./components/UserContext";
import { StrategyProvider } from "./components/StrategyContext";
import ReactPixel from "react-facebook-pixel";

function App() {
  const location = useLocation();
  const options = {
    autoConfig: true,
    debug: false,
  };
  ReactPixel.init("295604156292526", null, options);
  ReactPixel.revokeConsent();

  return (
    <UserProvider>
      <StrategyProvider>
        <Layout>
          <Routes location={location} key={location.pathname}>
            <Route path="/" exact element={<Home />} />
            <Route path="/dashboard" exact element={<Dashboard />} />
            <Route path="/strategies" exact element={<Strategies />} />
            <Route path="/workspace" exact element={<Workspace />} />
            <Route path="/tutorial" exact element={<Tutorial />} />
            <Route path="/checkout" exact element={<Checkout />} />
            <Route path="/scriptcopy" exact element={<ScriptCopy />} />
            <Route path="/about-us" exact element={<AboutUs />} />
            <Route path="/contact-us" exact element={<ContactUs />} />
            <Route path="/terms-of-service" exact element={<TermsOfService />} />
            <Route path="/privacy-policy" exact element={<PrivacyPolicy />} />
          </Routes>
        </Layout>
      </StrategyProvider>
    </UserProvider>
  );
}

export default App;
