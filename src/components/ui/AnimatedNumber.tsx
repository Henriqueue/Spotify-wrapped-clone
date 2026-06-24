"use client";

import { useEffect, useRef } from "react";
import { useMotionValue, useSpring, animate } from "motion/react";

interface AnimatedNumberProps {
  value: number;
  duration?: number;
  className?: string;
  formatter?: (n: number) => string;
}

export function AnimatedNumber({
  value,
  duration = 1.5,
  className,
  formatter = (n) => Math.round(n).toLocaleString("pt-BR"),
}: AnimatedNumberProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, { duration: duration * 1000, bounce: 0 });

  useEffect(() => {
    motionVal.set(value);
  }, [value, motionVal]);

  useEffect(() => {
    return spring.on("change", (latest) => {
      if (ref.current) ref.current.textContent = formatter(latest);
    });
  }, [spring, formatter]);

  return <span ref={ref} className={className}>0</span>;
}