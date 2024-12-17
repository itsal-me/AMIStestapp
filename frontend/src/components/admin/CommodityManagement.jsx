import { useState, useEffect } from "react";
import { getAuthHeaders } from "../../utils/api";

function CommodityManagement() {
    const [commodities, setCommodities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showAddForm, setShowAddForm] = useState(false);
    const [newCommodity, setNewCommodity] = useState({
        name: "",
        unit: "",
        description: "",
    });

    useEffect(() => {
        fetchCommodities();
    }, []);

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
            setError("Failed to fetch commodities");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            const response = await fetch(
                "http://localhost:8000/api/commodities/",
                {
                    method: "POST",
                    headers: {
                        ...getAuthHeaders(),
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(newCommodity),
                }
            );
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.detail || "Failed to create commodity");
            }

            setCommodities([...commodities, data]);
            setShowAddForm(false);
            setNewCommodity({
                name: "",
                unit: "",
                description: "",
            });
        } catch (err) {
            console.error("Error creating commodity:", err);
            setError(err.message || "Failed to create commodity");
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
                    Commodities
                </h3>
                <button
                    onClick={() => setShowAddForm(!showAddForm)}
                    className="btn-primary text-sm"
                >
                    {showAddForm ? "Cancel" : "Add New Commodity"}
                </button>
            </div>

            {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-xl">
                    {error}
                </div>
            )}

            {showAddForm && (
                <form onSubmit={handleSubmit} className="card p-6 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-light-800 font-medium mb-2">
                                Commodity Name
                            </label>
                            <input
                                type="text"
                                className="input-field"
                                value={newCommodity.name}
                                onChange={(e) =>
                                    setNewCommodity({
                                        ...newCommodity,
                                        name: e.target.value,
                                    })
                                }
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-light-800 font-medium mb-2">
                                Unit
                            </label>
                            <select
                                className="input-field"
                                value={newCommodity.unit}
                                onChange={(e) =>
                                    setNewCommodity({
                                        ...newCommodity,
                                        unit: e.target.value,
                                    })
                                }
                                required
                            >
                                <option value="">Select Unit</option>
                                <option value="kg">Kilogram (kg)</option>
                                <option value="quintal">Quintal</option>
                                <option value="ton">Ton</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <label className="block text-light-800 font-medium mb-2">
                            Description
                        </label>
                        <textarea
                            className="input-field"
                            value={newCommodity.description}
                            onChange={(e) =>
                                setNewCommodity({
                                    ...newCommodity,
                                    description: e.target.value,
                                })
                            }
                            rows="3"
                        />
                    </div>
                    <button type="submit" className="btn-primary w-full">
                        Add Commodity
                    </button>
                </form>
            )}

            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="bg-light-200">
                            <th className="px-4 py-3 text-left">Name</th>
                            <th className="px-4 py-3 text-left">Unit</th>
                            <th className="px-4 py-3 text-left">Description</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-light-300">
                        {commodities.map((commodity) => (
                            <tr
                                key={commodity.id}
                                className="hover:bg-light-100"
                            >
                                <td className="px-4 py-3">{commodity.name}</td>
                                <td className="px-4 py-3">{commodity.unit}</td>
                                <td className="px-4 py-3">
                                    {commodity.description}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default CommodityManagement;
