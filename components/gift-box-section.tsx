"use client"

import { useRef } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function GiftBoxSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const giftBoxRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  const sparklesRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "center center",
          toggleActions: "play none none reverse",
        },
      })

      // Main gift box animation - pop up with bounce
      timeline.fromTo(
        giftBoxRef.current,
        {
          scale: 0,
          y: 100,
          opacity: 0,
          rotationY: -180,
        },
        {
          scale: 1,
          y: 0,
          opacity: 1,
          rotationY: 0,
          duration: 1.5,
          ease: "back.out(2)",
        },
      )

      // Glow effect animation
      timeline.fromTo(
        glowRef.current,
        {
          scale: 0,
          opacity: 0,
        },
        {
          scale: 1.5,
          opacity: 0.6,
          duration: 1.2,
          ease: "power2.out",
        },
        "-=1.2",
      )

      // Continuous floating animation after initial pop-up
      timeline.to(giftBoxRef.current, {
        y: -20,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      })

      // Continuous glow pulse
      gsap.to(glowRef.current, {
        scale: 1.6,
        opacity: 0.4,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      })

      // Create sparkles animation
      const createSparkle = () => {
        if (!sparklesRef.current) return

        const sparkle = document.createElement("div")
        sparkle.className = "absolute w-2 h-2 bg-primary rounded-full"
        sparkle.style.left = `${Math.random() * 100}%`
        sparkle.style.top = `${Math.random() * 100}%`
        sparklesRef.current.appendChild(sparkle)

        gsap.fromTo(
          sparkle,
          {
            scale: 0,
            opacity: 1,
          },
          {
            scale: 2,
            opacity: 0,
            duration: 1.5,
            ease: "power2.out",
            onComplete: () => sparkle.remove(),
          },
        )
      }

      // Create sparkles periodically
      const sparkleInterval = setInterval(createSparkle, 300)

      return () => clearInterval(sparkleInterval)
    },
    { scope: sectionRef },
  )

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen pt-[30vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-background to-muted/20"
    >
      {/* Sparkles container */}
      <div ref={sparklesRef} className="absolute inset-0 pointer-events-none" />

      {/* Glow effect */}
      <div
        ref={glowRef}
        className="absolute w-96 h-96 rounded-full bg-primary/30 blur-[100px] pointer-events-none"
      />

      {/* Gift box container */}
      <div ref={giftBoxRef} className="relative z-10 flex flex-col items-center gap-8">
        {/* Gift box image */}
        <div className="relative w-80 h-80 md:w-[32rem] md:h-[32rem] flex items-center justify-center">
          <img
            src="/gift-box.png"
            alt="Pink Gift Box with White Bow"
            className="w-full h-full object-contain drop-shadow-2xl"
          />
        </div>

        {/* Optional text below the gift */}
        <div className="text-center space-y-2 px-6">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
            A Special Gift
          </h2>
          <p className="text-muted-foreground text-lg">
            Something precious awaits...
          </p>
        </div>
      </div>
    </section>
  )
}
