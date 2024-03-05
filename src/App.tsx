import { ConfigProvider, Layout } from "antd";
import { ToastContainer } from "react-toastify";
import CustomHeader from "./components/HeaderCustom";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import MenuCustom from "./components/MenuCustom";
import Login from "./pages/login";
import Home from "./pages/home";
import Actor from "./pages/actor";
import NotFound from "./pages/not-found/NotFound";
import Director from "./pages/director";
import Genre from "./pages/genre";
import Movie from "./pages/movie";
import Episode from "./pages/episode";
import HeaderCustom from "./components/HeaderCustom";
import { useState } from "react";

function App() {
  const isLogin = Boolean(localStorage.getItem("account"));
  const { Sider, Header, Content, Footer } = Layout;

  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="App">
      <ConfigProvider
        theme={{
          token: {
            fontFamily: "Segoe UI",
          },
        }}
      >
        <BrowserRouter>
          <ToastContainer />
          {isLogin ? (
            <>
              <Layout className="App__layout">
                <MenuCustom collapsed={collapsed} setCollapsed={setCollapsed} />

                <Layout>
                  <HeaderCustom
                    collapsed={collapsed}
                    setCollapsed={setCollapsed}
                  />
                  <Content
                    style={{
                      padding: 24,
                    }}
                  >
                    <Routes>
                      <Route path="/" element={<Navigate to="/home" />} />
                      <Route path="/home" element={<Home />} />
                      <Route path="/login" element={<Navigate to="/home" />} />
                      <Route path="/movie" element={<Movie />} />
                      <Route path="/movie/episode" element={<Episode />} />
                      <Route path="/actor" element={<Actor />} />
                      <Route path="/director" element={<Director />} />
                      <Route path="/genre" element={<Genre />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </Content>
                </Layout>
              </Layout>
            </>
          ) : (
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
          )}
        </BrowserRouter>
      </ConfigProvider>
    </div>
  );
}

export default App;
