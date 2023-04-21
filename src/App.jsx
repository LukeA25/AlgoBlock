import Layout from "./components/layout/Layout";
import AnimatedRoutes from "./components/AnimatedRoutes";
import { UserProvider } from "./components/UserContext";

function App() {
  return (
    <UserProvider>
      <Layout>
        <AnimatedRoutes />
      </Layout>
    </UserProvider>
  );
}

export default App;
