import { type LandingImageVariants } from "@/types/landingImageVariantsTypes";

export const landingImageVariants: LandingImageVariants = {
    initial: {
      opacity: 0,
      y: 20,
      scale: 1.03,
      filter: "blur(12px)",
    },
  
    enter: {
      opacity: 1,
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
      scale: 0.98,
      filter: "blur(6px)",
      transition: {
        duration: 0.6,
        ease: "easeIn",
      },
    },
  };
  