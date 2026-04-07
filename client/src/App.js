import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Restaurants from "./pages/Restaurants";
import Menu from "./pages/Menu";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Profilecorner from "./components/Profilecorner";
import OrderPage from "./pages/OrderPage";
import TrackOrder from "./pages/TrackOrder";
import OTPLogin from "./components/OTPLogin"; // ✅ OTP login page

function App() {
  return (
    <>
      <Navbar />
      <Profilecorner />
      <Routes>
        {/* Existing Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/restaurants" element={<Restaurants />} />
        <Route path="/menu/:id" element={<Menu />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/order" element={<OrderPage />} />
        <Route path="/track" element={<TrackOrder />} />
        <Route path="/login" element={<Login />} />

        {/* NEW OTP Login Route */}
        <Route path="/otp-login" element={<OTPLogin />} />
      </Routes>
    </>
  );
}

export default App;
