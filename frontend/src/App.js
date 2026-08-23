import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";

// User auth
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

// Handyman auth
import HandymanLogin from "./pages/handyman/Login";
import HandymanRegister from "./pages/handyman/Register";

// User pages
import UserDashboard from "./pages/user/Dashboard";
import UserService from "./pages/user/Service";
import UserBooking from "./pages/user/Booking";

// Handyman pages
import HandymanDashboard from "./pages/handyman/Dashboard";

function ProtectedRoute({ children }) {
    const { user } = useAuth();
    return user ? children : <Navigate to="/login" />;
}

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    {/* User auth */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />

                    {/* Handyman auth */}
                    <Route path="/handyman/login" element={<HandymanLogin />} />
                    <Route path="/handyman/register" element={<HandymanRegister />} />

                    {/* User pages */}
                    <Route path="/dashboard" element={
                        <ProtectedRoute><UserDashboard /></ProtectedRoute>
                    } />
                    <Route path="/service" element={
                        <ProtectedRoute><UserService /></ProtectedRoute>
                    } />
                    <Route path="/booking" element={
                        <ProtectedRoute><UserBooking /></ProtectedRoute>
                    } />

                    {/* Handyman pages */}
                    <Route path="/handyman/dashboard" element={
                        <ProtectedRoute><HandymanDashboard /></ProtectedRoute>
                    } />

                    {/* Default */}
                    <Route path="/" element={<Navigate to="/login" />} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;