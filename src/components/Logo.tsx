import Link from "next/link";
import Image from "next/image";

export default function Logo({ variant = "default" }: { variant?: "default" | "footer" }) {
  return (
    <Link href="/" className="flex items-center" aria-label="Green Raise Agro — Home">
      <Image
        src="/media/logo/logo.png"
        alt="Green Raise Agro Pvt Ltd"
        width={180}
        height={60}
        className={
          variant === "footer"
            ? "h-10 w-auto brightness-0 invert"
            : "h-10 w-auto md:h-11"
        }
        priority
      />
    </Link>
  );
}
