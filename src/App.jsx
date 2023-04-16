import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import SocieteCreate from "./components/societe/SocieteCreate";
import SocieteList from "./components/societe/SocieteList";
import SocieteDetails from "./components/societe/SocieteDetails";

import ProductsList from "./components/products/ProductsList";
import ProductsDetails from "./components/products/ProductsDetails";
import ProductsEdit from "./components/products/ProductsEdit";

import EmployeesList from "./components/employees/EmployeesList";
import EmployeesCreate from "./components/employees/EmployeesCreate";
import EmployeeEdit from "./components/employees/EmployeeEdit";
import EmployeesPresence from "./components/employees/EmployeesPresence";

import MaterialList from "./components/material/MaterialList";
import MaterialCreate from "./components/material/MaterialCreate";

import ClientCreate from "./components/clients/ClientCreate";
import ClientsList from "./components/clients/ClientsList";
import ClientEdit from "./components/clients/ClientEdit";

import NotFound from "./components/NotFound/NotFound";

import Login from "./pages/LoginPage";
import Register from "./pages/RegisterPage";

import DefaultLayout from "./layouts/DefaultLayout";
import GuestLayout from "./layouts/GuestLayout";
import Dashboard from "./pages/DashboardAppPage";
import CommandeEdit from "./components/clients/commandes/CommandeEdit";
import CommandeCreate from "./components/clients/commandes/CommandeCreate";

import Profile from "./components/profile/Profile";
import EditProfile from "./components/profile/EditProfile";

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
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/edit" element={<EditProfile />} />
          <Route path="/societe" element={<SocieteList />} />
          <Route path="/societe/create" element={<SocieteCreate />} />
          <Route
            path="/societe/:societeId"
            element={<SocieteDetails handleNavIds={handleNavIds} />}
          />
          <Route
            path="/societe/:societeId/products"
            element={<ProductsList />}
          />
          <Route
            path="/societe/:societeId/products/:productId"
            element={<ProductsDetails />}
          />
          <Route
            path="/societe/:societeId/products/:productId/edit"
            element={<ProductsEdit />}
          />
          <Route
            path="/societe/:societeId/employees"
            element={<EmployeesList />}
          />
          <Route
            path="/societe/:societeId/employees/create"
            element={<EmployeesCreate />}
          />
          <Route
            path="/societe/:societeId/employees/:employeeId/edit"
            element={<EmployeeEdit />}
          />
          <Route
            path="/societe/:societeId/employees/absences"
            element={<EmployeesPresence />}
          />
          <Route
            path="/societe/:societeId/materials"
            element={<MaterialList />}
          />
          <Route
            path="/societe/:societeId/materials/create"
            element={<MaterialCreate />}
          />
          <Route path="/societe/:societeId/clients" element={<ClientsList />} />
          <Route
            path="/societe/:societeId/clients/:clientId/edit"
            element={<ClientEdit />}
          />
          <Route
            path="/societe/:societeId/clients/create"
            element={<ClientCreate />}
          />
          <Route
            path="/societe/:societeId/clients/:clientId/commandes/:commandeId"
            element={<CommandeEdit />}
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
