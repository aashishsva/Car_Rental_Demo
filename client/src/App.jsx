import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./ui/Navbar";
import Home from "./ui/Home";
import AdminLogin from "./Admin/AdminLogin";
import UserRegister from "./User/UserRegister";
import UserLogin from "./User/UserLogin";
import UserDashboard from "./User/UserDashboard";
import AdminDashboard from "./Admin/AdminDashboard";

import PostCar from "./components/postcar/PostCar";
import OrderCar from "./components/ordercar/OrderCar";
import LocationMaster from "./components/locationmaster/LocationMaster";
import CategoryMaster from "./components/categorymaster/CategoryMaster";
import VehicleMaster from "./components/vehiclemaster/VehicleOwner";
import ProtectedRoute from "./utils/ProtectedRoute";

const AppContent = () => {
  const location = useLocation();

  const hideNavbarPaths = [
    "/admindashboard",
    "/admindashboard/postcar",
    "/admindashboard/ordercar",
    "/admindashboard/locationmaster",
    "/admindashboard/categorymaster",
    "/admindashboard/vehicleowner",
  ];

  const shouldShowNavbar = !hideNavbarPaths.includes(location.pathname);

  return (
    <>
      {shouldShowNavbar && <Navbar />}

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<AdminLogin />} />
        <Route path="/register" element={<UserRegister />} />
        <Route path="/userlogin" element={<UserLogin />} />

        {/* User Dashboard */}
        <Route
          path="/userdashboard"
          element={
            <ProtectedRoute>
              <UserDashboard />
            </ProtectedRoute>
          }
        />

        {/* Admin Dashboard with Sidebar */}
        <Route
          path="/admindashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        >
          <Route path="postcar" element={<PostCar />} />
          <Route path="ordercar" element={<OrderCar />} />
          <Route path="locationmaster" element={<LocationMaster />} />
          <Route path="categorymaster" element={<CategoryMaster />} />
          <Route path="vehicleowner" element={<VehicleMaster />} />
        </Route>
      </Routes>
    </>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
