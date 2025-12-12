"use client"

import { useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"

gsap.registerPlugin(ScrollTrigger)

const impacts = [
  {
    title: "You Taught Me Responsibility",
    description: "Your expectations taught me responsibility, showing me how to fully commit.",
  },
  {
    title: "You Pushed Me to Grow",
    description: "You challenged my comfort zones, pushing me to improve, even if difficult.",
  },
  {
    title: "You Showed My Blind Spots",
    description: "Your honesty revealed my blind spots – a painful yet crucial insight.",
  },
]

export function ImpactSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const bgCircleRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      gsap.to(titleRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
          toggleActions: "play none none reverse",
        },
        y: -100,
      })

      gsap.to(bgCircleRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
          toggleActions: "play none none reverse",
        },
        rotation: 180,
        scale: 1.5,
      })

      gsap.fromTo(
        subtitleRef.current,
        {
          clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
        },
        {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          scrollTrigger: {
            trigger: subtitleRef.current,
            start: "top 85%",
            end: "top 60%",
            scrub: 1,
            toggleActions: "play none none reverse",
          },
          ease: "power3.inOut",
        },
      )

      const cards = Array.from(cardsRef.current?.children || [])
      cards.forEach((card, index) => {
        gsap.fromTo(
          card,
          {
            y: 100,
            opacity: 0,
            rotateZ: -15,
            scale: 0.8,
          },
          {
            y: 0,
            opacity: 1,
            rotateZ: 0,
            scale: 1,
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              end: "top 50%",
              scrub: 1,
              toggleActions: "play none none reverse",
            },
            ease: "back.out(1.7)",
          },
        )

        const cardElement = card as HTMLElement
        cardElement.addEventListener("mousemove", (e) => {
          const rect = cardElement.getBoundingClientRect()
          const x = ((e.clientX - rect.left) / rect.width - 0.5) * 30
          const y = ((e.clientY - rect.top) / rect.height - 0.5) * 30

          gsap.to(cardElement, {
            x: x * 0.5,
            y: y * 0.5,
            rotationY: x * 0.5,
            rotationX: -y * 0.5,
            duration: 0.5,
            ease: "power2.out",
            transformPerspective: 1000,
          })
        })

        cardElement.addEventListener("mouseleave", () => {
          gsap.to(cardElement, {
            x: 0,
            y: 0,
            rotationY: 0,
            rotationX: 0,
            duration: 0.8,
            ease: "elastic.out(1, 0.5)",
          })
        })
      })
    },
    { scope: sectionRef },
  )

  return (
    <section id="impact" ref={sectionRef} className="py-24 md:py-32 bg-background relative overflow-hidden">
      <div className="absolute inset-0">
        <div
          ref={bgCircleRef}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <h2 ref={titleRef} className="font-serif text-5xl md:text-6xl font-bold text-center mb-6 text-balance">
          Your Impact on Me
        </h2>
        <p ref={subtitleRef} className="text-center text-muted-foreground text-lg mb-16 max-w-2xl mx-auto">
          How you shaped my year and fostered my growth.
        </p>

        <div ref={cardsRef} className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto" style={{ perspective: "1000px" }}>
          {impacts.map((impact, index) => (
            <div
              key={index}
              className="p-8 bg-gradient-to-br from-card to-secondary/30 border border-border rounded-2xl hover:shadow-xl transition-shadow duration-300 cursor-pointer"
              style={{ transformStyle: "preserve-3d" }}
            >
              <h3 className="font-serif text-2xl font-semibold mb-4 text-foreground">{impact.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{impact.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
