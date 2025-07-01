import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { Login } from "./app/pages/Login";
import MainLayout from "./app/Layout/MainLayout";
import Dashboard from "./app/dashboard/Dashboard";
import RequireAdmin from "./components/common/RequireAdmin";
import { Register } from "./app/pages/Register";
import CreateCampaign from "./app/pages/CreateCampaign";
import MyCampaigns from "./app/pages/MyCampaigns";
import CampaignDetails from "./app/pages/CampaignDetails";
import Transactions from "./app/pages/Transactions";
import AllCampaigns from "./app/dashboard/AllCampaigns";
import EditCampaign from "./app/pages/EditCampaign";
import { ForgotPassword } from "./app/pages/ForgotPassword";

function App() {
  return (
    <>
      <Routes>
        {/* Login route without layout */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Routes with MainLayout */}
        <Route
          element={
            <RequireAdmin>
              <MainLayout />
            </RequireAdmin>
          }
        >
          <Route path="/" element={<Dashboard />} />
          <Route path="/all-campaigns" element={<AllCampaigns />} />
          <Route path="/my-campaigns" element={<MyCampaigns />} />
          <Route path="/create-campaign" element={<CreateCampaign />} />
          <Route path="/edit-campaign/:id" element={<EditCampaign />} />
          <Route path="/campaign-details/:id" element={<CampaignDetails />} />
          <Route path="/transactions" element={<Transactions />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
