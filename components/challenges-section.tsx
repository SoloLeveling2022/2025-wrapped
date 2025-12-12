"use client"

import { useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"

gsap.registerPlugin(ScrollTrigger)

const challenges = [
  {
    title: "Emotional Triggers",
    description: "Past wounds often resurface, making present moments unexpectedly painful for you.",
  },
  {
    title: "Feeling Unprotected",
    description: "Your needs for safety and support often go unmet, leaving you exposed.",
  },
  {
    title: "Unmet Expectations",
    description: "Reality often falls short of your hopes, leading to deep disappointment.",
  },
  {
    title: "Carrying Past Hurts",
    description: "Old wounds often shadow your new situations, making it hard to live in the present.",
  },
]

export function ChallengesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      gsap.fromTo(
        titleRef.current,
        {
          opacity: 0,
          filter: "blur(20px)",
          y: 50,
        },
        {
          opacity: 1,
          filter: "blur(0px)",
          y: 0,
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 85%",
            end: "top 50%",
            scrub: 1,
            toggleActions: "play none none reverse",
          },
        },
      )

      gsap.fromTo(
        subtitleRef.current,
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          scrollTrigger: {
            trigger: subtitleRef.current,
            start: "top 85%",
            end: "top 60%",
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
            opacity: 0,
            filter: "blur(30px)",
            scale: 0.9,
            y: 80,
          },
          {
            opacity: 1,
            filter: "blur(0px)",
            scale: 1,
            y: 0,
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
              end: "top 50%",
              scrub: 1,
              toggleActions: "play none none reverse",
            },
          },
        )

        const cardElement = card as HTMLElement
        cardElement.addEventListener("mouseenter", () => {
          gsap.to(cardElement, {
            scale: 1.02,
            y: -5,
            boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
            duration: 0.4,
            ease: "power2.out",
          })
        })

        cardElement.addEventListener("mouseleave", () => {
          gsap.to(cardElement, {
            scale: 1,
            y: 0,
            boxShadow: "0 0 0 rgba(0, 0, 0, 0)",
            duration: 0.5,
            ease: "power2.out",
          })
        })
      })
    },
    { scope: sectionRef },
  )

  return (
    <section id="challenges" ref={sectionRef} className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-6">
        <h2 ref={titleRef} className="font-serif text-5xl md:text-6xl font-bold text-center mb-6 text-balance">
          Your Challenges
        </h2>
        <p ref={subtitleRef} className="text-center text-muted-foreground text-lg mb-16 max-w-2xl mx-auto">
          Understanding your struggles with respect, compassion, and no judgment.
        </p>

        <div ref={cardsRef} className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {challenges.map((challenge, index) => (
            <div
              key={index}
              className="p-6 bg-card/50 border border-border/50 rounded-xl backdrop-blur-sm cursor-pointer transition-all"
            >
              <h3 className="font-serif text-xl font-semibold mb-3 text-foreground">{challenge.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{challenge.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
