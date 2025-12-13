"use client"

import { useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"

gsap.registerPlugin(ScrollTrigger)

const essenceTraits = [
  {
    title: "Strong Yet Fragile",
    description: "You carry immense strength, even in vulnerability, never letting it break your spirit.",
  },
  {
    title: "Caring in Quiet Ways",
    description: "Your care is subtle, always present, hidden beneath layers of protection.",
  },
  {
    title: "A Deep Thinker",
    description: "You avoid small talk. You think deeply and look past what is obvious.",
  },
  {
    title: "Genuinely Real",
    description: "No pretending. You are real, honest, and perfectly yourself.",
  },
]

export function EssenceSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      gsap.to(titleRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "top -50%",
          scrub: 1,
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        scale: 0.8,
        y: -100,
      })

      gsap.fromTo(
        subtitleRef.current,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          scrollTrigger: {
            trigger: subtitleRef.current,
            start: "top 85%",
            end: "top 50%",
            scrub: 1,
            toggleActions: "play none none reverse",
          },
        },
      )

      const cards = Array.from(cardsRef.current?.children || [])
      cards.forEach((card, index) => {
        gsap.fromTo(
          card,
          {
            rotationY: index % 2 === 0 ? -45 : 45,
            rotationX: 45,
            scale: 0.7,
            opacity: 0,
          },
          {
            rotationY: 0,
            rotationX: 0,
            scale: 1,
            opacity: 1,
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              end: "top 50%",
              scrub: 1,
              toggleActions: "play none none reverse",
            },
            transformPerspective: 1000,
          },
        )

        const cardElement = card as HTMLElement
        cardElement.addEventListener("mousemove", (e) => {
          const rect = cardElement.getBoundingClientRect()
          const x = e.clientX - rect.left - rect.width / 2
          const y = e.clientY - rect.top - rect.height / 2

          gsap.to(cardElement, {
            x: x * 0.15,
            y: y * 0.15,
            rotationY: x * 0.05,
            rotationX: -y * 0.05,
            duration: 0.5,
            ease: "power2.out",
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
    <section id="essence" ref={sectionRef} className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-6">
        <h2 ref={titleRef} className="font-serif text-5xl md:text-6xl font-bold text-center mb-6 text-balance">
          The Essence of You
        </h2>
        <p ref={subtitleRef} className="text-center text-muted-foreground text-lg mb-16 max-w-2xl mx-auto">
          You showed up authentic, layered, and deeply human.
        </p>

        <div ref={cardsRef} className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto" style={{ perspective: "1000px" }}>
          {essenceTraits.map((trait, index) => (
            <div
              key={index}
              className="p-8 bg-card border border-border rounded-xl hover:shadow-2xl transition-shadow duration-300 cursor-pointer"
              style={{ transformStyle: "preserve-3d" }}
            >
              <h3 className="font-serif text-2xl font-semibold mb-4 text-foreground">{trait.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{trait.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
