export default function Container({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 lg:px-12">{children}</div>;
}
