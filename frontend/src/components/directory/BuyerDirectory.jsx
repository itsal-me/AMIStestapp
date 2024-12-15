import { useState, useEffect } from "react";
import { getAuthHeaders } from "../../utils/api";

function BuyerDirectory() {
    const [buyers, setBuyers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filters, setFilters] = useState({
        search: "",
        businessType: "all",
    });

    useEffect(() => {
        fetchBuyers();
    }, []);

    const fetchBuyers = async () => {
        try {
            const response = await fetch("http://localhost:8000/api/buyers/", {
                headers: getAuthHeaders(),
            });
            const data = await response.json();
            if (response.ok) {
                setBuyers(data);
            } else {
                setError(data.error);
            }
        } catch (err) {
            setError("Failed to fetch buyers");
        } finally {
            setLoading(false);
        }
    };

    const filteredBuyers = buyers.filter((buyer) => {
        const matchesSearch =
            buyer.username
                .toLowerCase()
                .includes(filters.search.toLowerCase()) ||
            buyer.business_type
                .toLowerCase()
                .includes(filters.search.toLowerCase()) ||
            buyer.primary_commodities
                .toLowerCase()
                .includes(filters.search.toLowerCase());

        const matchesType =
            filters.businessType === "all" ||
            buyer.business_type === filters.businessType;

        return matchesSearch && matchesType;
    });

    if (loading)
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
            </div>
        );

    if (error)
        return <div className="text-red-600 text-center py-4">{error}</div>;

    return (
        <div className="space-y-6">
            {/* Filters */}
            <div className="flex gap-4">
                <div className="flex-1">
                    <input
                        type="text"
                        placeholder="Search buyers..."
                        className="input-field"
                        value={filters.search}
                        onChange={(e) =>
                            setFilters((prev) => ({
                                ...prev,
                                search: e.target.value,
                            }))
                        }
                    />
                </div>
                <div className="w-48">
                    <select
                        className="input-field"
                        value={filters.businessType}
                        onChange={(e) =>
                            setFilters((prev) => ({
                                ...prev,
                                businessType: e.target.value,
                            }))
                        }
                    >
                        <option value="all">All Types</option>
                        <option value="TRADER">Trader</option>
                        <option value="WHOLESALER">Wholesaler</option>
                        <option value="RETAILER">Retailer</option>
                    </select>
                </div>
            </div>

            {/* Buyers Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBuyers.map((buyer) => (
                    <div key={buyer.id} className="card p-6 space-y-4">
                        <div className="flex items-start justify-between">
                            <div>
                                <h3 className="text-lg font-semibold text-light-900">
                                    {buyer.username}
                                </h3>
                                <p className="text-primary-600 text-sm">
                                    {buyer.business_type}
                                </p>
                            </div>
                            <button className="text-primary-600 hover:text-primary-700">
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
                                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                                    />
                                </svg>
                            </button>
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center text-light-700">
                                <svg
                                    className="w-5 h-5 mr-2"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                                    />
                                </svg>
                                <span>
                                    Deals in: {buyer.primary_commodities}
                                </span>
                            </div>
                            <div className="flex items-center text-light-700">
                                <svg
                                    className="w-5 h-5 mr-2"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                </svg>
                                <span>{buyer.location}</span>
                            </div>
                        </div>

                        <button className="w-full btn-primary text-sm">
                            Contact Buyer
                        </button>
                    </div>
                ))}
            </div>

            {filteredBuyers.length === 0 && (
                <div className="text-center text-light-700 py-8">
                    No buyers found matching your criteria
                </div>
            )}
        </div>
    );
}

export default BuyerDirectory;
