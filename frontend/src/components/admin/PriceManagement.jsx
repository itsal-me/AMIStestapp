import { useState, useEffect } from "react";
import { getAuthHeaders } from "../../utils/api";
import { formatCurrency, formatDate } from "../../utils/formatters";

function PriceManagement() {
    const [prices, setPrices] = useState([]);
    const [commodities, setCommodities] = useState([]);
    const [markets, setMarkets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showAddForm, setShowAddForm] = useState(false);
    const [newPrice, setNewPrice] = useState({
        commodity: "",
        market: "",
        price: "",
    });

    useEffect(() => {
        Promise.all([
            fetch("http://localhost:8000/api/commodities/", {
                headers: getAuthHeaders(),
            }),
            fetch("http://localhost:8000/api/markets/", {
                headers: getAuthHeaders(),
            }),
            fetch("http://localhost:8000/api/prices/", {
                headers: getAuthHeaders(),
            }),
        ])
            .then(async ([commoditiesRes, marketsRes, pricesRes]) => {
                const commoditiesData = await commoditiesRes.json();
                const marketsData = await marketsRes.json();
                const pricesData = await pricesRes.json();

                setCommodities(commoditiesData);
                setMarkets(marketsData);
                setPrices(pricesData);
            })
            .catch((err) => setError("Failed to fetch data"))
            .finally(() => setLoading(false));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            const response = await fetch("http://localhost:8000/api/prices/", {
                method: "POST",
                headers: {
                    ...getAuthHeaders(),
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newPrice),
            });
            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.detail || data.error || "Failed to add price"
                );
            }

            setPrices([...prices, data]);
            setShowAddForm(false);
            setNewPrice({
                commodity: "",
                market: "",
                price: "",
            });
        } catch (err) {
            console.error("Error adding price:", err);
            setError(err.message || "Failed to add price");
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-light-900">
                    Market Prices Management
                </h3>
                <button
                    onClick={() => setShowAddForm(!showAddForm)}
                    className="btn-primary text-sm"
                >
                    {showAddForm ? "Cancel" : "Add New Price"}
                </button>
            </div>

            {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-xl">
                    {error}
                </div>
            )}

            {showAddForm && (
                <form onSubmit={handleSubmit} className="card p-6 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-light-800 font-medium mb-2">
                                Commodity
                            </label>
                            <select
                                className="input-field"
                                value={newPrice.commodity}
                                onChange={(e) =>
                                    setNewPrice({
                                        ...newPrice,
                                        commodity: e.target.value,
                                    })
                                }
                                required
                            >
                                <option value="">Select Commodity</option>
                                {commodities.map((commodity) => (
                                    <option
                                        key={commodity.id}
                                        value={commodity.id}
                                    >
                                        {commodity.name}
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
                                value={newPrice.market}
                                onChange={(e) =>
                                    setNewPrice({
                                        ...newPrice,
                                        market: e.target.value,
                                    })
                                }
                                required
                            >
                                <option value="">Select Market</option>
                                {markets.map((market) => (
                                    <option key={market.id} value={market.id}>
                                        {market.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-light-800 font-medium mb-2">
                                Price (৳/kg)
                            </label>
                            <input
                                type="number"
                                className="input-field"
                                value={newPrice.price}
                                onChange={(e) =>
                                    setNewPrice({
                                        ...newPrice,
                                        price: e.target.value,
                                    })
                                }
                                required
                                step="0.01"
                                min="0"
                            />
                        </div>
                    </div>
                    <button type="submit" className="btn-primary w-full">
                        Add Price
                    </button>
                </form>
            )}

            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="bg-light-200">
                            <th className="px-4 py-3 text-left">Commodity</th>
                            <th className="px-4 py-3 text-left">Market</th>
                            <th className="px-4 py-3 text-right">Price</th>
                            <th className="px-4 py-3 text-right">
                                Last Updated
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-light-300">
                        {prices.map((price) => (
                            <tr
                                key={`${price.commodity}-${price.market}`}
                                className="hover:bg-light-100"
                            >
                                <td className="px-4 py-3">
                                    {price.commodity_name}
                                </td>
                                <td className="px-4 py-3">
                                    {price.market_name}
                                </td>
                                <td className="px-4 py-3 text-right">
                                    {formatCurrency(price.price)}
                                </td>
                                <td className="px-4 py-3 text-right">
                                    {formatDate(price.date)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default PriceManagement;
