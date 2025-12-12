"use client"

import { useState } from "react"
import { HeroSection } from "@/components/hero-section"
import { EssenceSection } from "@/components/essence-section"
import { StrengthsSection } from "@/components/strengths-section"
import { ImpactSection } from "@/components/impact-section"
import { QualitiesSection } from "@/components/qualities-section"
import { ChallengesSection } from "@/components/challenges-section"
import { GrowthSection } from "@/components/growth-section"
import { LandingScene } from "@/components/landing-scene"
import { GiftBoxSection } from "@/components/gift-box-section"

export default function Home() {
  const [showLanding, setShowLanding] = useState(true)

  if (showLanding) {
    return <LandingScene onEnter={() => setShowLanding(false)} />
  }

  return (
    <main className="relative">
      <HeroSection />
      <EssenceSection />
      <StrengthsSection />
      <ImpactSection />
      <QualitiesSection />
      <ChallengesSection />
      <GrowthSection />
      <GiftBoxSection />
    </main>
  )
}
