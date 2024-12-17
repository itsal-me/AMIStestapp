import { useState, useEffect } from "react";
import { getAuthHeaders } from "../../utils/api";
import {
    formatCurrency,
    formatNumber,
    formatDate,
} from "../../utils/formatters";

function Listings() {
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchListings();
    }, []);

    const fetchListings = async () => {
        try {
            const response = await fetch(
                "http://localhost:8000/api/listings/",
                {
                    headers: getAuthHeaders(),
                }
            );
            if (!response.ok) throw new Error("Failed to fetch listings");
            const data = await response.json();
            setListings(data);
        } catch (err) {
            setError("Failed to fetch listings");
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
        <div className="space-y-6">
            {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-xl">
                    {error}
                </div>
            )}
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="bg-light-200">
                            <th className="px-4 py-3 text-left">Commodity</th>
                            <th className="px-4 py-3 text-right">Quantity</th>
                            <th className="px-4 py-3 text-right">Unit Price</th>
                            <th className="px-4 py-3 text-right">
                                Total Value
                            </th>
                            <th className="px-4 py-3 text-right">Date</th>
                            <th className="px-4 py-3 text-center">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-light-300">
                        {listings.map((listing) => (
                            <tr key={listing.id} className="hover:bg-light-100">
                                <td className="px-4 py-3">
                                    {listing.commodity}
                                </td>
                                <td className="px-4 py-3 text-right">
                                    {formatNumber(listing.quantity)}
                                </td>
                                <td className="px-4 py-3 text-right">
                                    {formatCurrency(listing.price)}
                                </td>
                                <td className="px-4 py-3 text-right">
                                    {formatCurrency(
                                        listing.price * listing.quantity
                                    )}
                                </td>
                                <td className="px-4 py-3 text-right">
                                    {formatDate(listing.created_at)}
                                </td>
                                <td className="px-4 py-3 text-center">
                                    <span
                                        className={`px-2 py-1 rounded-full text-xs ${
                                            listing.status === "ACTIVE"
                                                ? "bg-green-100 text-green-800"
                                                : listing.status === "PENDING"
                                                ? "bg-yellow-100 text-yellow-800"
                                                : "bg-red-100 text-red-800"
                                        }`}
                                    >
                                        {listing.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Listings;
