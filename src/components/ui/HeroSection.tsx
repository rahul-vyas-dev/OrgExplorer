import { motion, AnimatePresence } from "framer-motion";
import { landingImages } from "@/data/const/landingImages";
import { landingImageVariants } from "@/data/const/landingImageVariants";
import { useEffect, useState } from "react";

export function HeroSection() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIndex((prev) => (prev + 1) % landingImages.length);
    }, 3300);

    return () => clearTimeout(timeout);
  }, [index]);

  const image = landingImages[index];

  return (
    <section className="relative w-full h-screen overflow-hidden bg-black">
      <AnimatePresence mode="wait">
        <motion.img
          key={image.id}
          src={image.src}
          alt={image.alt}
          aria-label={image.ariaLabel}
          title={image.title}
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{ objectFit: image.objectFit }}
          variants={landingImageVariants}
          initial="initial"
          animate="enter"
          exit="exit"
        />
      </AnimatePresence>      
    </section>
  );
}
