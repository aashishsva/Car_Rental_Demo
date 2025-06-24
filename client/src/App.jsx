import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";

// UI Components
import Navbar from "./ui/Navbar";
import Footer from "./ui/Footer";
import Home from "./ui/Home";
import About from "./ui/About";
import Cars from "./ui/Cars";

// Admin
import AdminLogin from "./Admin/AdminLogin";
import AdminDashboard from "./Admin/AdminDashboard";
import AdminDashboardHome from './Admin/AdminDashboardHome';
import OrderCar from "./components/ordercar/OrderCar";
import LocationMaster from "./components/locationmaster/LocationMaster";
import CategoryMaster from "./components/categorymaster/CategoryMaster";
import VehicleMaster from "./components/vehiclemaster/VehicleOwner";

// User/Passenger
import UserRegister from "./User/UserRegister";
import UserLogin from "./User/UserLogin";
import UserDashboard from "./User/UserDashboard";
import UserOrder from './User/UserBooking';
import UserProfile from './User/UserProfile';
import UserMyOrder from "./User/UserMyOrder";

// Vehicle Owner
import VehicleOwnerDashboard from "./User/VehicleOwnerDashboard";
import PostCar from "./User/PostCar";
import VehicleOwnerProfile from "./User/VehicleOwnerProfile";
import VehicleOwnerOrder from './User/VehicleOwnerOrder';
import VehicleOwnerReviews from './User/VehicleOwnerReviews';

const AppContent = () => {
  const location = useLocation();

  const hideNavbarPaths = [
    "/admindashboard",
    "/admindashboard/ordercar",
    "/admindashboard/locationmaster",
    "/admindashboard/categorymaster",
    "/admindashboard/vehicleowner",
    "/vehicleowner/dashboard",
    "/vehicleowner/postcar",
    "/vehicleowner/cars",
    "/vehicleowner/profile",
    "/vehicleowner/order",
    "/vehicleowner/reviews",
    "/userdashboard",
    "/user/booking",
    "/user/profile",
    "/user/myorder"
  ];

  const shouldShowNavbar = !hideNavbarPaths.includes(location.pathname);
  const shouldShowFooter = shouldShowNavbar; // Footer bhi sirf public pages pe

  const isLoggedIn = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  return (
    <>
      {shouldShowNavbar && <Navbar />}

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/cars" element={<Cars />} /> 
        <Route path="/login" element={<AdminLogin />} />
        <Route path="/register" element={<UserRegister />} />
        <Route path="/userlogin" element={<UserLogin />} />

        {/* User Dashboard */}
        <Route path="/userdashboard" element={
          isLoggedIn && role === "passenger" ? (
            <UserDashboard />
          ) : (
            <Navigate to="/userlogin" replace />
          )
        } />
        <Route path="/user/booking" element={<UserOrder />} /> 
        <Route path="/user/profile" element={<UserProfile />} />
        <Route path="/user/myorder" element={<UserMyOrder />} />

        {/* Admin Dashboard */}
        <Route path="/admindashboard" element={<AdminDashboard />}>
          <Route index element={<AdminDashboardHome />} />
          <Route path="ordercar" element={<OrderCar />} />
          <Route path="locationmaster" element={<LocationMaster />} />
          <Route path="categorymaster" element={<CategoryMaster />} />
          <Route path="vehicleowner" element={<VehicleMaster />} />
        </Route>

        {/* Vehicle Owner Dashboard */}
        <Route path="/vehicleowner/dashboard" element={<VehicleOwnerDashboard />} />
        <Route path="/vehicleowner/postcar" element={<PostCar />} />
        <Route path="/vehicleowner/profile" element={<VehicleOwnerProfile />} />
        <Route path="/vehicleowner/order" element={<VehicleOwnerOrder />} />
        <Route path="/vehicleowner/reviews" element={<VehicleOwnerReviews />} />
      </Routes>

      {shouldShowFooter && <Footer />}
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
