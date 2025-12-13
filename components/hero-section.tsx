"use client"

import { useRef, useEffect } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const scrollIndicatorRef = useRef<HTMLDivElement>(null)
  const blob1Ref = useRef<HTMLDivElement>(null)
  const blob2Ref = useRef<HTMLDivElement>(null)
  const blob3Ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (titleRef.current) {
      const text = titleRef.current.textContent || ""
      titleRef.current.innerHTML = text
        .split("")
        .map((char, i) =>
          char === " "
            ? `<span style="display:inline-block;width:0.3em;"></span>`
            : `<span style="display:inline-block;" data-char="${i}">${char}</span>`,
        )
        .join("")
    }
  }, [])

  useGSAP(
    () => {
      const chars = titleRef.current?.querySelectorAll("span[data-char]")

      if (chars) {
        gsap.from(chars, {
          opacity: 0,
          y: 100,
          rotationX: -90,
          scale: 0.5,
          duration: 1.2,
          stagger: {
            each: 0.03,
            from: "center",
          },
          ease: "back.out(1.7)",
          delay: 0.3,
        })
      }

      gsap.from(subtitleRef.current, {
        clipPath: "inset(0% 100% 0% 0%)",
        duration: 1.5,
        ease: "power4.inOut",
        delay: 1.2,
      })

      // Scroll indicator animation
      gsap.from(scrollIndicatorRef.current, {
        opacity: 0,
        y: -20,
        duration: 1,
        delay: 2,
        ease: "power2.out",
      })

      gsap.to(scrollIndicatorRef.current, {
        y: 10,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      })

      gsap.to(blob1Ref.current, {
        x: "random(-100, 100)",
        y: "random(-100, 100)",
        scale: "random(0.8, 1.3)",
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      })

      gsap.to(blob2Ref.current, {
        x: "random(-150, 150)",
        y: "random(-150, 150)",
        scale: "random(0.9, 1.4)",
        duration: 12,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      })

      gsap.to(blob3Ref.current, {
        x: "random(-80, 80)",
        y: "random(-80, 80)",
        rotate: 360,
        duration: 20,
        repeat: -1,
        ease: "none",
      })
    },
    { scope: containerRef },
  )

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-secondary/30 via-background to-accent/20"
    >
      <div className="absolute inset-0 overflow-hidden">
        <div ref={blob1Ref} className="absolute top-20 left-10 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
        <div ref={blob2Ref} className="absolute bottom-20 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div ref={blob3Ref} className="absolute top-1/2 left-1/2 w-72 h-72 bg-secondary/20 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto px-6 text-center">
        <h1
          ref={titleRef}
          className="font-serif text-6xl md:text-8xl lg:text-9xl font-bold text-foreground mb-6 text-balance"
        >
          Ur: 2025 Wrapped
        </h1>
        <p ref={subtitleRef} className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto text-balance">
          Your growth, your lessons, and your lasting impact.
        </p>
      </div>

      {/* Scroll Indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 cursor-pointer group"
        onClick={() => {
          document.getElementById("essence")?.scrollIntoView({ behavior: "smooth" })
        }}
      >
        <span className="text-sm text-muted-foreground font-medium tracking-wider uppercase group-hover:text-foreground transition-colors">
          Scroll to Explore
        </span>
        <div className="w-6 h-10 border-2 border-muted-foreground/50 group-hover:border-foreground rounded-full flex items-start justify-center p-2 transition-colors">
          <div className="w-1.5 h-1.5 bg-muted-foreground/50 group-hover:bg-foreground rounded-full transition-colors" />
        </div>
      </div>
    </section>
  )
}
