"use client";

import { cn } from "@/lib/utils";
import { HTMLAttributes, forwardRef, ReactNode } from "react";
import { motion, HTMLMotionProps } from "framer-motion";

interface SectionProps extends Omit<HTMLMotionProps<"section">, "children"> {
  children: ReactNode;
  id?: string;
  delay?: number;
}

export const Section = forwardRef<HTMLElement, SectionProps>(
  ({ className, children, id, delay = 0, ...props }, ref) => {
    return (
      <motion.section
        ref={ref}
        id={id}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-100px" }}
        transition={{ duration: 0.5, delay }}
        className={cn(
          "w-full max-w-5xl mx-auto px-4 md:px-6 py-10 md:py-16 flex flex-col gap-8 md:gap-12",
          className
        )}
        {...props}
      >
        {children}
      </motion.section>
    );
  }
);

Section.displayName = "Section";
