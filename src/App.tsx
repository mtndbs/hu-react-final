import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import HomePage from "./pages/HomePage";
import Footer from "./components/Footer";
import AboutPage from "./pages/AboutPage";
import LoginPage from "./pages/LoginPage";
import SignPage from "./pages/signUpPage/SignPage";
import CreatCardPage from "./pages/CreatCardPage";
import EditCardPage from "./pages/EditCardPage";
import MyCardsPage from "./pages/MyCardsPage";
import FavoriteCardPage from "./pages/FavoriteCardPage";
import ViewCardPage from "./pages/ViewCardPage";
// import PrimarySearchAppBar from "./components/Header/Header";
import { Container } from "@mui/material";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { verifyToken } from "./auth/TokenManager";
import RouteGuard from "./auth/RouteGuard";
function App() {
  return (
    <>
      {/* {verifyToken() && <Header />} */}
      <Header />
      <ToastContainer position="top-right" theme="light" />
      <Container fixed sx={{ margin: "10px auto" }}>
        <Container sx={{ margin: "60px auto" }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/sign" element={<SignPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route
              path="/create-card"
              element={
                <RouteGuard>
                  <CreatCardPage />
                </RouteGuard>
              }
            />
            <Route
              path="/my-cards"
              element={
                <RouteGuard>
                  <MyCardsPage />
                </RouteGuard>
              }
            />
            <Route
              path="/favorite-card"
              element={
                <RouteGuard>
                  <FavoriteCardPage />
                </RouteGuard>
              }
            />
            <Route
              path="/edit-card/:id"
              element={
                <RouteGuard>
                  <EditCardPage />
                </RouteGuard>
              }
            />
            <Route
              path="/view-card/:id"
              element={
                <RouteGuard>
                  <ViewCardPage />
                </RouteGuard>
              }
            />
          </Routes>
        </Container>
      </Container>
      {/* </div> */}
      <Footer />
    </>
  );
}

export default App;
