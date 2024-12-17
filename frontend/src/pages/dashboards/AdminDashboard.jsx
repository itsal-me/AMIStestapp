import { useState } from "react";
import PriceManagement from "../../components/admin/PriceManagement";
import UserManagement from "../../components/admin/UserManagement";
import MarketSettings from "../../components/admin/MarketSettings";
import CommodityManagement from "../../components/admin/CommodityManagement";
import { useAuth } from "../../context/AuthContext";
import RecommendationManagement from "../../components/admin/RecommendationManagement";

function AdminDashboard() {
    const [activeSection, setActiveSection] = useState(null);
    const { user } = useAuth();

    return (
        <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-light-900 mb-2">
                    Admin Dashboard
                </h1>
                <p className="text-light-700">
                    Welcome back, {user?.username}! Manage your system here.
                </p>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <button
                    className={`card p-6 text-left hover:border-primary-500/30 transition-all duration-300 ${
                        activeSection === "prices"
                            ? "border-primary-500 shadow-lg"
                            : ""
                    }`}
                    onClick={() =>
                        setActiveSection(
                            activeSection === "prices" ? null : "prices"
                        )
                    }
                >
                    <div className="flex items-center mb-4">
                        <div className="feature-icon">
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M9 8h6m-5 0a3 3 0 110 6H9l3 3m-3-6h6m6 1a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                        </div>
                        <span className="ml-3 font-semibold text-light-900">
                            Manage Prices
                        </span>
                    </div>
                    <p className="text-light-700 text-sm">
                        Update market prices and manage commodities
                    </p>
                </button>

                <button
                    className={`card p-6 text-left hover:border-primary-500/30 transition-all duration-300 ${
                        activeSection === "users"
                            ? "border-primary-500 shadow-lg"
                            : ""
                    }`}
                    onClick={() =>
                        setActiveSection(
                            activeSection === "users" ? null : "users"
                        )
                    }
                >
                    <div className="flex items-center mb-4">
                        <div className="feature-icon">
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                                />
                            </svg>
                        </div>
                        <span className="ml-3 font-semibold text-light-900">
                            User Management
                        </span>
                    </div>
                    <p className="text-light-700 text-sm">
                        Manage users and their roles
                    </p>
                </button>

                <button
                    className={`card p-6 text-left hover:border-primary-500/30 transition-all duration-300 ${
                        activeSection === "markets"
                            ? "border-primary-500 shadow-lg"
                            : ""
                    }`}
                    onClick={() =>
                        setActiveSection(
                            activeSection === "markets" ? null : "markets"
                        )
                    }
                >
                    <div className="flex items-center mb-4">
                        <div className="feature-icon">
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                                />
                            </svg>
                        </div>
                        <span className="ml-3 font-semibold text-light-900">
                            Market Settings
                        </span>
                    </div>
                    <p className="text-light-700 text-sm">
                        Configure markets and locations
                    </p>
                </button>

                <button
                    className={`card p-6 text-left hover:border-primary-500/30 transition-all duration-300 ${
                        activeSection === "commodities"
                            ? "border-primary-500 shadow-lg"
                            : ""
                    }`}
                    onClick={() =>
                        setActiveSection(
                            activeSection === "commodities"
                                ? null
                                : "commodities"
                        )
                    }
                >
                    <div className="flex items-center mb-4">
                        <div className="feature-icon">
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                                />
                            </svg>
                        </div>
                        <span className="ml-3 font-semibold text-light-900">
                            Manage Commodities
                        </span>
                    </div>
                    <p className="text-light-700 text-sm">
                        Add and manage commodity types
                    </p>
                </button>

                <button
                    className={`card p-6 text-left hover:border-primary-500/30 transition-all duration-300 ${
                        activeSection === "recommendations"
                            ? "border-primary-500 shadow-lg"
                            : ""
                    }`}
                    onClick={() =>
                        setActiveSection(
                            activeSection === "recommendations"
                                ? null
                                : "recommendations"
                        )
                    }
                >
                    <div className="flex items-center mb-4">
                        <div className="feature-icon">
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
                                />
                            </svg>
                        </div>
                        <span className="ml-3 font-semibold text-light-900">
                            Recommendations
                        </span>
                    </div>
                    <p className="text-light-700 text-sm">
                        Manage recommendations for farmers
                    </p>
                </button>
            </div>

            {/* Active Section Content */}
            {activeSection === "prices" && (
                <div className="card p-6 animate-fadeIn">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold text-light-900">
                            Price Management
                        </h2>
                        <button
                            onClick={() => setActiveSection(null)}
                            className="text-light-700 hover:text-primary-600 transition-colors"
                        >
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>
                    <PriceManagement />
                </div>
            )}

            {activeSection === "users" && (
                <div className="card p-6 animate-fadeIn">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold text-light-900">
                            User Management
                        </h2>
                        <button
                            onClick={() => setActiveSection(null)}
                            className="text-light-700 hover:text-primary-600 transition-colors"
                        >
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>
                    <UserManagement />
                </div>
            )}

            {activeSection === "markets" && (
                <div className="card p-6 animate-fadeIn">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold text-light-900">
                            Market Settings
                        </h2>
                        <button
                            onClick={() => setActiveSection(null)}
                            className="text-light-700 hover:text-primary-600 transition-colors"
                        >
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>
                    <MarketSettings />
                </div>
            )}

            {activeSection === "commodities" && (
                <div className="card p-6 animate-fadeIn">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold text-light-900">
                            Commodity Management
                        </h2>
                        <button
                            onClick={() => setActiveSection(null)}
                            className="text-light-700 hover:text-primary-600 transition-colors"
                        >
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>
                    <CommodityManagement />
                </div>
            )}

            {activeSection === "recommendations" && (
                <div className="card p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold text-light-900">
                            Manage Recommendations
                        </h2>
                        <button
                            onClick={() => setActiveSection(null)}
                            className="text-light-600 hover:text-light-900"
                        >
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>
                    <RecommendationManagement />
                </div>
            )}

            {/* System Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="card p-6">
                    <h2 className="text-xl font-semibold text-light-900 mb-4">
                        System Statistics
                    </h2>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-light-100 p-4 rounded-xl">
                            <div className="text-2xl font-bold text-primary-600">
                                156
                            </div>
                            <div className="text-light-700">Active Users</div>
                        </div>
                        <div className="bg-light-100 p-4 rounded-xl">
                            <div className="text-2xl font-bold text-primary-600">
                                23
                            </div>
                            <div className="text-light-700">Markets</div>
                        </div>
                        <div className="bg-light-100 p-4 rounded-xl">
                            <div className="text-2xl font-bold text-primary-600">
                                89
                            </div>
                            <div className="text-light-700">Daily Updates</div>
                        </div>
                        <div className="bg-light-100 p-4 rounded-xl">
                            <div className="text-2xl font-bold text-primary-600">
                                45
                            </div>
                            <div className="text-light-700">Commodities</div>
                        </div>
                    </div>
                </div>

                <div className="card p-6">
                    <h2 className="text-xl font-semibold text-light-900 mb-4">
                        Recent Activity
                    </h2>
                    <div className="space-y-4">
                        <div className="flex items-center text-light-700">
                            <div className="w-2 h-2 bg-primary-500 rounded-full mr-3"></div>
                            <p>New market prices updated for Rice</p>
                        </div>
                        <div className="flex items-center text-light-700">
                            <div className="w-2 h-2 bg-primary-500 rounded-full mr-3"></div>
                            <p>5 new users registered today</p>
                        </div>
                        <div className="flex items-center text-light-700">
                            <div className="w-2 h-2 bg-primary-500 rounded-full mr-3"></div>
                            <p>System maintenance scheduled</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;
