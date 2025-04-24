import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home.jsx";
import Create from "./pages/create/Create.jsx";
import Post from "./pages/post/Post.jsx";
import Auth from "./pages/auth/Auth.jsx";
import UserProfile from "./pages/userProfile/UserProfile.jsx";
import Search from "./pages/search/Search.jsx";
import MainLayout from "./pages/layout/MainLayout.jsx";
const queryClient = new QueryClient();
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <ToastContainer />
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<Create />} />
          <Route path="/pin/:id" element={<Post />} />
          <Route path="/:username" element={<UserProfile />} />
          <Route path="/search" element={<Search />} />
        </Route>
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </Router>
  </QueryClientProvider>
);
