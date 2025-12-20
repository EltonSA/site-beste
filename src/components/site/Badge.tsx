export default function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full glass border border-white/30 px-4 py-2 text-xs font-semibold text-zinc-700 shadow-lg transition-all duration-300 hover:border-blue-300 hover:bg-blue-50/50 hover:scale-105 hover:shadow-xl">
      {children}
    </span>
  );
}
