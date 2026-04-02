interface MvAdBoxProps {
  slot?: string;
  className?: string;
}

export default function MvAdBox({ slot = "content", className = "" }: MvAdBoxProps) {
  return (
    <div
      className={`flex min-h-[250px] items-center justify-center rounded-xl border-2 border-dashed border-peach/40 bg-peach/5 ${className}`}
      data-ad-slot={slot}
    >
      <p className="text-xs text-espresso/30">Ad Space — {slot}</p>
    </div>
  );
}
