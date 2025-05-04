import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Home from "./pages/home/Home.jsx";
// import Create from "./pages/create/Create.jsx";
// import Post from "./pages/post/Post.jsx";
// import Auth from "./pages/auth/Auth.jsx";
// import UserProfile from "./pages/userProfile/UserProfile.jsx";
// import Search from "./pages/search/Search.jsx";
import MainLayout from "./pages/layout/MainLayout.jsx";
import { ToastContainer } from "react-toastify";
import React from "react";
import Landing from "./pages/landing/Landing.jsx";
const queryClient = new QueryClient();
// Dynamic import via React.lazy()
const Home = React.lazy(() => import("./pages/home/Home.jsx"));
const Create = React.lazy(() => import("./pages/create/Create.jsx"));
const Post = React.lazy(() => import("./pages/post/Post.jsx"));
const Auth = React.lazy(() => import("./pages/auth/Auth.jsx"));
const UserProfile = React.lazy(() =>
  import("./pages/userProfile/UserProfile.jsx")
);
const Search = React.lazy(() => import("./pages/search/Search.jsx"));

createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <ToastContainer />
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route element={<MainLayout />}>
          <Route path="/home" element={<Home />} />
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
