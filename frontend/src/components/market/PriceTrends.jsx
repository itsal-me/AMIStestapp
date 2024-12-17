import { useState, useEffect } from "react";
import { getAuthHeaders } from "../../utils/api";
import { formatCurrency, formatDate } from "../../utils/formatters";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

function PriceTrends() {
    const [trends, setTrends] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCommodity, setSelectedCommodity] = useState("all");
    const [commodities, setCommodities] = useState([]);

    useEffect(() => {
        fetchTrends();
        fetchCommodities();
    }, [selectedCommodity]);

    const fetchCommodities = async () => {
        try {
            const response = await fetch(
                "http://localhost:8000/api/commodities/",
                {
                    headers: getAuthHeaders(),
                }
            );
            if (!response.ok) throw new Error("Failed to fetch commodities");
            const data = await response.json();
            setCommodities(data);
        } catch (err) {
            console.error(err);
        }
    };

    const fetchTrends = async () => {
        try {
            const url =
                selectedCommodity === "all"
                    ? "http://localhost:8000/api/prices/trends/"
                    : `http://localhost:8000/api/prices/${selectedCommodity}/commodity-trends/`;

            const response = await fetch(url, {
                headers: getAuthHeaders(),
            });
            if (!response.ok) throw new Error("Failed to fetch price trends");
            const data = await response.json();

            // Format data for the chart
            const formattedData = data.map((item) => ({
                ...item,
                date: formatDate(item.date),
                price: parseFloat(item.price),
                ...(item.commodity && {
                    [item.commodity]: parseFloat(item.price),
                }),
            }));

            setTrends(formattedData);
        } catch (err) {
            setError("Failed to fetch price trends");
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

    if (error) {
        return <div className="text-red-600 text-center py-4">{error}</div>;
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <select
                    value={selectedCommodity}
                    onChange={(e) => setSelectedCommodity(e.target.value)}
                    className="input-field w-48"
                >
                    <option value="all">All Commodities</option>
                    {commodities.map((commodity) => (
                        <option key={commodity.id} value={commodity.id}>
                            {commodity.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        data={trends}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                            dataKey="date"
                            tick={{ fontSize: 12 }}
                            interval="preserveStartEnd"
                        />
                        <YAxis
                            tick={{ fontSize: 12 }}
                            tickFormatter={(value) => formatCurrency(value)}
                        />
                        <Tooltip
                            formatter={(value) => formatCurrency(value)}
                            labelFormatter={(label) => `Date: ${label}`}
                        />
                        <Legend />
                        {selectedCommodity === "all" ? (
                            commodities.map((commodity) => (
                                <Line
                                    key={commodity.id}
                                    type="monotone"
                                    dataKey={commodity.name}
                                    stroke={`#${Math.floor(
                                        Math.random() * 16777215
                                    ).toString(16)}`}
                                    dot={false}
                                />
                            ))
                        ) : (
                            <Line
                                type="monotone"
                                dataKey="price"
                                stroke="#4f46e5"
                                dot={false}
                            />
                        )}
                    </LineChart>
                </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="card p-4">
                    <h4 className="text-sm font-medium text-light-700 mb-2">
                        Average Price
                    </h4>
                    <p className="text-xl font-semibold text-light-900">
                        {formatCurrency(
                            trends.reduce((acc, curr) => acc + curr.price, 0) /
                                trends.length
                        )}
                    </p>
                </div>
                <div className="card p-4">
                    <h4 className="text-sm font-medium text-light-700 mb-2">
                        Highest Price
                    </h4>
                    <p className="text-xl font-semibold text-light-900">
                        {formatCurrency(
                            Math.max(...trends.map((t) => t.price))
                        )}
                    </p>
                </div>
                <div className="card p-4">
                    <h4 className="text-sm font-medium text-light-700 mb-2">
                        Lowest Price
                    </h4>
                    <p className="text-xl font-semibold text-light-900">
                        {formatCurrency(
                            Math.min(...trends.map((t) => t.price))
                        )}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default PriceTrends;
