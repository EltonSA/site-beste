import Link from "next/link";

interface LogoProps {
  className?: string;
}

export default function Logo({ className = "" }: LogoProps) {
  return (
    <Link
      href="/"
      className={`inline-block text-xl font-bold tracking-tight transition-opacity hover:opacity-80 ${className}`}
    >
      <span className="bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent whitespace-nowrap">
        Beste Web
      </span>
    </Link>
  );
}

