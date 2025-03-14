"use client"

import type React from "react"

import { useRef, useEffect, useState } from "react"
import { motion, useInView, useAnimation, type Variant } from "framer-motion"

interface AnimatedSectionProps {
  children: React.ReactNode
  className?: string
  delay?: number
  duration?: number
  once?: boolean
  direction?: "up" | "down" | "left" | "right" | "none"
  distance?: number
  threshold?: number
}

export function AnimatedSection({
  children,
  className,
  delay = 0,
  duration = 0.5,
  once = true,
  direction = "up",
  distance = 50,
  threshold = 0.1,
}: AnimatedSectionProps) {
  const controls = useAnimation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once })
  const [hasAnimated, setHasAnimated] = useState(false)

  // Define variants based on direction
  const getDirectionalVariants = () => {
    const variants: Record<string, Variant> = {
      hidden: {},
      visible: {
        opacity: 1,
        y: 0,
        x: 0,
        transition: {
          duration,
          delay,
          ease: [0.25, 0.1, 0.25, 1.0],
        },
      },
    }

    // Set initial position based on direction
    if (direction === "up") {
      variants.hidden = { opacity: 0, y: distance }
    } else if (direction === "down") {
      variants.hidden = { opacity: 0, y: -distance }
    } else if (direction === "left") {
      variants.hidden = { opacity: 0, x: distance }
    } else if (direction === "right") {
      variants.hidden = { opacity: 0, x: -distance }
    } else if (direction === "none") {
      variants.hidden = { opacity: 0 }
    }

    return variants
  }

  useEffect(() => {
    if (isInView && !hasAnimated) {
      controls.start("visible")
      setHasAnimated(true)
    }
  }, [isInView, controls, hasAnimated])

  return (
    <motion.div ref={ref} initial="hidden" animate={controls} variants={getDirectionalVariants()} className={className}>
      {children}
    </motion.div>
  )
}

