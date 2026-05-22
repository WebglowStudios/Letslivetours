"use client";

import { useEffect } from "react";

export default function ScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const observeElements = () => {
      const elements = document.querySelectorAll(".rv:not(.in), .rv-l:not(.in), .rv-r:not(.in)");
      elements.forEach((el) => observer.observe(el));
    };

    // Initial observe
    observeElements();

    // Re-observe when DOM changes (for dynamically loaded content)
    const mutationObserver = new MutationObserver(() => {
      observeElements();
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  return null;
}
