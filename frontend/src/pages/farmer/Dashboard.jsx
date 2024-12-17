import { useState } from "react";
import CheckPrices from "../../components/farmer/CheckPrices";
import AddProduct from "../../components/farmer/AddProduct";
import Listings from "../../components/farmer/Listings";

function FarmerDashboard() {
    const [activeTab, setActiveTab] = useState("prices");

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-light-900">
                        Farmer Dashboard
                    </h1>
                    <p className="text-light-700 mt-1">
                        Manage your products and monitor market prices
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div
                    className={`card p-6 cursor-pointer transition-all ${
                        activeTab === "listings"
                            ? "ring-2 ring-primary-500"
                            : "hover:shadow-lg"
                    }`}
                    onClick={() => setActiveTab("listings")}
                >
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-light-900">
                            My Listings
                        </h3>
                        <span className="text-primary-600">
                            <svg
                                className="w-6 h-6"
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
                        </span>
                    </div>
                    <p className="text-light-700 mt-2">
                        View and manage your product listings
                    </p>
                </div>

                <div
                    className={`card p-6 cursor-pointer transition-all ${
                        activeTab === "add"
                            ? "ring-2 ring-primary-500"
                            : "hover:shadow-lg"
                    }`}
                    onClick={() => setActiveTab("add")}
                >
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-light-900">
                            Add Product
                        </h3>
                        <span className="text-primary-600">
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M12 4v16m8-8H4"
                                />
                            </svg>
                        </span>
                    </div>
                    <p className="text-light-700 mt-2">
                        List a new product for sale
                    </p>
                </div>

                <div
                    className={`card p-6 cursor-pointer transition-all ${
                        activeTab === "prices"
                            ? "ring-2 ring-primary-500"
                            : "hover:shadow-lg"
                    }`}
                    onClick={() => setActiveTab("prices")}
                >
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-light-900">
                            Market Prices
                        </h3>
                        <span className="text-primary-600">
                            <svg
                                className="w-6 h-6"
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
                        </span>
                    </div>
                    <p className="text-light-700 mt-2">
                        Check current market prices
                    </p>
                </div>
            </div>

            <div className="card">
                <div className="p-6 border-b border-light-300">
                    <h2 className="text-xl font-semibold text-light-900">
                        {activeTab === "prices" && "Market Prices"}
                        {activeTab === "add" && "Add New Product"}
                        {activeTab === "listings" && "My Listings"}
                    </h2>
                </div>
                <div>
                    {activeTab === "prices" && <CheckPrices />}
                    {activeTab === "add" && <AddProduct />}
                    {activeTab === "listings" && <Listings />}
                </div>
            </div>
        </div>
    );
}

export default FarmerDashboard;
