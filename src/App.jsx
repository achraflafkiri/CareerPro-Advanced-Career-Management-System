import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/inc/Navbar";
import Sidebar from "./components/inc/Sidebar";

import SocieteCreate from "./components/societe/SocieteCreate";
import SocieteList from "./components/societe/SocieteList";
import SocieteDetails from "./components/societe/SocieteDetails";

import ProductsList from "./components/products/ProductsList";
import ProductsDetails from "./components/products/ProductsDetails";
import ProductsEdit from "./components/products/ProductsEdit";

import EmployeesList from "./components/employees/EmployeesList";
import EmployeesForm from "./components/employees/EmployeesForm";

import MaterialList from "./components/material/MaterialList";

import ClientForm from "./components/clients/ClientForm";
import ClientsList from "./components/clients/ClientsList";
import ClientEdit from "./components/clients/ClientEdit";

import NotFound from "./components/NotFound/NotFound";

import Home from "./pages/DashboardAppPage";
import Login from "./pages/LoginPage";
import Register from "./pages/RegisterPage";
import EmployeeAbsence from "./components/employees/EmployeeAbsence";

import DefaultLayout from "./layouts/DefaultLayout";
import GuestLayout from "./layouts/GuestLayout";
import Dashboard from "./pages/DashboardAppPage";

const App = () => {
  const [isLinkActive, setIsLinkActive] = useState(false);
  const [isID, setID] = useState(false);

  const handleNavToggle = (bool) => setIsLinkActive(bool);

  const handleNavIds = (societeId) => setID(societeId);

  return (
    <Router>
      <Routes>
        <Route
          element={
            <DefaultLayout
              handleNavToggle={handleNavToggle}
              isLinkActive={isLinkActive}
              isID={isID}
            />
          }
        >
          <Route path="/" element={<Dashboard />} />
          <Route path="/societe" element={<SocieteList />} />
          <Route path="/societe/create" element={<SocieteCreate />} />
          <Route
            path="/societe/:societeId"
            element={<SocieteDetails handleNavIds={handleNavIds} />}
          />
          <Route
            path="/societe/:societeId/produits"
            element={<ProductsList />}
          />
          <Route
            path="/societe/:societeId/produits/:produitId"
            element={<ProductsDetails />}
          />
          <Route
            path="/societe/:societeId/produits/:produitId/edit"
            element={<ProductsEdit />}
          />
          <Route
            path="/societe/:societeId/employees"
            element={<EmployeesList />}
          />
          <Route
            path="/societe/:societeId/employees/create"
            element={<EmployeesForm />}
          />
          <Route
            path="/societe/:societeId/employees/:employeeId/absence-registration"
            element={<EmployeeAbsence />}
          />
          <Route
            path="/societe/:societeId/materials"
            element={<MaterialList />}
          />
          <Route path="/societe/:societeId/clients" element={<ClientsList />} />
          <Route
            path="/societe/:societeId/clients/:produitId/edit"
            element={<ClientEdit />}
          />
          <Route
            path="/societe/:societeId/clients/create"
            element={<ClientForm />}
          />
        </Route>
        <Route element={<GuestLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
