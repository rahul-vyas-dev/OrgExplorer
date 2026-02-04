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
    <section className="relative w-full h-screen overflow-hidden bg-black justify-items-center font-sans">
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
      <div className="relative z-10 flex items-center justify-center w-4/5 h-full flex-col gap-10">
        <h1 className="md:text-[5vw] text-[5.4vw] font-bold text-gray-50 leading-none text-center ">
          <div className="appear block text-shadow-2xs text-shadow-zinc-700">
            <span>The </span>
            <span> &nbsp;modern</span>
            <span> &nbsp;way</span>
            <span> &nbsp;understand</span>
            <span> &nbsp;open-source</span>
            <span> &nbsp;organizations</span>
          </div>
        </h1>
        <h3 className="md:text-[1.9vw] text-[2.9vw] text-gray-50 text-center">
          <span className="block">Explore GitHub activity, contributors, and repositories through</span>
          <span className="block"> interactive, relationship-driven visualizations.</span>
        </h3>
      </div>
    </section>
  );
}
