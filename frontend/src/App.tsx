import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/login";
import HomePage from "./pages/home";
import TweetPage from "./pages/tweet";
import Layout from "./layout";

const App: React.FC = () => {
  return (
    <Routes>
      <Route index element={<LoginPage />} />
      <Route path="/" element={<Layout />}>
        <Route path="home" element={<HomePage />} />
        <Route path="tweet/:id" element={<TweetPage />} />
      </Route>
    </Routes>
  );
};

export default App;
