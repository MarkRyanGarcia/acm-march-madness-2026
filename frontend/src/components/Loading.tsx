import { useEffect, useRef } from "react";

function LoadingSpinner() {
  const ref = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (ref.current) {
      console.log(ref.current.getTotalLength());
    }
  }, []);

  const d =
    "M309.019 11.8284C320.316 1.06387 336.572 -2.70767 351.455 1.98171C373.78 9.01582 389.503 29.0236 391.061 52.3782L391.533 59.47C391.831 63.9424 391.722 68.4326 391.206 72.885C387.651 103.547 364.741 128.269 334.725 134.329C373.424 182.201 398.626 244.851 398.626 299.874C398.626 406.842 303.388 426.074 198.875 426.074C94.3619 426.074 0.000182941 400.707 0 293.74C0 239.715 24.0711 179.905 61.3613 133.932C32.255 127.249 10.2083 102.915 6.72656 72.885C6.21036 68.4326 6.10031 63.9423 6.39844 59.47L6.87207 52.3782C8.42914 29.0238 24.1523 9.01597 46.4766 1.98171C61.3597 -2.70774 77.6158 1.06403 88.9131 11.8284L97.0664 19.5969C106.354 28.447 114.628 38.3043 121.734 48.9856L137.014 71.9505C156.74 62.4876 177.597 57.1135 198.875 57.1135C220.058 57.1136 240.861 62.6922 260.566 72.4788L276.197 48.9856C283.304 38.3043 291.578 28.4471 300.866 19.5969L309.019 11.8284Z";

  return (
    <svg
      viewBox="-20 -20 540 540"
      width="100"
      height="100"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path className="capybara-track" d={d} />
      <path className="capybara-indicator" d={d} />
    </svg>
  );
}

export function LoadingPage() {
  return (
    <div className="fixed top-1/3 left-1/2 -translate-1/2 items-center justify-center">
      <div className="grid items-center justify-center">
        <LoadingSpinner />
        <span className="text-xl font-bold">Loading...</span>
      </div>
    </div>
  );
}
