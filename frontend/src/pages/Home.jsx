function Home() {
    return (
        <div className="max-w-7xl mx-auto px-6 py-16">
            {/* Hero Section */}
            <div className="text-center mb-20">
                <span className="text-primary-600 font-semibold text-lg mb-4 block">
                    Agricultural Market Information System
                </span>
                <h1 className="text-6xl font-bold mb-8 heading-gradient max-w-4xl mx-auto">
                    Empowering Farmers with Real-Time Market Insights
                </h1>
                <p className="text-xl text-light-700 max-w-2xl mx-auto mb-10">
                    Make informed decisions with real-time market data and
                    connect directly with buyers
                </p>
                <div className="flex justify-center gap-4">
                    <button className="btn-primary">Get Started</button>
                    <button className="btn-secondary">Learn More</button>
                </div>
            </div>

            {/* Features Grid */}
            <div className="grid md:grid-cols-2 gap-8 mb-16">
                <div className="card p-8 group">
                    <div className="flex items-start mb-8">
                        <div className="feature-icon">
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
                                    d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                                />
                            </svg>
                        </div>
                        <div className="ml-6">
                            <h2 className="text-2xl font-semibold text-light-900 mb-3">
                                For Farmers
                            </h2>
                            <p className="text-light-700 mb-6">
                                Get real-time market insights and make informed
                                decisions about when and where to sell your
                                produce
                            </p>
                            <ul className="space-y-4">
                                <li className="flex items-center text-light-700 hover:text-primary-600 transition-colors duration-300">
                                    <svg
                                        className="w-5 h-5 text-primary-500 mr-3"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    Live market prices from multiple markets
                                </li>
                                <li className="flex items-center text-light-700 hover:text-primary-600 transition-colors duration-300">
                                    <svg
                                        className="w-5 h-5 text-primary-500 mr-3"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    Historical price trends and analytics
                                </li>
                                <li className="flex items-center text-light-700 hover:text-primary-600 transition-colors duration-300">
                                    <svg
                                        className="w-5 h-5 text-primary-500 mr-3"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    Direct connection with verified traders
                                </li>
                                <li className="flex items-center text-light-700 hover:text-primary-600 transition-colors duration-300">
                                    <svg
                                        className="w-5 h-5 text-primary-500 mr-3"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    Seasonal price pattern insights
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="card p-8 group">
                    <div className="flex items-start mb-8">
                        <div className="feature-icon">
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
                                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                                />
                            </svg>
                        </div>
                        <div className="ml-6">
                            <h2 className="text-2xl font-semibold text-light-900 mb-3">
                                For Traders
                            </h2>
                            <p className="text-light-700 mb-6">
                                Access a wide network of farmers and get
                                detailed market analytics to optimize your
                                trading decisions
                            </p>
                            <ul className="space-y-4">
                                <li className="flex items-center text-light-700 hover:text-primary-600 transition-colors duration-300">
                                    <svg
                                        className="w-5 h-5 text-primary-500 mr-3"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    Comprehensive farmer directory
                                </li>
                                <li className="flex items-center text-light-700 hover:text-primary-600 transition-colors duration-300">
                                    <svg
                                        className="w-5 h-5 text-primary-500 mr-3"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    Market price comparison tools
                                </li>
                                <li className="flex items-center text-light-700 hover:text-primary-600 transition-colors duration-300">
                                    <svg
                                        className="w-5 h-5 text-primary-500 mr-3"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    Advanced market analytics
                                </li>
                                <li className="flex items-center text-light-700 hover:text-primary-600 transition-colors duration-300">
                                    <svg
                                        className="w-5 h-5 text-primary-500 mr-3"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    Supply chain optimization
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-3 gap-8 mb-20">
                <div className="card p-8 text-center">
                    <div className="text-4xl font-bold text-primary-600 mb-2">
                        5000+
                    </div>
                    <div className="text-light-700">Active Farmers</div>
                </div>
                <div className="card p-8 text-center">
                    <div className="text-4xl font-bold text-primary-600 mb-2">
                        200+
                    </div>
                    <div className="text-light-700">Markets Connected</div>
                </div>
                <div className="card p-8 text-center">
                    <div className="text-4xl font-bold text-primary-600 mb-2">
                        ₹10M+
                    </div>
                    <div className="text-light-700">Daily Transactions</div>
                </div>
            </div>
        </div>
    );
}

export default Home;
