
import type { Easing, Variants } from "framer-motion";

type transition = {
  duration: number;
  ease: Easing | Easing[];
};

export interface LandingImageVariants extends Variants {
  initial: {
    opacity: number;
    y: number;
    scale: number;
    filter: string;
  };

  enter: {
    opacity: number;
    y: number;
    scale: number;
    filter: string;
    transition: transition;
  };

  exit: {
    opacity: number;
    scale: number;
    filter: string;
    transition: transition;
  };
}
