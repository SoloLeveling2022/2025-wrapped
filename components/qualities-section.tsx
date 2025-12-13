"use client"

import { useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"

gsap.registerPlugin(ScrollTrigger)

const qualities = [
  {
    title: "Natural Charm",
    description: "Your magnetic, effortless charm draws everyone in.",
  },
  {
    title: "Genuine Personality",
    description: "You are always yourself, honest and real, with nothing to hide.",
  },
  {
    title: "Smart and Observant",
    description: "You understand people and situations well because you notice things others don't.",
  },
  {
    title: "Naturally Beautiful",
    description: "Your captivating beauty radiates naturally from within.",
  },
  {
    title: "Emotionally Intuitive",
    description: "You sense unspoken emotions, reading between lines with deep intuition.",
  },
]

export function QualitiesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const titleChars = titleRef.current?.textContent?.split("") || []
      if (titleRef.current) {
        titleRef.current.innerHTML = titleChars
          .map((char, i) =>
            char === " "
              ? `<span style="display:inline-block;width:0.3em;"></span>`
              : `<span style="display:inline-block;" data-char="${i}">${char}</span>`,
          )
          .join("")
      }

      gsap.fromTo(
        titleRef.current?.querySelectorAll("span[data-char]") || [],
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
            end: "top 50%",
            scrub: 1,
            toggleActions: "play none none reverse",
          },
          stagger: 0.02,
        },
      )

      const cards = Array.from(gridRef.current?.children || [])
      cards.forEach((card, index) => {
        const angle = index * 72 * (Math.PI / 180)
        const distance = 300
        const fromX = Math.cos(angle) * distance
        const fromY = Math.sin(angle) * distance

        gsap.fromTo(
          card,
          {
            x: fromX,
            y: fromY,
            scale: 0,
            rotation: 360,
            opacity: 0,
          },
          {
            x: 0,
            y: 0,
            scale: 1,
            rotation: 0,
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
        cardElement.addEventListener("mouseenter", () => {
          gsap.to(cardElement, {
            y: -15,
            scale: 1.05,
            duration: 0.4,
            ease: "power2.out",
          })
        })

        cardElement.addEventListener("mouseleave", () => {
          gsap.to(cardElement, {
            y: 0,
            scale: 1,
            duration: 0.6,
            ease: "elastic.out(1, 0.5)",
          })
        })
      })
    },
    { scope: sectionRef },
  )

  return (
    <section id="qualities" ref={sectionRef} className="py-24 md:py-32 bg-accent/10">
      <div className="container mx-auto px-6">
        <h2 ref={titleRef} className="font-serif text-5xl md:text-6xl font-bold text-center mb-20 text-balance">
          Your Best Qualities
        </h2>

        <div ref={gridRef} className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6 max-w-7xl mx-auto">
          {qualities.map((quality, index) => {
            return (
              <div
                key={index}
                className="p-6 bg-card border border-border rounded-xl hover:border-accent hover:shadow-lg transition-all duration-300 text-center cursor-pointer"
              >
                <h3 className="font-serif text-xl font-semibold mb-3 text-foreground">{quality.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{quality.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
