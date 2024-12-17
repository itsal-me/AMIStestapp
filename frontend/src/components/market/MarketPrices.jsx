import { useState, useEffect } from "react";
import { getAuthHeaders } from "../../utils/api";
import PriceTable from "./PriceTable";

function MarketPrices() {
    const [prices, setPrices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filters, setFilters] = useState({
        commodity: "",
        market: "",
    });
    const [uniqueCommodities, setUniqueCommodities] = useState([]);
    const [uniqueMarkets, setUniqueMarkets] = useState([]);

    useEffect(() => {
        fetchPrices();
    }, []);

    useEffect(() => {
        if (prices.length > 0) {
            // Extract unique commodities and markets
            const commodities = [
                ...new Set(prices.map((p) => p.commodity_name)),
            ];
            const markets = [...new Set(prices.map((p) => p.market_name))];
            setUniqueCommodities(commodities);
            setUniqueMarkets(markets);
        }
    }, [prices]);

    const fetchPrices = async () => {
        try {
            const response = await fetch("http://localhost:8000/api/prices/", {
                headers: getAuthHeaders(),
            });
            if (!response.ok) {
                throw new Error("Failed to fetch prices");
            }
            const data = await response.json();
            console.log("Fetched prices:", data); // For debugging
            setPrices(data);
        } catch (err) {
            console.error("Error fetching prices:", err);
            setError("Failed to fetch prices");
        } finally {
            setLoading(false);
        }
    };

    const handleSort = (key, direction) => {
        const sortedPrices = [...prices].sort((a, b) => {
            if (key === "price") {
                return direction === "asc" ? a[key] - b[key] : b[key] - a[key];
            }
            const aValue =
                key === "commodity" ? a.commodity_name : a.market_name;
            const bValue =
                key === "commodity" ? b.commodity_name : b.market_name;
            return direction === "asc"
                ? aValue.localeCompare(bValue)
                : bValue.localeCompare(aValue);
        });
        setPrices(sortedPrices);
    };

    const filteredPrices = prices.filter((price) => {
        const matchesCommodity = price.commodity_name
            .toLowerCase()
            .includes(filters.commodity.toLowerCase());
        const matchesMarket = price.market_name
            .toLowerCase()
            .includes(filters.market.toLowerCase());
        return matchesCommodity && matchesMarket;
    });

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-red-600 text-center py-4">
                {error}
                <button
                    onClick={fetchPrices}
                    className="ml-4 text-primary-600 hover:text-primary-700"
                >
                    Try Again
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-light-800 font-medium mb-2">
                        Commodity
                    </label>
                    <select
                        className="input-field"
                        value={filters.commodity}
                        onChange={(e) =>
                            setFilters((prev) => ({
                                ...prev,
                                commodity: e.target.value,
                            }))
                        }
                    >
                        <option value="">All Commodities</option>
                        {uniqueCommodities.map((commodity) => (
                            <option key={commodity} value={commodity}>
                                {commodity}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block text-light-800 font-medium mb-2">
                        Market
                    </label>
                    <select
                        className="input-field"
                        value={filters.market}
                        onChange={(e) =>
                            setFilters((prev) => ({
                                ...prev,
                                market: e.target.value,
                            }))
                        }
                    >
                        <option value="">All Markets</option>
                        {uniqueMarkets.map((market) => (
                            <option key={market} value={market}>
                                {market}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {filteredPrices.length > 0 ? (
                <>
                    <PriceTable prices={filteredPrices} onSort={handleSort} />
                    <div className="text-center text-light-700 text-sm">
                        Last updated: {new Date().toLocaleString("bn-BD")}
                    </div>
                </>
            ) : (
                <div className="text-center text-light-700 py-8">
                    No prices found for the selected filters.
                </div>
            )}
        </div>
    );
}

export default MarketPrices;
