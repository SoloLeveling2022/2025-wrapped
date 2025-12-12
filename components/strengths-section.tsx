"use client"

import { useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"

gsap.registerPlugin(ScrollTrigger)

const strengths = [
  {
    number: "01",
    title: "You Believed in Me",
    description: "You saw my potential, a quiet anchor when I doubted myself.",
  },
  {
    number: "02",
    title: "You Trusted Deeply",
    description: "Despite past wounds, you bravely chose trust and vulnerability.",
  },
  {
    number: "03",
    title: "You Stayed Loyal",
    description: "Through all difficulties, your steady loyalty was a rare gift.",
  },
  {
    number: "04",
    title: "You Showed Maturity",
    description: "You chose grace and growth, not reaction, in tough moments.",
  },
  {
    number: "05",
    title: "You Spoke Your Truth",
    description: "You bravely expressed your intense feelings honestly.",
  },
]

export function StrengthsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      gsap.to(sectionRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=1000",
          pin: true,
          scrub: 1,
        },
      })

      gsap.to(titleRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=500",
          scrub: 1,
          toggleActions: "play none none reverse",
        },
        scale: 0.8,
        y: -50,
        opacity: 0.3,
      })

      const items = Array.from(listRef.current?.children || [])
      items.forEach((item, index) => {
        gsap.fromTo(
          item,
          {
            x: index % 2 === 0 ? -200 : 200,
            opacity: 0,
            rotation: index % 2 === 0 ? -15 : 15,
          },
          {
            x: 0,
            opacity: 1,
            rotation: 0,
            scrollTrigger: {
              trigger: item,
              start: "top 80%",
              end: "top 50%",
              scrub: 1,
              toggleActions: "play none none reverse",
            },
          },
        )

        const itemElement = item as HTMLElement
        const number = itemElement.querySelector("[data-number]") as HTMLElement

        itemElement.addEventListener("mousemove", (e) => {
          const rect = itemElement.getBoundingClientRect()
          const x = e.clientX - rect.left - rect.width / 2
          const y = e.clientY - rect.top - rect.height / 2

          gsap.to(itemElement, {
            x: x * 0.1,
            y: y * 0.1,
            duration: 0.3,
            ease: "power2.out",
          })

          if (number) {
            gsap.to(number, {
              x: x * 0.3,
              y: y * 0.3,
              rotation: x * 0.05,
              duration: 0.3,
              ease: "power2.out",
            })
          }
        })

        itemElement.addEventListener("mouseleave", () => {
          gsap.to([itemElement, number], {
            x: 0,
            y: 0,
            rotation: 0,
            duration: 0.6,
            ease: "elastic.out(1, 0.5)",
          })
        })
      })
    },
    { scope: sectionRef },
  )

  return (
    <section id="strengths" ref={sectionRef} className="py-24 md:py-32 bg-secondary/20 min-h-screen flex items-center">
      <div className="container mx-auto px-6 w-full">
        <h2 ref={titleRef} className="font-serif text-5xl md:text-6xl font-bold text-center mb-20 text-balance">
          Your Top Strengths This Year
        </h2>

        <div ref={listRef} className="max-w-4xl mx-auto space-y-6">
          {strengths.map((strength) => (
            <div
              key={strength.number}
              className="flex gap-6 p-6 bg-card border border-border rounded-xl hover:border-accent hover:shadow-2xl transition-all duration-300 cursor-pointer"
            >
              <div data-number className="font-serif text-5xl font-bold text-accent flex-shrink-0">
                {strength.number}
              </div>
              <div>
                <h3 className="font-serif text-2xl font-semibold mb-2 text-foreground">{strength.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{strength.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
