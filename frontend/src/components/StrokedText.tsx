type StrokedTextProps = {
    text: string;
    className?: string;
};

export const StrokedText: React.FC<StrokedTextProps> = ({ text, className = "" }) => (
    <span className={`relative inline-block ${className}`}>
        <span
            className="absolute inset-0"
            style={{
                WebkitTextStroke: "5px var(--grass-400)",
                color: "transparent",
            }}
        >
            {text}
        </span>
        <span className="relative text-grass-200">{text}</span>
    </span>
);