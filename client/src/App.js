import { useEffect } from "react";
import { Layout } from "antd";
import { AppRouter, Navbar } from "./components";
import { useActions } from "./hooks/useActions";

const App = () => {
  const { checkAuth } = useActions();

  useEffect(() => {
    async function checkFullAuth() {
      if (localStorage.getItem("token")) {
        await checkAuth();
      }
    }
    checkFullAuth();
  }, []);

  return (
    <Layout>
      <Navbar />
      <Layout.Content>
        <AppRouter />
      </Layout.Content>
    </Layout>
  );
};

export default App;
