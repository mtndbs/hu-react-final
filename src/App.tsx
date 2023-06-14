import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import Footer from "./components/Footer";
import AboutPage from "./pages/AboutPage";
import LoginPage from "./pages/LoginPage";
import SignPage from "./pages/SignPage";
import CreatCardPage from "./pages/CreatCardPage";
import EditCardPage from "./pages/EditCardPage";
import MyCardsPage from "./pages/MyCardsPage";
import FavoriteCardPage from "./pages/FavoriteCardPage";
import ViewCardPage from "./pages/ViewCardPage";
import PrimarySearchAppBar from "./components/Header";
import { Box } from "@mui/material";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <>
      <Header />
      <ToastContainer position="top-right" theme="dark" />
      <Box padding={4} marginBottom={4}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/sign" element={<SignPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/create-card" element={<CreatCardPage />} />
          <Route path="/my-cards" element={<MyCardsPage />} />
          <Route path="/favorite-card" element={<FavoriteCardPage />} />
          <Route path="/edit-card/:id" element={<EditCardPage />} />
          <Route path="/view-card/:id" element={<ViewCardPage />} />
        </Routes>
      </Box>
      <Footer />
    </>
  );
}

export default App;
