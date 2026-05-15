"use client";

import { useEffect, useState } from "react";

export default function ProgressBar() {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const total = document.body.scrollHeight - window.innerHeight;
      setWidth((window.scrollY / total) * 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      id="prog"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        height: 2.5,
        background: "linear-gradient(90deg, var(--cu), var(--gd))",
        zIndex: 9999,
        width: `${width}%`,
        transition: "width .1s",
      }}
    />
  );
}
