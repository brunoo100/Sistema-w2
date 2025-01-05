import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import Cadastrocliente from "./Pages/Cadastrocliente";
import Ordem from "./Pages/Ordem";
import Relatorio from "./Pages/Relatorio";
import CadastroCarro from "./Pages/CadastroCarro/CadastroCarro";
import PrivateRoute from "./Pages/PrivateRoute/PrivateRoute"; // Importando o componente PrivateRoute
import ListaClientes from "./Pages/ListaClientes";


export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rotas públicas */}
        <Route path="/" element={<Login />} />
        
        {/* Rotas privadas */}
        <Route path="/home" element={<PrivateRoute element={Home} />} />
        <Route path="/cadastro" element={<PrivateRoute element={Cadastrocliente} />} />
        <Route path="/ordem" element={<PrivateRoute element={Ordem} />} />
        <Route path="/relatorio" element={<PrivateRoute element={Relatorio} />} />
        <Route path="/cadastrar" element={<PrivateRoute element={CadastroCarro} />} />
        <Route path="/listaclientes" element={<PrivateRoute element={ListaClientes} />} />
     
        
      </Routes>
    </BrowserRouter>
  );
}
