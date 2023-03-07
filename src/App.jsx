import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";

import Home from "./pages/Home";
import Workspace from "./pages/Workspace";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/workspace" exact element={<Workspace />} />
      </Routes>
    </Layout>
  );
}

export default App;
