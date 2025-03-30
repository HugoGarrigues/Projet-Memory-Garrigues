import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Creation from "./pages/Creation";
import CardCreation from "./pages/CardCreation";
import ThemeCreation from "./pages/ThemeCreation";
import Settings from "./pages/Settings";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/creation" element={<Creation />} />
      <Route path="/creation/:categoryId" element={<ThemeCreation />} />
      <Route path="/creation/:categoryId/:themeId" element={<CardCreation />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  );
};

export default AppRoutes;
