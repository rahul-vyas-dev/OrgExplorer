import { type LandingImageVariants } from "@/types/landingImageVariantsTypes";

export const landingImageVariants: LandingImageVariants = {
    initial: {
      opacity: 0,
      y: 20,
      scale: 1.13,
      filter: "blur(12px)",
    },
  
    enter: {
      opacity: 0.5,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.9,
        ease: "easeOut",
      },
    },
  
    exit: {
      opacity: 0,
      scale: 0.88,
      filter: "blur(6px)",
      transition: {
        duration: 0.6,
        ease: "easeIn",
      },
    },
  };
  