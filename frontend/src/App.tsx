import React from "react";
import { Routes, Route, Link, Outlet } from "react-router-dom";
import LoginPage from "./pages/login";
import HomePage from "./pages/home";
import TweetPage from "./pages/tweet";

const Layout = () => {
  return (
    <div>
      <ul>
        <li>
          <Link to="/">login</Link>
        </li>
        <li>
          <Link to="/home">home</Link>
        </li>
        <li>
          <Link to="/tweet/555">tweet</Link>
        </li>
      </ul>

      <main>
        <Outlet />
      </main>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<LoginPage />} />
        <Route path="home" element={<HomePage />} />
        <Route path="tweet/:id" element={<TweetPage />} />
      </Route>
    </Routes>
  );
};

export default App;
