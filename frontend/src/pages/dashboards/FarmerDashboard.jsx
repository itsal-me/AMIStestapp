import { useState } from "react";
import MarketPrices from "../../components/market/MarketPrices";
import PriceTrends from "../../components/market/PriceTrends";
import BuyerDirectory from "../../components/directory/BuyerDirectory";
import { formatCurrency, formatDate } from "../../utils/formatters";
import ProductListings from "../../components/listings/ProductListings";

function FarmerDashboard() {
    const [activeSection, setActiveSection] = useState(null);

    // Sample data - you can replace with real data later
    const recentActivities = [
        {
            id: 1,
            action: "Listed",
            quantity: "50",
            commodity: "Rice",
            price: 4500,
            date: new Date(),
        },
        {
            id: 2,
            action: "Price updated in Market B",
            date: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
        },
        {
            id: 3,
            action: "Trader John viewed your listing",
            date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
        },
    ];

    return (
        <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-light-900 mb-2">
                    Farmer Dashboard
                </h1>
                <p className="text-light-700">
                    Welcome back! Here's your farming overview.
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
                                    d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
                                />
                            </svg>
                        </div>
                        <span className="ml-3 font-semibold text-light-900">
                            Check Prices
                        </span>
                    </div>
                    <p className="text-light-700 text-sm">
                        View current market prices and trends
                    </p>
                </button>

                <button
                    className={`card p-6 text-left hover:border-primary-500/30 transition-all duration-300 ${
                        activeSection === "buyers"
                            ? "border-primary-500 shadow-lg"
                            : ""
                    }`}
                    onClick={() =>
                        setActiveSection(
                            activeSection === "buyers" ? null : "buyers"
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
                                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                />
                            </svg>
                        </div>
                        <span className="ml-3 font-semibold text-light-900">
                            Find Buyers
                        </span>
                    </div>
                    <p className="text-light-700 text-sm">
                        Connect with verified traders
                    </p>
                </button>

                <button
                    className={`card p-6 text-left hover:border-primary-500/30 transition-all duration-300 ${
                        activeSection === "listings"
                            ? "border-primary-500 shadow-lg"
                            : ""
                    }`}
                    onClick={() =>
                        setActiveSection(
                            activeSection === "listings" ? null : "listings"
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
                                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                                />
                            </svg>
                        </div>
                        <span className="ml-3 font-semibold text-light-900">
                            My Product Listings
                        </span>
                    </div>
                    <p className="text-light-700 text-sm">
                        Manage your product listings
                    </p>
                </button>
            </div>

            {/* Dynamic Content Section */}
            {activeSection === "prices" && (
                <div className="card p-6 animate-fadeIn">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold text-light-900">
                            Current Market Prices
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
                    <MarketPrices />
                </div>
            )}

            {activeSection === "buyers" && (
                <div className="card p-6 animate-fadeIn">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold text-light-900">
                            Buyer Directory
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
                    <BuyerDirectory />
                </div>
            )}

            {activeSection === "listings" && (
                <div className="card p-6 animate-fadeIn">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold text-light-900">
                            My Product Listings
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
                    <ProductListings />
                </div>
            )}

            {/* Market Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="card p-6">
                    <h2 className="text-xl font-semibold text-light-900 mb-4">
                        Price Trends
                    </h2>
                    <PriceTrends />
                </div>

                <div className="card p-6">
                    <h2 className="text-xl font-semibold text-light-900 mb-4">
                        Recent Activity
                    </h2>
                    <div className="space-y-4">
                        {recentActivities.map((activity) => (
                            <div
                                key={activity.id}
                                className="flex items-center justify-between text-light-700"
                            >
                                <div className="flex items-center">
                                    <div className="w-2 h-2 bg-primary-500 rounded-full mr-3"></div>
                                    <p>
                                        {activity.quantity && activity.commodity
                                            ? `${activity.action} ${
                                                  activity.quantity
                                              }kg ${
                                                  activity.commodity
                                              } at ${formatCurrency(
                                                  activity.price
                                              )}`
                                            : activity.action}
                                    </p>
                                </div>
                                <span className="text-sm text-light-600">
                                    {formatDate(activity.date)}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FarmerDashboard;
