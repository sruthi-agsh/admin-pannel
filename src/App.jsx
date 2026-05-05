import { BrowserRouter, Routes, Route } from "react-router-dom";
import LogInPage from "./pages/LogInPage";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Employee from "./pages/Employee";
import DashBoard from "./pages/DashBoard";
import Designation from "./pages/Designation";
import Attendance from "./pages/Attendance";
import LateReason from "./pages/LateReason";
import { ThemeProvider } from "./context/ThemeProvider";
import { AuthProvider } from "./context/AuthContext";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Layout from "./pages/Layout";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>        
        <AuthProvider>
          <Routes>

            <Route path="/" element={<LogInPage />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />

           
            <Route element={<Layout />}>
              <Route path="/dashboard" element={<DashBoard />} />
              <Route path="/employee" element={<Employee />} />
              <Route path="/designation" element={<Designation />} />
              <Route path="/attendance" element={<Attendance />} />
              <Route path="/latereason" element={<LateReason />} />
            </Route>

          </Routes>

        
          <ToastContainer />
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;