// Format currency to English numbers with BDT/Tk
export const formatCurrency = (amount) => {
    const formattedNumber = new Intl.NumberFormat("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(amount);

    return `৳${formattedNumber}`; // Using Bangladeshi Taka symbol
};

// Format date to English format (e.g., "Dec 18, 2024")
export const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
};

// Format numbers to English with commas
export const formatNumber = (number) => {
    return new Intl.NumberFormat("en-US").format(number);
};
