function FarmerDashboard() {
    return (
        <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-light-900 mb-2">
                    Farmer Dashboard
                </h1>
                <p className="text-light-700">
                    Welcome back! Here's your market overview.
                </p>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <button className="card p-6 text-left hover:border-primary-500/30">
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

                <button className="card p-6 text-left hover:border-primary-500/30">
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

                <button className="card p-6 text-left hover:border-primary-500/30">
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
                            My Listings
                        </span>
                    </div>
                    <p className="text-light-700 text-sm">
                        Manage your product listings
                    </p>
                </button>
            </div>

            {/* Market Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="card p-6">
                    <h2 className="text-xl font-semibold text-light-900 mb-4">
                        Price Trends
                    </h2>
                    <div className="h-64 flex items-center justify-center text-light-700">
                        Price chart will be implemented here
                    </div>
                </div>

                <div className="card p-6">
                    <h2 className="text-xl font-semibold text-light-900 mb-4">
                        Recent Activity
                    </h2>
                    <div className="space-y-4">
                        <div className="flex items-center text-light-700">
                            <div className="w-2 h-2 bg-primary-500 rounded-full mr-3"></div>
                            <p>Market price for Rice increased by 5%</p>
                        </div>
                        <div className="flex items-center text-light-700">
                            <div className="w-2 h-2 bg-primary-500 rounded-full mr-3"></div>
                            <p>New buyer interested in your wheat listing</p>
                        </div>
                        <div className="flex items-center text-light-700">
                            <div className="w-2 h-2 bg-primary-500 rounded-full mr-3"></div>
                            <p>Price alert: Corn prices are trending up</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FarmerDashboard;
