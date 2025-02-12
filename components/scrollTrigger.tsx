"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AnimatedBox = () => {
  const deviceRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const deviceElement = deviceRef.current;

    if (!deviceElement) return;

    gsap.fromTo(
      deviceElement,
      {
        width: "1600px", // Starting size (large screen size)
        height: "1200px",
        // display: "flex",
        // alignItems: "center",
        // justifyContent: "center",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        position: "fixed",
        opacity: 1,
      },
      {
        width: "400px", // End size (small mobile size)
        height: "600px",
        // display: "flex",
        // alignItems: "center",
        // justifyContent: "center",
        position: "fixed",
        opacity: 1,
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        ease: "none",
        scrollTrigger: {
          trigger: deviceElement,
          start: "top center", // Start when it enters the center of the viewport
          end: "bottom+=100% top", // Adjust the scroll distance to fit within the screen
          scrub: true,
          pin: true, // Keeps the element fixed while scrolling
          toggleActions: "play none none reverse", // Shrinks and grows on scroll
        },
      }
    );
  }, []);

  return (
    <div className="relative  h-[340vh] bg-primary flex items-center justify-center overflow-hidden">
      <h1 className="absolute top-10 text-white text-3xl text-center">
        Scroll Down for Animations
      </h1>

      {/* Green Box (Device-like Element) */}
      <div
        ref={deviceRef}
        className="bg-green-500 flex items-center justify-center text-white text-2xl font-bold rounded-xl shadow-2xl fixed inset-0"
        style={
          {
            //   top: "50%",
            //   left: "50%",
            //   transform: "translate(-50%, -50%)", // Ensures the box stays centered
          }
        }
      >
        <h1>I'm a Resizable Device</h1>
      </div>
    </div>
  );
};

export default AnimatedBox;
