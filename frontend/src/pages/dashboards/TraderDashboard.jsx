import { formatCurrency } from "../../utils/currency";

function TraderDashboard() {
    return (
        <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-light-900 mb-2">
                    Trader Dashboard
                </h1>
                <p className="text-light-700">
                    Welcome back! Here's your trading overview.
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
                                    d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                                />
                            </svg>
                        </div>
                        <span className="ml-3 font-semibold text-light-900">
                            Market Analysis
                        </span>
                    </div>
                    <p className="text-light-700 text-sm">
                        View detailed market analytics
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
                                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                                />
                            </svg>
                        </div>
                        <span className="ml-3 font-semibold text-light-900">
                            Find Farmers
                        </span>
                    </div>
                    <p className="text-light-700 text-sm">
                        Browse farmer listings
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
                            My Orders
                        </span>
                    </div>
                    <p className="text-light-700 text-sm">Manage your orders</p>
                </button>
            </div>

            {/* Trading Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="card p-6">
                    <h2 className="text-xl font-semibold text-light-900 mb-4">
                        Market Overview
                    </h2>
                    <div className="h-64 flex items-center justify-center text-light-700">
                        Market overview chart will be implemented here
                    </div>
                </div>

                <div className="card p-6">
                    <h2 className="text-xl font-semibold text-light-900 mb-4">
                        Recent Transactions
                    </h2>
                    <div className="space-y-4">
                        <div className="flex items-center text-light-700">
                            <div className="w-2 h-2 bg-primary-500 rounded-full mr-3"></div>
                            <p>
                                Purchased 100kg Rice at {formatCurrency(5000)}
                            </p>
                        </div>
                        <div className="flex items-center text-light-700">
                            <div className="w-2 h-2 bg-primary-500 rounded-full mr-3"></div>
                            <p>New supply available in Market A</p>
                        </div>
                        <div className="flex items-center text-light-700">
                            <div className="w-2 h-2 bg-primary-500 rounded-full mr-3"></div>
                            <p>Price negotiation completed with Farmer Mike</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TraderDashboard;
