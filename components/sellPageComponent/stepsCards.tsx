"use client";

import Step1Mockup from "@/public/mockups/step1Mockup";
import Step2Mockup from "@/public/mockups/Step2Mockup";
import Step3Mockup from "@/public/mockups/step3Mockup";
import Step4Mockup from "@/public/mockups/step4Mockup";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const StepsCards = () => {
  const cardsRef = useRef<any>([]);

  useEffect(() => {
    gsap.fromTo(
      cardsRef.current,
      { opacity: 0, scale: 0.8, y: 50 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.2,
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      }
    );
  }, []);

  return (
    <div className="gap-32 flex flex-wrap items-center justify-center mt-10">
      {[
        {
          mockup: <Step1Mockup />,
          title: "Step 1",
          text: "Register your company, log in, add additional information, and complete your profile.",
        },
        {
          mockup: <Step2Mockup />,
          title: "Step 2",
          text: "Add product details, wait for approval from IU team, then see your product list in the Product Tab.",
        },
        {
          mockup: <Step3Mockup />,
          title: "Step 3",
          text: "Promote your products to appear at the top, increasing visibility for global customers.",
        },
        {
          mockup: <Step4Mockup />,
          title: "Step 4",
          text: "Receive payments based on the buyer's chosen method when customers order your product.",
        },
      ].map((step, index) => (
        <div
          key={index}
          ref={(el: any) => (cardsRef.current[index] = el!)}
          className="bg-white p-2 rounded-3xl max-w-[480px] h-[300px] px-6 opacity-0 transform scale-90"
        >
          <div className="flex justify-between">
            {step.mockup}
            <div className="bg-black text-white rounded-md p-1 w-auto h-8 px-2">
              {step.title}
            </div>
          </div>
          <div>
            <p className="text-primary w-[340px] h-[280px] text-base font-light mt-3 px-4">
              {step.text}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StepsCards;
