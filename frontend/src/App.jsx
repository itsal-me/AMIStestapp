import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MarketPrices from "./pages/MarketPrices";
import Directory from "./pages/Directory";
import Analytics from "./pages/Analytics";
import FarmerDashboard from "./pages/dashboards/FarmerDashboard";
import TraderDashboard from "./pages/dashboards/TraderDashboard";

function App() {
    return (
        <Router>
            <div className="min-h-screen flex flex-col">
                <Navbar />
                <main className="flex-grow container mx-auto px-4 py-8">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route
                            path="/farmer/dashboard"
                            element={
                                <ProtectedRoute allowedRoles={["FARMER"]}>
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
                        <Route
                            path="/market-prices"
                            element={<MarketPrices />}
                        />
                        <Route path="/directory" element={<Directory />} />
                        <Route path="/analytics" element={<Analytics />} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
