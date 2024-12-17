import { useState, useEffect } from "react";
import { getAuthHeaders } from "../../utils/api";
import { formatCurrency, formatDate } from "../../utils/formatters";

function MarketPrices() {
    const [prices, setPrices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchPrices();
    }, []);

    const fetchPrices = async () => {
        try {
            const response = await fetch("http://localhost:8000/api/prices/", {
                headers: getAuthHeaders(),
            });
            if (!response.ok) throw new Error("Failed to fetch prices");
            const data = await response.json();
            setPrices(data);
        } catch (err) {
            setError("Failed to fetch prices");
            console.error(err);
        } finally {
            setLoading(false);
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
        <div className="overflow-x-auto">
            <table className="w-full">
                <thead>
                    <tr className="bg-light-200">
                        <th className="px-4 py-3 text-left">Commodity</th>
                        <th className="px-4 py-3 text-left">Market</th>
                        <th className="px-4 py-3 text-right">Price</th>
                        <th className="px-4 py-3 text-right">Date</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-light-300">
                    {prices.map((price) => (
                        <tr key={price.id} className="hover:bg-light-100">
                            <td className="px-4 py-3">
                                {price.commodity_name}
                            </td>
                            <td className="px-4 py-3">{price.market_name}</td>
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
    );
}

export default MarketPrices;
