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

    useEffect(() => {
        fetchPrices();
    }, []);

    const fetchPrices = async () => {
        try {
            const response = await fetch("http://localhost:8000/api/prices/", {
                headers: getAuthHeaders(),
            });
            const data = await response.json();
            if (response.ok) {
                setPrices(data);
            } else {
                setError(data.error);
            }
        } catch (err) {
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
            return direction === "asc"
                ? a[`${key}_name`].localeCompare(b[`${key}_name`])
                : b[`${key}_name`].localeCompare(a[`${key}_name`]);
        });
        setPrices(sortedPrices);
    };

    const filteredPrices = prices.filter((price) => {
        return (
            price.commodity_name
                .toLowerCase()
                .includes(filters.commodity.toLowerCase()) &&
            price.market_name
                .toLowerCase()
                .includes(filters.market.toLowerCase())
        );
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
            <div className="flex gap-4">
                <div className="flex-1">
                    <input
                        type="text"
                        placeholder="Search commodity..."
                        className="input-field"
                        value={filters.commodity}
                        onChange={(e) =>
                            setFilters((prev) => ({
                                ...prev,
                                commodity: e.target.value,
                            }))
                        }
                    />
                </div>
                <div className="flex-1">
                    <input
                        type="text"
                        placeholder="Search market..."
                        className="input-field"
                        value={filters.market}
                        onChange={(e) =>
                            setFilters((prev) => ({
                                ...prev,
                                market: e.target.value,
                            }))
                        }
                    />
                </div>
            </div>

            <PriceTable prices={filteredPrices} onSort={handleSort} />

            <div className="text-center text-light-700 text-sm">
                Last updated: {new Date().toLocaleString()}
            </div>
        </div>
    );
}

export default MarketPrices;
