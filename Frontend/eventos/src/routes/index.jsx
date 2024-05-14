import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";
import Principal from "../pages/Principal";
import Eventos from "../pages/Eventos";
import Historico from "../pages/Historico";
import Visualizacao from "../pages/Visualizacao";



export const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Login />} />
        <Route path="/register" exact element={<Register />} />
        <Route path="/principal" element={<Principal />} />
        <Route path="/eventos" element={<Eventos />} />
        <Route path="/historico" element={<Historico />} />
        <Route path="/visualizacao" element={<Visualizacao />} />
      </Routes>
    </Router>
  );
};