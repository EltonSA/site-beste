export default function Container({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">{children}</div>;
}
