import { motion, type HTMLMotionProps } from "framer-motion";
import clsx from "clsx";
import React from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends HTMLMotionProps<"button"> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    children?: React.ReactNode;
}

export const Button = ({
    variant = "primary",
    size = "md",
    leftIcon,
    rightIcon,
    className,
    children,
    ...props
}: ButtonProps) => {
    return (
        <motion.button
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className={clsx(
                "inline-flex items-center justify-center gap-2 rounded-xl font-medium backdrop-blur-sm",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 hover:gap-2.5",
                "transition-colors duration-200",

                // Sizes
                size === "sm" && "px-4 py-2 text-sm",
                size === "md" && "px-6 py-3 text-base",
                size === "lg" && "px-8 py-4 text-lg",

                // Variants
                variant === "primary" &&
                "bg-white text-black hover:bg-white/90",

                variant === "secondary" &&
                "border border-white/30 text-white hover:bg-white/20",

                variant === "ghost" &&
                "text-white/80 hover:text-white hover:bg-white/10 outline-2 outline-white/10",

                className
            )}
            {...props}
        >
            {leftIcon}
            {children}
            {rightIcon}
        </motion.button>
    );
};
