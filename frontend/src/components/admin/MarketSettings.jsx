import { useState, useEffect } from "react";
import { getAuthHeaders } from "../../utils/api";
import Alert from "../Alert";
import ConfirmDialog from "../ConfirmDialog";

function MarketSettings() {
    const [markets, setMarkets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showAddForm, setShowAddForm] = useState(false);
    const [newMarket, setNewMarket] = useState({
        name: "",
        location: "",
        is_active: true,
    });
    const [editingMarket, setEditingMarket] = useState(null);
    const [alert, setAlert] = useState(null);
    const [confirmDialog, setConfirmDialog] = useState({
        isOpen: false,
        marketId: null,
    });

    const fetchMarkets = async () => {
        try {
            const response = await fetch(
                "http://localhost:8000/api/markets/all/",
                {
                    headers: getAuthHeaders(),
                }
            );
            if (!response.ok) throw new Error("Failed to fetch markets");
            const data = await response.json();
            setMarkets(data);
        } catch (err) {
            setError("Failed to fetch markets");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMarkets();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:8000/api/markets/", {
                method: "POST",
                headers: {
                    ...getAuthHeaders(),
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newMarket),
            });
            if (!response.ok) throw new Error("Failed to create market");
            const data = await response.json();
            setMarkets([...markets, data]);
            setShowAddForm(false);
            setNewMarket({
                name: "",
                location: "",
                is_active: true,
            });
        } catch (err) {
            setError("Failed to create market");
            console.error(err);
        }
    };

    const handleStatusChange = async (marketId, isActive) => {
        try {
            const response = await fetch(
                `http://localhost:8000/api/markets/${marketId}/`,
                {
                    method: "PATCH",
                    headers: {
                        ...getAuthHeaders(),
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ is_active: isActive }),
                }
            );

            if (!response.ok) {
                throw new Error("Failed to update market status");
            }

            const updatedMarket = await response.json();
            setMarkets(
                markets.map((market) =>
                    market.id === marketId ? updatedMarket : market
                )
            );
            setAlert({
                type: "success",
                message: `Market ${
                    isActive ? "activated" : "deactivated"
                } successfully`,
            });
        } catch (err) {
            setAlert({
                type: "error",
                message: err.message || "Failed to update market status",
            });
            console.error(err);
        }
    };

    const handleEdit = (market) => {
        setEditingMarket(market);
        setShowAddForm(false);
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(
                `http://localhost:8000/api/markets/${editingMarket.id}/`,
                {
                    method: "PUT",
                    headers: {
                        ...getAuthHeaders(),
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(editingMarket),
                }
            );

            if (!response.ok) {
                throw new Error("Failed to update market");
            }

            const updatedMarket = await response.json();
            setMarkets(
                markets.map((market) =>
                    market.id === editingMarket.id ? updatedMarket : market
                )
            );
            setEditingMarket(null);
        } catch (err) {
            setError("Failed to update market");
            console.error(err);
        }
    };

    const handleDelete = async (marketId) => {
        setConfirmDialog({
            isOpen: true,
            marketId,
        });
    };

    const confirmDelete = async () => {
        const marketId = confirmDialog.marketId;
        try {
            const response = await fetch(
                `http://localhost:8000/api/markets/${marketId}/`,
                {
                    method: "DELETE",
                    headers: getAuthHeaders(),
                }
            );

            if (!response.ok) {
                throw new Error("Failed to delete market");
            }

            setMarkets(markets.filter((market) => market.id !== marketId));
            setAlert({
                type: "success",
                message: "Market deleted successfully",
            });
        } catch (err) {
            setAlert({
                type: "error",
                message: err.message || "Failed to delete market",
            });
            console.error(err);
        } finally {
            setConfirmDialog({ isOpen: false, marketId: null });
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
            {alert && (
                <Alert
                    type={alert.type}
                    message={alert.message}
                    onClose={() => setAlert(null)}
                    autoClose={true}
                />
            )}

            <ConfirmDialog
                isOpen={confirmDialog.isOpen}
                title="Delete Market"
                message="Are you sure you want to delete this market? This action cannot be undone."
                onConfirm={confirmDelete}
                onCancel={() =>
                    setConfirmDialog({ isOpen: false, marketId: null })
                }
            />

            <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-light-900">
                    Market Locations
                </h3>
                {!editingMarket && (
                    <button
                        onClick={() => setShowAddForm(!showAddForm)}
                        className="btn-primary text-sm"
                    >
                        {showAddForm ? "Cancel" : "Add New Market"}
                    </button>
                )}
            </div>

            {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-xl">
                    {error}
                </div>
            )}

            {editingMarket ? (
                <form onSubmit={handleUpdate} className="card p-6 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-light-800 font-medium mb-2">
                                Market Name
                            </label>
                            <input
                                type="text"
                                className="input-field"
                                value={editingMarket.name}
                                onChange={(e) =>
                                    setEditingMarket({
                                        ...editingMarket,
                                        name: e.target.value,
                                    })
                                }
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-light-800 font-medium mb-2">
                                Location
                            </label>
                            <input
                                type="text"
                                className="input-field"
                                value={editingMarket.location}
                                onChange={(e) =>
                                    setEditingMarket({
                                        ...editingMarket,
                                        location: e.target.value,
                                    })
                                }
                                required
                            />
                        </div>
                    </div>
                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={() => setEditingMarket(null)}
                            className="btn-secondary"
                        >
                            Cancel
                        </button>
                        <button type="submit" className="btn-primary">
                            Update Market
                        </button>
                    </div>
                </form>
            ) : (
                showAddForm && (
                    <form
                        onSubmit={handleSubmit}
                        className="card p-6 space-y-4"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-light-800 font-medium mb-2">
                                    Market Name
                                </label>
                                <input
                                    type="text"
                                    className="input-field"
                                    value={newMarket.name}
                                    onChange={(e) =>
                                        setNewMarket({
                                            ...newMarket,
                                            name: e.target.value,
                                        })
                                    }
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-light-800 font-medium mb-2">
                                    Location
                                </label>
                                <input
                                    type="text"
                                    className="input-field"
                                    value={newMarket.location}
                                    onChange={(e) =>
                                        setNewMarket({
                                            ...newMarket,
                                            location: e.target.value,
                                        })
                                    }
                                    required
                                />
                            </div>
                        </div>
                        <button type="submit" className="btn-primary w-full">
                            Add Market
                        </button>
                    </form>
                )
            )}

            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="bg-light-200">
                            <th className="px-4 py-3 text-left">Market Name</th>
                            <th className="px-4 py-3 text-left">Location</th>
                            <th className="px-4 py-3 text-left">Status</th>
                            <th className="px-4 py-3 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-light-300">
                        {markets.map((market) => (
                            <tr key={market.id} className="hover:bg-light-100">
                                <td className="px-4 py-3">{market.name}</td>
                                <td className="px-4 py-3">{market.location}</td>
                                <td className="px-4 py-3">
                                    <span
                                        className={`px-2 py-1 rounded-full text-xs ${
                                            market.is_active
                                                ? "bg-green-100 text-green-800"
                                                : "bg-red-100 text-red-800"
                                        }`}
                                    >
                                        {market.is_active
                                            ? "Active"
                                            : "Inactive"}
                                    </span>
                                </td>
                                <td className="px-4 py-3 text-right space-x-2">
                                    <button
                                        onClick={() => handleEdit(market)}
                                        className="text-sm px-3 py-1 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() =>
                                            handleStatusChange(
                                                market.id,
                                                !market.is_active
                                            )
                                        }
                                        className={`text-sm px-3 py-1 rounded-lg ${
                                            market.is_active
                                                ? "bg-red-50 text-red-600 hover:bg-red-100"
                                                : "bg-green-50 text-green-600 hover:bg-green-100"
                                        }`}
                                    >
                                        {market.is_active
                                            ? "Deactivate"
                                            : "Activate"}
                                    </button>
                                    <button
                                        onClick={() => handleDelete(market.id)}
                                        className="text-sm px-3 py-1 rounded-lg bg-red-50 text-red-600 hover:bg-red-100"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default MarketSettings;
