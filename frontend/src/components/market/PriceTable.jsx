import { useState } from "react";
import { formatCurrency } from "../../utils/currency";

function PriceTable({ prices, onSort }) {
    const [sortConfig, setSortConfig] = useState({
        key: null,
        direction: "asc",
    });

    const handleSort = (key) => {
        let direction = "asc";
        if (sortConfig.key === key && sortConfig.direction === "asc") {
            direction = "desc";
        }
        setSortConfig({ key, direction });
        onSort(key, direction);
    };

    return (
        <div className="overflow-x-auto">
            <table className="w-full">
                <thead>
                    <tr className="bg-light-200">
                        <th
                            className="px-4 py-3 text-left cursor-pointer hover:bg-light-300"
                            onClick={() => handleSort("commodity")}
                        >
                            Commodity
                            {sortConfig.key === "commodity" && (
                                <span className="ml-1">
                                    {sortConfig.direction === "asc" ? "↑" : "↓"}
                                </span>
                            )}
                        </th>
                        <th
                            className="px-4 py-3 text-left cursor-pointer hover:bg-light-300"
                            onClick={() => handleSort("market")}
                        >
                            Market
                        </th>
                        <th
                            className="px-4 py-3 text-right cursor-pointer hover:bg-light-300"
                            onClick={() => handleSort("price")}
                        >
                            Price (BDT/Quintal)
                        </th>
                        <th className="px-4 py-3 text-right">Last Updated</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-light-300">
                    {prices.map((price) => (
                        <tr
                            key={`${price.commodity_id}-${price.market_id}`}
                            className="hover:bg-light-100"
                        >
                            <td className="px-4 py-3">
                                {price.commodity_name}
                            </td>
                            <td className="px-4 py-3">{price.market_name}</td>
                            <td className="px-4 py-3 text-right font-medium">
                                {formatCurrency(price.price)}
                            </td>
                            <td className="px-4 py-3 text-right text-light-700">
                                {new Date(price.date).toLocaleDateString(
                                    "bn-BD"
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default PriceTable;
