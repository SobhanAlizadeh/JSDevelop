import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  size?: number;
  className?: string;
  withText?: boolean;
}

export function Logo({ size = 40, className = "", withText = true }: LogoProps) {
  return (
    <Link href="/" className={`flex items-center gap-3 group ${className}`}>
      <Image
        src="/logo.webp"
        alt="JSDevelop Logo"
        width={size}
        height={size}
        sizes={`${size}px`}
        fetchPriority="high"
        priority
        quality={90}
        className="rounded-xl shrink-0"
      />
      {withText && (
        <span className="text-xl font-bold tracking-tight text-heading">
          JSDevelop
        </span>
      )}
    </Link>
  );
}