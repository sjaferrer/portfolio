"use client";

import { useEffect, useRef, useState } from "react";

export default function FadeInSection({
  children,
}: {
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const currentRef = ref.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      },
      {
        threshold: 0.15,
      },
    );

    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`
        transform transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]
        ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"}
      `}
    >
      {children}
    </div>
  );
}
