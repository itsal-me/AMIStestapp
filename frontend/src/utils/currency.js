export const formatCurrency = (amount) => {
    return new Intl.NumberFormat("bn-BD", {
        style: "currency",
        currency: "BDT",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(amount);
};

// For cases where we just want the symbol
export const CURRENCY_SYMBOL = "৳";
