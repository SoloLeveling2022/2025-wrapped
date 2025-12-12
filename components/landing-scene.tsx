"use client"

import { useRef } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { Heart } from "lucide-react"

interface LandingSceneProps {
  onEnter: () => void
}

export function LandingScene({ onEnter }: LandingSceneProps) {
  const sceneRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const heartsContainerRef = useRef<HTMLDivElement>(null)
  const confettiContainerRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)

  useGSAP(
    () => {
      gsap.to(buttonRef.current, {
        scale: 1.05,
        duration: 0.8,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      })

      gsap.to(titleRef.current, {
        y: -10,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      })
    },
    { scope: sceneRef },
  )

  const handleEnter = () => {
    const tl = gsap.timeline({
      onComplete: () => {
        onEnter()
      },
    })

    const heartsContainer = heartsContainerRef.current
    const confettiContainer = confettiContainerRef.current

    if (heartsContainer && confettiContainer) {
      // Create hearts
      for (let i = 0; i < 30; i++) {
        const heart = document.createElement("div")
        heart.innerHTML = "💖"
        heart.style.position = "absolute"
        heart.style.fontSize = `${Math.random() * 30 + 20}px`
        heart.style.left = `${Math.random() * 100}%`
        heart.style.top = "-50px"
        heartsContainer.appendChild(heart)

        gsap.to(heart, {
          y: window.innerHeight + 100,
          x: `random(-100, 100)`,
          rotation: `random(-360, 360)`,
          duration: `random(2, 4)`,
          delay: i * 0.05,
          ease: "none",
        })
      }

      // Create party confetti
      for (let i = 0; i < 50; i++) {
        const confetti = document.createElement("div")
        const colors = ["#ff6b9d", "#c44569", "#ffa07a", "#ff69b4", "#ff1493"]
        confetti.style.position = "absolute"
        confetti.style.width = `${Math.random() * 10 + 5}px`
        confetti.style.height = `${Math.random() * 10 + 5}px`
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)]
        confetti.style.left = `${Math.random() * 100}%`
        confetti.style.top = "-20px"
        confetti.style.borderRadius = "2px"
        confettiContainer.appendChild(confetti)

        gsap.to(confetti, {
          y: window.innerHeight + 100,
          x: `random(-200, 200)`,
          rotation: `random(-720, 720)`,
          duration: `random(2, 4)`,
          delay: i * 0.02,
          ease: "none",
        })
      }
    }

    tl.to(buttonRef.current, {
      scale: 20,
      opacity: 0,
      duration: 0.8,
      ease: "power2.in",
    }).to(
      sceneRef.current,
      {
        opacity: 0,
        duration: 1.2,
        ease: "power2.inOut",
      },
      "-=0.4",
    )
  }

  return (
    <div
      ref={sceneRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-background transition-colors duration-300"
    >
      <div ref={heartsContainerRef} className="absolute inset-0 pointer-events-none overflow-hidden" />
      <div ref={confettiContainerRef} className="absolute inset-0 pointer-events-none overflow-hidden" />

      <div className="text-center space-y-8 px-6">
        <h1 ref={titleRef} className="font-serif text-5xl md:text-7xl font-bold text-foreground text-balance">
          Something Special Awaits
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground max-w-md mx-auto">
          A journey through your 2025 moments
        </p>

        <button
          ref={buttonRef}
          onClick={handleEnter}
          className="group relative px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-full text-lg shadow-2xl hover:bg-primary/90 transition-all duration-300"
        >
          <span className="flex items-center gap-2">
            <Heart className="w-6 h-6" fill="currentColor" />
            Enter Experience
            <Heart className="w-6 h-6" fill="currentColor" />
          </span>
        </button>
      </div>
    </div>
  )
}
