import { useState, useEffect } from "react";
import { getAuthHeaders } from "../../utils/api";

function Recommendations() {
    const [recommendations, setRecommendations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchRecommendations();
    }, []);

    const fetchRecommendations = async () => {
        try {
            const response = await fetch(
                "http://localhost:8000/api/recommendations/",
                {
                    headers: getAuthHeaders(),
                }
            );
            if (!response.ok)
                throw new Error("Failed to fetch recommendations");
            const data = await response.json();
            setRecommendations(data);
        } catch (err) {
            setError("Failed to fetch recommendations");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-32">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-50 text-red-600 p-4 rounded-xl">{error}</div>
        );
    }

    return (
        <div className="space-y-4">
            {recommendations.map((rec) => (
                <div
                    key={rec.id}
                    className={`card p-4 border-l-4 ${
                        rec.priority === "HIGH"
                            ? "border-red-500"
                            : rec.priority === "MEDIUM"
                            ? "border-yellow-500"
                            : "border-green-500"
                    }`}
                >
                    <div className="flex justify-between items-start">
                        <div>
                            <h4 className="font-semibold">{rec.title}</h4>
                            <p className="text-sm text-light-600">
                                For: {rec.commodity_name}
                            </p>
                        </div>
                        <span
                            className={`px-2 py-1 rounded-full text-xs ${
                                rec.priority === "HIGH"
                                    ? "bg-red-100 text-red-800"
                                    : rec.priority === "MEDIUM"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-green-100 text-green-800"
                            }`}
                        >
                            {rec.priority} Priority
                        </span>
                    </div>
                    <p className="mt-2">{rec.content}</p>
                    <div className="mt-2 text-sm text-light-600">
                        From: {rec.created_by_name} •{" "}
                        {new Date(rec.created_at).toLocaleDateString()}
                    </div>
                </div>
            ))}
            {recommendations.length === 0 && (
                <div className="text-center text-light-700 py-8">
                    No recommendations available at this time.
                </div>
            )}
        </div>
    );
}

export default Recommendations;
