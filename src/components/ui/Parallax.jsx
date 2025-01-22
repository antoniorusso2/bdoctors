import { useEffect } from "react";

export default function useParallaxEffect() {
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const parallaxBg = document.querySelector(".parallax-bg");
      if (parallaxBg) {
        parallaxBg.style.transform = `translateY(${scrolled * -0.2}px)`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
}
