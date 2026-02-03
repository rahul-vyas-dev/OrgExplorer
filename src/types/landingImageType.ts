export type LandingImageRole =
  | "hero-visual"
  | "showcase"
  | "branding"
  | "conceptual"
  | "closing-visual";

export type LandingImageBackground = "dark" | "light";

export interface LandingImage {
  id: string;
  src: string;

  alt: string;
  title?: string;
  ariaLabel?: string;

  role: LandingImageRole;
  priority?: boolean;
  delay: number;

  objectFit?: "cover" | "contain";
  background?: LandingImageBackground;
  caption?: string;
}
