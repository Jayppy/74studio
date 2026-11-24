import logo from "@/assets/74-studio-logo.webp";
import santaHat from "@/assets/christmas-santa-hat.webp";
import { FESTIVE_LOGO } from "@/lib/site";

type Props = { className?: string; loading?: "lazy" | "eager" };

/** Original logo, untouched. The Santa hat is a separate overlay toggled by FESTIVE_LOGO. */
export function BrandLogo({ className = "h-12 w-auto", loading }: Props) {
  return (
    <span className="relative inline-block">
      <img src={logo} alt="74 STUDIO logo" width={1200} height={400} decoding="async" className={className} {...(loading ? { loading } : {})} />
      {FESTIVE_LOGO && (
        <img
          src={santaHat}
          alt=""
          aria-hidden="true"
          width={320}
          height={239}
          decoding="async"
          className="pointer-events-none absolute left-[0.5%] top-[-9%] w-[15%] -rotate-[16deg] select-none drop-shadow-md"
        />
      )}
    </span>
  );
}
