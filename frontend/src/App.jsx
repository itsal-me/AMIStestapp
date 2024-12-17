import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MarketPrices from "./pages/MarketPrices";
import FarmerDashboard from "./pages/dashboards/FarmerDashboard";
import TraderDashboard from "./pages/dashboards/TraderDashboard";
import Directory from "./pages/Directory";
import Analytics from "./pages/Analytics";
import PriceManagement from "./components/admin/PriceManagement";
import AdminDashboard from "./pages/dashboards/AdminDashboard";

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <div className="min-h-screen flex flex-col">
                    <Navbar />
                    <main className="flex-grow container mx-auto px-4 py-8">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route
                                path="/market-prices"
                                element={<MarketPrices />}
                            />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route
                                path="/farmer/dashboard"
                                element={
                                    <ProtectedRoute userType="FARMER">
                                        <FarmerDashboard />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/trader/dashboard"
                                element={
                                    <ProtectedRoute allowedRoles={["TRADER"]}>
                                        <TraderDashboard />
                                    </ProtectedRoute>
                                }
                            />
                            <Route path="/directory" element={<Directory />} />
                            <Route path="/analytics" element={<Analytics />} />
                            <Route
                                path="/admin/prices"
                                element={
                                    <ProtectedRoute allowedRoles={["ADMIN"]}>
                                        <PriceManagement />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/admin/dashboard"
                                element={
                                    <ProtectedRoute allowedRoles={["ADMIN"]}>
                                        <AdminDashboard />
                                    </ProtectedRoute>
                                }
                            />
                        </Routes>
                    </main>
                    <Footer />
                </div>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;
