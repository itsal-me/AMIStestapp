import { useState, useEffect } from "react";
import { getAuthHeaders } from "../../utils/api";

function RecommendationManagement() {
    const [recommendations, setRecommendations] = useState([]);
    const [commodities, setCommodities] = useState([]);
    const [farmers, setFarmers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showAddForm, setShowAddForm] = useState(false);
    const [newRecommendation, setNewRecommendation] = useState({
        title: "",
        content: "",
        commodity: "",
        priority: "MEDIUM",
        target_farmers: [],
    });

    useEffect(() => {
        Promise.all([
            fetch("http://localhost:8000/api/recommendations/", {
                headers: getAuthHeaders(),
            }),
            fetch("http://localhost:8000/api/commodities/", {
                headers: getAuthHeaders(),
            }),
            fetch("http://localhost:8000/api/farmers/", {
                headers: getAuthHeaders(),
            }),
        ])
            .then(async ([recsRes, commsRes, farmersRes]) => {
                if (!recsRes.ok)
                    throw new Error("Failed to fetch recommendations");
                if (!commsRes.ok)
                    throw new Error("Failed to fetch commodities");
                if (!farmersRes.ok) throw new Error("Failed to fetch farmers");

                const [recsData, commsData, farmersData] = await Promise.all([
                    recsRes.json(),
                    commsRes.json(),
                    farmersRes.json(),
                ]);

                console.log("Available commodities:", commsData); // Debug log

                setRecommendations(recsData);
                setCommodities(commsData);
                setFarmers(farmersData);
            })
            .catch((err) => {
                console.error("Error fetching data:", err);
                setError(err.message || "Failed to fetch data");
            })
            .finally(() => setLoading(false));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(
                "http://localhost:8000/api/recommendations/",
                {
                    method: "POST",
                    headers: {
                        ...getAuthHeaders(),
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(newRecommendation),
                }
            );

            if (!response.ok)
                throw new Error("Failed to create recommendation");

            const data = await response.json();
            setRecommendations([data, ...recommendations]);
            setShowAddForm(false);
            setNewRecommendation({
                title: "",
                content: "",
                commodity: "",
                priority: "MEDIUM",
                target_farmers: [],
            });
        } catch (err) {
            setError("Failed to create recommendation");
            console.error(err);
        }
    };

    const getTargetedFarmers = (targetFarmers) => {
        if (!targetFarmers || targetFarmers.length === 0) {
            return "All Farmers";
        }
        const farmerNames = targetFarmers
            .map((id) => farmers.find((f) => f.id === id)?.username)
            .filter(Boolean);
        return farmerNames.join(", ");
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Recommendations</h3>
                <button
                    onClick={() => setShowAddForm(!showAddForm)}
                    className="btn-primary"
                >
                    {showAddForm ? "Cancel" : "Add Recommendation"}
                </button>
            </div>

            {showAddForm && (
                <form onSubmit={handleSubmit} className="card p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Title
                        </label>
                        <input
                            type="text"
                            className="input-field"
                            value={newRecommendation.title}
                            onChange={(e) =>
                                setNewRecommendation({
                                    ...newRecommendation,
                                    title: e.target.value,
                                })
                            }
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Content
                        </label>
                        <textarea
                            className="input-field"
                            rows="4"
                            value={newRecommendation.content}
                            onChange={(e) =>
                                setNewRecommendation({
                                    ...newRecommendation,
                                    content: e.target.value,
                                })
                            }
                            required
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-light-800 font-medium mb-2">
                                Commodity
                            </label>
                            <select
                                className="input-field"
                                value={newRecommendation.commodity}
                                onChange={(e) =>
                                    setNewRecommendation({
                                        ...newRecommendation,
                                        commodity: e.target.value,
                                    })
                                }
                                required
                            >
                                <option value="">Select Commodity</option>
                                {commodities.length > 0 ? (
                                    commodities.map((commodity) => (
                                        <option
                                            key={commodity.id}
                                            value={commodity.id}
                                        >
                                            {commodity.name} ({commodity.unit})
                                        </option>
                                    ))
                                ) : (
                                    <option value="" disabled>
                                        No commodities available
                                    </option>
                                )}
                            </select>
                            {commodities.length === 0 && (
                                <p className="text-sm text-red-600 mt-1">
                                    Please add commodities in the Commodity
                                    Management section first
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Priority
                            </label>
                            <select
                                className="input-field"
                                value={newRecommendation.priority}
                                onChange={(e) =>
                                    setNewRecommendation({
                                        ...newRecommendation,
                                        priority: e.target.value,
                                    })
                                }
                            >
                                <option value="HIGH">High</option>
                                <option value="MEDIUM">Medium</option>
                                <option value="LOW">Low</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-light-800 font-medium mb-2">
                            Target Farmers
                        </label>
                        <select
                            multiple
                            className="input-field h-48"
                            value={newRecommendation.target_farmers}
                            onChange={(e) =>
                                setNewRecommendation({
                                    ...newRecommendation,
                                    target_farmers: Array.from(
                                        e.target.selectedOptions,
                                        (option) => option.value
                                    ),
                                })
                            }
                        >
                            <option value="" disabled>
                                Select farmers (leave empty for all)
                            </option>
                            {farmers.map((farmer) => (
                                <option key={farmer.id} value={farmer.id}>
                                    {farmer.username} - {farmer.email}
                                </option>
                            ))}
                        </select>
                        <p className="text-sm text-light-600 mt-1">
                            Hold Ctrl/Cmd to select multiple farmers. Leave
                            empty to target all farmers.
                        </p>
                    </div>

                    <button type="submit" className="btn-primary w-full">
                        Create Recommendation
                    </button>
                </form>
            )}

            <div className="space-y-4">
                {recommendations.map((rec) => (
                    <div key={rec.id} className="card p-4">
                        <div className="flex justify-between items-start">
                            <div>
                                <h4 className="font-semibold">{rec.title}</h4>
                                <p className="text-sm text-light-600">
                                    {rec.commodity_name} | Priority:{" "}
                                    {rec.priority}
                                </p>
                            </div>
                            <span
                                className={`px-2 py-1 rounded-full text-xs ${
                                    rec.is_active
                                        ? "bg-green-100 text-green-800"
                                        : "bg-red-100 text-red-800"
                                }`}
                            >
                                {rec.is_active ? "Active" : "Inactive"}
                            </span>
                        </div>
                        <p className="mt-2">{rec.content}</p>
                        <div className="mt-2 text-sm text-light-600">
                            Created by {rec.created_by_name} on{" "}
                            {new Date(rec.created_at).toLocaleDateString()}
                            <br />
                            Targeted to:{" "}
                            {getTargetedFarmers(rec.target_farmers)}
                        </div>
                    </div>
                ))}
            </div>

            {commodities.length === 0 && !loading && (
                <p className="text-red-600 text-sm">
                    No commodities available. Please add commodities first.
                </p>
            )}
        </div>
    );
}

export default RecommendationManagement;
