interface BadgeProps {
  children: React.ReactNode;
  color?: "green" | "yellow" | "red" | "gray" | "blue";
}

const colorMap = {
  green: "bg-green-400/10 text-green-400 border-green-400/20",
  yellow: "bg-yellow-400/10 text-yellow-400 border-yellow-400/20",
  red: "bg-red-400/10 text-red-400 border-red-400/20",
  gray: "bg-white/5 text-zinc-400 border-white/10",
  blue: "bg-blue-400/10 text-blue-400 border-blue-400/20",
};

export default function Badge({ children, color = "gray" }: BadgeProps) {
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border text-xs font-medium ${colorMap[color]}`}>
      {children}
    </span>
  );
}
