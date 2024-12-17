import { Link } from "react-router-dom";

function Home() {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Hero Section */}
            <div className="text-center py-16 sm:py-20">
                <h1 className="text-4xl font-bold text-light-900 sm:text-5xl md:text-6xl">
                    Welcome to AgriConnect
                </h1>
                <p className="mt-6 text-xl text-light-700 max-w-3xl mx-auto">
                    Bridging the gap between farmers and traders. Empowering
                    agricultural commerce through technology.
                </p>
                <div className="mt-10 flex justify-center gap-4">
                    <Link to="/login" className="btn-primary">
                        Get Started
                    </Link>
                    <Link to="/register" className="btn-secondary">
                        Create Account
                    </Link>
                </div>
            </div>

            {/* About Section */}
            <div className="py-12">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-light-900">
                        Why AgriConnect?
                    </h2>
                    <p className="mt-4 text-lg text-light-700">
                        We're revolutionizing agricultural trade by creating a
                        direct connection between farmers and traders
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="card p-6">
                        <h3 className="text-xl font-semibold text-light-900 mb-4">
                            For Farmers
                        </h3>
                        <ul className="space-y-3 text-light-700">
                            <li className="flex items-start">
                                <svg
                                    className="w-6 h-6 text-green-500 mr-2 flex-shrink-0"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M5 13l4 4L19 7"
                                    />
                                </svg>
                                <span>
                                    Direct access to traders - no middlemen
                                    involved
                                </span>
                            </li>
                            <li className="flex items-start">
                                <svg
                                    className="w-6 h-6 text-green-500 mr-2 flex-shrink-0"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M5 13l4 4L19 7"
                                    />
                                </svg>
                                <span>
                                    List your products and set your own prices
                                </span>
                            </li>
                            <li className="flex items-start">
                                <svg
                                    className="w-6 h-6 text-green-500 mr-2 flex-shrink-0"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M5 13l4 4L19 7"
                                    />
                                </svg>
                                <span>
                                    Access real-time market prices to make
                                    informed decisions
                                </span>
                            </li>
                        </ul>
                    </div>

                    <div className="card p-6">
                        <h3 className="text-xl font-semibold text-light-900 mb-4">
                            For Traders
                        </h3>
                        <ul className="space-y-3 text-light-700">
                            <li className="flex items-start">
                                <svg
                                    className="w-6 h-6 text-green-500 mr-2 flex-shrink-0"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M5 13l4 4L19 7"
                                    />
                                </svg>
                                <span>
                                    Find and connect with verified farmers
                                    directly
                                </span>
                            </li>
                            <li className="flex items-start">
                                <svg
                                    className="w-6 h-6 text-green-500 mr-2 flex-shrink-0"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M5 13l4 4L19 7"
                                    />
                                </svg>
                                <span>
                                    Browse a wide variety of agricultural
                                    products
                                </span>
                            </li>
                            <li className="flex items-start">
                                <svg
                                    className="w-6 h-6 text-green-500 mr-2 flex-shrink-0"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M5 13l4 4L19 7"
                                    />
                                </svg>
                                <span>
                                    Make secure transactions with trusted
                                    sellers
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="py-12 border-t border-light-200">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-light-900">
                        Key Features
                    </h2>
                    <p className="mt-4 text-lg text-light-700">
                        Everything you need to streamline agricultural trade
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="card p-6">
                        <div className="text-primary-600 mb-4">
                            <svg
                                className="w-8 h-8"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                                />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-light-900 mb-2">
                            Secure Transactions
                        </h3>
                        <p className="text-light-700">
                            Safe and transparent trading platform with verified
                            users and secure payment options
                        </p>
                    </div>

                    <div className="card p-6">
                        <div className="text-primary-600 mb-4">
                            <svg
                                className="w-8 h-8"
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
                        <h3 className="text-xl font-semibold text-light-900 mb-2">
                            Product Management
                        </h3>
                        <p className="text-light-700">
                            Easy-to-use tools for listing, managing, and
                            tracking agricultural products
                        </p>
                    </div>

                    <div className="card p-6">
                        <div className="text-primary-600 mb-4">
                            <svg
                                className="w-8 h-8"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-light-900 mb-2">
                            Real-time Updates
                        </h3>
                        <p className="text-light-700">
                            Stay informed with live market prices and product
                            availability updates
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
