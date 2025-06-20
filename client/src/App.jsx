import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import Navbar from "./ui/Navbar";
import Home from "./ui/Home";
import AdminLogin from "./Admin/AdminLogin";
import UserRegister from "./User/UserRegister";
import UserLogin from "./User/UserLogin";
import UserDashboard from "./User/UserDashboard";
import AdminDashboard from "./Admin/AdminDashboard";
import AdminDashboardHome from './Admin/AdminDashboardHome'

import OrderCar from "./components/ordercar/OrderCar";
import LocationMaster from "./components/locationmaster/LocationMaster";
import CategoryMaster from "./components/categorymaster/CategoryMaster";
import VehicleMaster from "./components/vehiclemaster/VehicleOwner";
import VehicleOwnerDashboard from "./User/VehicleOwnerDashboard";
import PostCar from "./User/PostCar";
import VehicleOwnerProfile from "./User/VehicleOwnerProfile";
import VehicleOwnerOrder from './User/VehicleOwnerOrder'
import VehicleOwnerReviews from './User/VehicleOwnerReviews'
import UserOrder from './User/UserBooking'
import UserProfile from './User/UserProfile'
import UserMyOrder from "./User/UserMyOrder";
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

  const VehicleOwnerProtectedRoute = ({ children }) => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token || role !== "vehicleowner") {
      return <Navigate to="/userlogin" replace />;
    }

    return children;
  };

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
        <Route path="/userdashboard" element={ localStorage.getItem("token") && localStorage.getItem("role") === "passenger" ? ( <UserDashboard /> ) : ( <Navigate to="/userlogin" replace />  ) }/>
        <Route path="/user/booking" element={<UserOrder />} /> 
        <Route path="/user/profile" element={<UserProfile />} />
        <Route path="/user/myorder" element={<UserMyOrder />} />
       
        

        {/* Admin Dashboard with Sidebar */}
        <Route path="/admindashboard" element={<AdminDashboard />}>
          <Route index element={<AdminDashboardHome />} />{" "}
          <Route path="ordercar" element={<OrderCar />} />
          <Route path="locationmaster" element={<LocationMaster />} />
          <Route path="categorymaster" element={<CategoryMaster />} />
          <Route path="vehicleowner" element={<VehicleMaster />} />
        </Route>

        {/* <Route path="/admindashboard" element={<AdminDashboard />}>
          <Route path="ordercar" element={<OrderCar />} />
          <Route path="locationmaster" element={<LocationMaster />} />
          <Route path="categorymaster" element={<CategoryMaster />} />
          <Route path="vehicleowner" element={<VehicleMaster />} />
        </Route> */}

        <Route
          path="/vehicleowner/dashboard"
          element={<VehicleOwnerDashboard />}
        />
        <Route path="/vehicleowner/postcar" element={<PostCar />} />
        <Route path="/vehicleowner/profile" element={<VehicleOwnerProfile />} />
        <Route path="/vehicleowner/order" element={<VehicleOwnerOrder />} />
        <Route path="/vehicleowner/reviews" element={<VehicleOwnerReviews />} />

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
