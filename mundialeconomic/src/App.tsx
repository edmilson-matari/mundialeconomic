import { Routes, Route, BrowserRouter } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Shops from "./components/Pages/Shops";
import Home from "./components/Pages/Home";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/lojas" element={<Shops />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
