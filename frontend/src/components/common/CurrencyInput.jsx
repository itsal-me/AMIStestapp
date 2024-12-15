import { CURRENCY_SYMBOL } from "../../utils/currency";

function CurrencyInput({ value, onChange, ...props }) {
    return (
        <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-light-700">
                {CURRENCY_SYMBOL}
            </span>
            <input
                type="number"
                className="input-field pl-8"
                value={value}
                onChange={onChange}
                {...props}
            />
        </div>
    );
}

export default CurrencyInput;
