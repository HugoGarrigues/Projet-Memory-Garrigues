import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Info from "./pages/Info";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/info" element={<Info />} />
    </Routes>
  );
};

export default AppRoutes;
