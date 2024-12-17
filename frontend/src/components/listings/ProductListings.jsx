import { useState, useEffect } from "react";
import { getAuthHeaders } from "../../utils/api";
import { formatCurrency } from "../../utils/currency";

function ProductListings() {
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showAddForm, setShowAddForm] = useState(false);
    const [newListing, setNewListing] = useState({
        commodity: "",
        quantity: "",
        price: "",
        description: "",
    });
    const [editingListing, setEditingListing] = useState(null);

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
            const data = await response.json();
            if (response.ok) {
                setListings(data);
            } else {
                setError(data.error);
            }
        } catch (err) {
            setError("Failed to fetch listings");
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editingListing) {
            await handleUpdate(e);
        } else {
            try {
                const response = await fetch(
                    "http://localhost:8000/api/listings/",
                    {
                        method: "POST",
                        headers: {
                            ...getAuthHeaders(),
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            ...newListing,
                            quantity: parseFloat(newListing.quantity),
                            price: parseFloat(newListing.price),
                        }),
                    }
                );
                const data = await response.json();

                if (response.ok) {
                    setListings([...listings, data]);
                    setShowAddForm(false);
                    setNewListing({
                        commodity: "",
                        quantity: "",
                        price: "",
                        description: "",
                    });
                } else {
                    setError(data.error || "Failed to create listing");
                    console.error("Server error:", data);
                }
            } catch (err) {
                console.error("Network error:", err);
                setError("Failed to create listing");
            }
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this listing?")) {
            return;
        }
        try {
            const response = await fetch(
                `http://localhost:8000/api/listings/${id}/`,
                {
                    method: "DELETE",
                    headers: getAuthHeaders(),
                }
            );
            if (response.ok) {
                setListings(listings.filter((listing) => listing.id !== id));
            } else {
                setError("Failed to delete listing");
            }
        } catch (err) {
            setError("Failed to delete listing");
        }
    };

    const handleEdit = (listing) => {
        setEditingListing(listing);
        setNewListing({
            commodity: listing.commodity,
            quantity: listing.quantity,
            price: listing.price,
            description: listing.description,
        });
        setShowAddForm(true);
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(
                `http://localhost:8000/api/listings/${editingListing.id}/`,
                {
                    method: "PUT",
                    headers: {
                        ...getAuthHeaders(),
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        ...newListing,
                        quantity: parseFloat(newListing.quantity),
                        price: parseFloat(newListing.price),
                    }),
                }
            );
            const data = await response.json();

            if (response.ok) {
                setListings(
                    listings.map((listing) =>
                        listing.id === editingListing.id ? data : listing
                    )
                );
                setShowAddForm(false);
                setEditingListing(null);
                setNewListing({
                    commodity: "",
                    quantity: "",
                    price: "",
                    description: "",
                });
            } else {
                setError(data.error || "Failed to update listing");
                console.error("Server error:", data);
            }
        } catch (err) {
            console.error("Network error:", err);
            setError("Failed to update listing");
        }
    };

    const handleCancel = () => {
        setShowAddForm(false);
        setEditingListing(null);
        setNewListing({
            commodity: "",
            quantity: "",
            price: "",
            description: "",
        });
    };

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
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-light-900">
                    Your Active Listings
                </h3>
                <button
                    onClick={() => handleCancel()}
                    className="btn-primary text-sm"
                >
                    {showAddForm ? "Cancel" : "Add New Listing"}
                </button>
            </div>

            {showAddForm && (
                <form onSubmit={handleSubmit} className="card p-6 space-y-4">
                    <div>
                        <label className="block text-light-800 font-medium mb-2">
                            Commodity
                        </label>
                        <input
                            type="text"
                            className="input-field"
                            value={newListing.commodity}
                            onChange={(e) =>
                                setNewListing({
                                    ...newListing,
                                    commodity: e.target.value,
                                })
                            }
                            required
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-light-800 font-medium mb-2">
                                Quantity (kg)
                            </label>
                            <input
                                type="number"
                                className="input-field"
                                value={newListing.quantity}
                                onChange={(e) =>
                                    setNewListing({
                                        ...newListing,
                                        quantity: e.target.value,
                                    })
                                }
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-light-800 font-medium mb-2">
                                Price per kg
                            </label>
                            <input
                                type="number"
                                className="input-field"
                                value={newListing.price}
                                onChange={(e) =>
                                    setNewListing({
                                        ...newListing,
                                        price: e.target.value,
                                    })
                                }
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-light-800 font-medium mb-2">
                            Description
                        </label>
                        <textarea
                            className="input-field"
                            rows="3"
                            value={newListing.description}
                            onChange={(e) =>
                                setNewListing({
                                    ...newListing,
                                    description: e.target.value,
                                })
                            }
                            required
                        ></textarea>
                    </div>
                    <button type="submit" className="btn-primary w-full">
                        {editingListing ? "Update Listing" : "Create Listing"}
                    </button>
                </form>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {listings.map((listing) => (
                    <div key={listing.id} className="card p-6 space-y-4">
                        <div className="flex justify-between items-start">
                            <div>
                                <h4 className="text-lg font-semibold text-light-900">
                                    {listing.commodity}
                                </h4>
                                <p className="text-primary-600">
                                    {listing.quantity}kg available
                                </p>
                            </div>
                            <div className="flex space-x-2">
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
                                    onClick={() => handleDelete(listing.id)}
                                    className="text-red-500 hover:text-red-600"
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
                        </div>
                        <p className="text-light-700">{listing.description}</p>
                        <div className="flex justify-between items-center text-light-700">
                            <span>
                                Price: {formatCurrency(listing.price)}/kg
                            </span>
                            <span className="text-sm">
                                Listed on:{" "}
                                {new Date(
                                    listing.created_at
                                ).toLocaleDateString()}
                            </span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span
                                className={`px-3 py-1 rounded-full text-sm ${
                                    listing.status === "ACTIVE"
                                        ? "bg-green-100 text-green-800"
                                        : "bg-yellow-100 text-yellow-800"
                                }`}
                            >
                                {listing.status}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {listings.length === 0 && !showAddForm && (
                <div className="text-center text-light-700 py-8">
                    You don't have any active listings.
                    <br />
                    <button
                        onClick={() => setShowAddForm(true)}
                        className="text-primary-600 hover:text-primary-700 font-medium mt-2"
                    >
                        Create your first listing
                    </button>
                </div>
            )}
        </div>
    );
}

export default ProductListings;
