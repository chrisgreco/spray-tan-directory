import Link from "next/link";

export default function Logo({ size = "default" }: { size?: "default" | "small" }) {
  const h = size === "small" ? "h-7" : "h-9";
  return (
    <Link href="/" className="flex items-center gap-2.5">
      <svg
        className={`${h} w-auto`}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Sun with rays — bronzed glow */}
        <circle cx="20" cy="20" r="10" fill="#C9883A" />
        <circle cx="20" cy="20" r="7" fill="#F5C9A0" />
        {/* Rays */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
          <line
            key={angle}
            x1="20"
            y1="20"
            x2={20 + 16 * Math.cos((angle * Math.PI) / 180)}
            y2={20 + 16 * Math.sin((angle * Math.PI) / 180)}
            stroke="#C9883A"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.4"
          />
        ))}
        {/* Silhouette in center */}
        <circle cx="20" cy="17" r="3" fill="#1C1008" opacity="0.2" />
        <path d="M14 28C14 23.6 16.7 21 20 21C23.3 21 26 23.6 26 28" fill="#1C1008" opacity="0.15" />
      </svg>
      <div className="flex flex-col leading-none">
        <span className="font-display text-lg font-bold text-espresso">
          Glow<span className="text-bronzed-gold">Find</span>
        </span>
        {size === "default" && (
          <span className="text-[10px] font-medium tracking-widest text-espresso/40 uppercase">
            Spray Tan Directory
          </span>
        )}
      </div>
    </Link>
  );
}
