import type React from "react";

type StrokedTextProps = {
  text: string;
  className?: string;
  color?: string;
  outlineColor?: string;
  strokeWidth?: string | number;
};

export const StrokedText: React.FC<StrokedTextProps> = ({
  text,
  className = "",
  color = "var(--grass-200)",
  outlineColor = "var(--grass-400)",
  strokeWidth = 5,
}) => (
  <span className={`relative inline-block ${className}`}>
    <span
      className="absolute inset-0"
      style={{
        WebkitTextStroke: `${strokeWidth}px ${outlineColor}`,
        color: "transparent",
      }}
    >
      {text}
    </span>
    <span
      className="relative"
      style={{
        color,
      }}
    >
      {text}
    </span>
  </span>
);
