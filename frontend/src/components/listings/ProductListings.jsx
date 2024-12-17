import { useState, useEffect } from "react";
import { getAuthHeaders } from "../../utils/api";
import {
    formatCurrency,
    formatNumber,
    formatDate,
} from "../../utils/formatters";
import AddProduct from "./AddProduct";
import DeleteAlert from "../common/DeleteAlert";

function ProductListings() {
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showAddForm, setShowAddForm] = useState(false);
    const [editingListing, setEditingListing] = useState(null);
    const [deleteAlert, setDeleteAlert] = useState({
        isOpen: false,
        listingId: null,
        commodity: "",
    });

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

    const handleDeleteClick = (listing) => {
        setDeleteAlert({
            isOpen: true,
            listingId: listing.id,
            commodity: listing.commodity,
        });
    };

    const handleDeleteConfirm = async () => {
        try {
            const response = await fetch(
                `http://localhost:8000/api/listings/${deleteAlert.listingId}/`,
                {
                    method: "DELETE",
                    headers: getAuthHeaders(),
                }
            );
            if (!response.ok) throw new Error("Failed to delete listing");
            setListings(
                listings.filter(
                    (listing) => listing.id !== deleteAlert.listingId
                )
            );
            setDeleteAlert({ isOpen: false, listingId: null, commodity: "" });
        } catch (err) {
            setError("Failed to delete listing");
            console.error(err);
        }
    };

    const handleEdit = async (listing) => {
        setEditingListing(listing);
        setShowAddForm(true);
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
                <h2 className="text-xl font-semibold text-light-900">
                    My Listings
                </h2>
                <button
                    onClick={() => setShowAddForm(!showAddForm)}
                    className="btn-primary"
                >
                    {showAddForm ? "Cancel" : "Add New Product"}
                </button>
            </div>

            {showAddForm && (
                <div className="card p-6">
                    <AddProduct
                        onSuccess={() => {
                            setShowAddForm(false);
                            fetchListings();
                        }}
                        editingListing={editingListing}
                    />
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
                            <th className="px-4 py-3 text-center">Actions</th>
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
                                <td className="px-4 py-3 text-center">
                                    <div className="flex justify-center space-x-2">
                                        <button
                                            onClick={() => handleEdit(listing)}
                                            className="text-primary-600 hover:text-primary-700"
                                        >
                                            <svg
                                                className="w-5 h-5"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                                />
                                            </svg>
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleDeleteClick(listing)
                                            }
                                            className="text-red-600 hover:text-red-700"
                                        >
                                            <svg
                                                className="w-5 h-5"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <DeleteAlert
                isOpen={deleteAlert.isOpen}
                onClose={() =>
                    setDeleteAlert({
                        isOpen: false,
                        listingId: null,
                        commodity: "",
                    })
                }
                onConfirm={handleDeleteConfirm}
                title="Delete Listing"
                message={`Are you sure you want to delete ${deleteAlert.commodity}? This action cannot be undone.`}
            />
        </div>
    );
}

export default ProductListings;
