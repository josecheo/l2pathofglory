import { Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AccountPage from "./pages/AccountPage/Index";
import { PaypalCheckout } from "./pages/AccountPage/PaypalCheckout";
import SupportPage from "./pages/SupportPage";





export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/account/donate/paypal" element={<PaypalCheckout />} />
          <Route path="/support" element={<SupportPage />} />
          
        </Routes>
      </main>
    </div>
  );
}
