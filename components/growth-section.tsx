"use client"

import { useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"

gsap.registerPlugin(ScrollTrigger)

const growthMilestones = [
  {
    title: "Solo Hackathon Win",
    description: "You stood on your own, trusted yourself, and proved your capability through confidence, clarity, and determination.",
  },
  {
    title: "Stepping Into Independence",
    description: "You applied for your PAN on your own, a small and meaningful milestone in your journey toward independence.",
  },

  {
    title: "Professional Growth",
    description: "You gained clarity in your career goals, built confidence in your skills, and learned to move forward with purpose and self-belief.",
  },
]

export function GrowthSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const quoteRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      gsap.fromTo(
        titleRef.current,
        { scale: 0.5, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
            end: "top 50%",
            scrub: 1,
            toggleActions: "play none none reverse",
          },
        },
      )

      gsap.fromTo(
        subtitleRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          scrollTrigger: {
            trigger: subtitleRef.current,
            start: "top 80%",
            end: "top 60%",
            scrub: 1,
            toggleActions: "play none none reverse",
          },
        },
      )

      const cards = cardsRef.current?.children ? Array.from(cardsRef.current.children) : []
      cards.forEach((card, index) => {
        const angle = index * 30
        const radius = 100

        gsap.fromTo(
          card,
          {
            x: Math.cos((angle * Math.PI) / 180) * radius,
            y: Math.sin((angle * Math.PI) / 180) * radius,
            rotation: angle,
            scale: 0,
            opacity: 0,
          },
          {
            x: 0,
            y: 0,
            rotation: 0,
            scale: 1,
            opacity: 1,
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              end: "top 50%",
              scrub: 1,
              toggleActions: "play none none reverse",
            },
          },
        )

        const cardElement = card as HTMLElement
        let pulseAnimation: gsap.core.Tween | null = null

        cardElement.addEventListener("mouseenter", () => {
          pulseAnimation = gsap.to(cardElement, {
            scale: 1.05,
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.15)",
            duration: 0.6,
            ease: "power2.inOut",
            yoyo: true,
            repeat: -1,
          })
        })

        cardElement.addEventListener("mouseleave", () => {
          if (pulseAnimation) pulseAnimation.kill()
          gsap.to(cardElement, {
            scale: 1,
            boxShadow: "0 0 0 rgba(0, 0, 0, 0)",
            duration: 0.4,
            ease: "power2.out",
          })
        })
      })

      gsap.fromTo(
        quoteRef.current,
        {
          scale: 0.9,
          opacity: 0,
          rotationX: -20,
        },
        {
          scale: 1,
          opacity: 1,
          rotationX: 0,
          scrollTrigger: {
            trigger: quoteRef.current,
            start: "top 80%",
            end: "top 50%",
            scrub: 1,
            toggleActions: "play none none reverse",
          },
          transformPerspective: 1000,
        },
      )

      gsap.to(quoteRef.current, {
        backgroundPosition: "200% center",
        duration: 3,
        ease: "linear",
        repeat: -1,
        delay: 1,
      })
    },
    { scope: sectionRef },
  )

  return (
    <section
      id="growth"
      ref={sectionRef}
      className="py-24 md:py-32 pb-[50vh] bg-gradient-to-br from-secondary/30 via-background to-accent/20"
    >
      <div className="container mx-auto px-6">
        <h2 ref={titleRef} className="font-serif text-5xl md:text-6xl font-bold text-center mb-6 text-balance">
          Your Growth in 2025
        </h2>
        <p ref={subtitleRef} className="text-center text-muted-foreground text-lg mb-16 max-w-3xl mx-auto text-balance">
          You didn't stay the same. You evolved, learned, and became clearer about who you are and what you need.
        </p>

        <div ref={cardsRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20">
          {growthMilestones.map((milestone, index) => (
            <div
              key={index}
              className="p-8 bg-card border border-border rounded-xl hover:shadow-lg transition-all duration-300 cursor-pointer"
            >
              <h3 className="font-serif text-2xl font-semibold mb-4 text-foreground">{milestone.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{milestone.description}</p>
            </div>
          ))}
        </div>

        <div
          ref={quoteRef}
          className="max-w-4xl mx-auto text-center p-12 bg-gradient-to-br from-accent/20 to-primary/20 rounded-2xl border border-accent/30"
          style={{
            backgroundImage: "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)",
            backgroundSize: "200% 100%",
          }}
        >
          <blockquote className="font-serif text-3xl md:text-4xl font-light text-foreground mb-6 text-balance leading-relaxed">
            "Whatever happens next, you remain one of the most impactful people of my 2025."
          </blockquote>
          <p className="text-muted-foreground text-lg">
            Your intense gift of time, energy, and belief won't be forgotten.
          </p>
        </div>
      </div>
    </section>
  )
}
