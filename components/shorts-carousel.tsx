"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Play } from "lucide-react"
import { motion } from "framer-motion"
import { useMobile } from "@/hooks/use-mobile"


interface Short {
  id: number
  number: string
  title: string
  imageUrl: string
  instagramUrl: string
}

const shorts: Short[] = [
  {
    id: 1,
    number: "#1",
    title: "Magic mushroom",
    imageUrl: "/shorts/01.png",
    instagramUrl: "https://instagram.com/p/short1",
  },
  {
    id: 2,
    number: "#5",
    title: "Räudige Rast",
    imageUrl: "/shorts/02.png",
    instagramUrl: "https://instagram.com/p/short2",
  },
  {
    id: 3,
    number: "#4",
    title: "Mundraub",
    imageUrl: "/shorts/03.png",
    instagramUrl: "https://instagram.com/p/short3",
  },
  {
    id: 4,
    number: "#7",
    title: "Um einen See rum",
    imageUrl: "/shorts/04.png",
    instagramUrl: "https://instagram.com/p/short4",
  },
  {
    id: 5,
    number: "#7",
    title: "Um einen See rum",
    imageUrl: "/placeholder.svg?height=400&width=300",
    instagramUrl: "https://instagram.com/p/short5",
  },
  {
    id: 6,
    number: "#7",
    title: "Um einen See rum",
    imageUrl: "/placeholder.svg?height=400&width=300",
    instagramUrl: "https://instagram.com/p/short5",
  },
  {
    id: 7,
    number: "#7",
    title: "Um einen See rum",
    imageUrl: "/placeholder.svg?height=400&width=300",
    instagramUrl: "https://instagram.com/p/short5",
  },
]

export default function ShortsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)
  const maxVisibleItems = 4

  const nextSlide = () => {
    if (currentIndex < shorts.length - maxVisibleItems) {
      setCurrentIndex(currentIndex + 1)
    } else {
      setCurrentIndex(0) // Loop back to start
    }
  }

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    } else {
      setCurrentIndex(shorts.length - maxVisibleItems) // Loop to end
    }
  }

  useEffect(() => {
    const nextButton = document.getElementById("next-button")
    const prevButton = document.getElementById("prev-button")

    if (nextButton && prevButton) {
      nextButton.addEventListener("click", nextSlide)
      prevButton.addEventListener("click", prevSlide)

      return () => {
        nextButton.removeEventListener("click", nextSlide)
        prevButton.removeEventListener("click", prevSlide)
      }
    }
  }, [currentIndex])

  // Handle touch events for swiping
  useEffect(() => {
    const carousel = carouselRef.current
    if (!carousel) return

    let startX: number
    let isDragging = false

    const handleTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX
      isDragging = true
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging) return
      const currentX = e.touches[0].clientX
      const diff = startX - currentX

      if (diff > 50) {
        nextSlide()
        isDragging = false
      } else if (diff < -50) {
        prevSlide()
        isDragging = false
      }
    }

    const handleTouchEnd = () => {
      isDragging = false
    }

    carousel.addEventListener("touchstart", handleTouchStart)
    carousel.addEventListener("touchmove", handleTouchMove)
    carousel.addEventListener("touchend", handleTouchEnd)

    return () => {
      carousel.removeEventListener("touchstart", handleTouchStart)
      carousel.removeEventListener("touchmove", handleTouchMove)
      carousel.removeEventListener("touchend", handleTouchEnd)
    }
  }, [currentIndex])

  return (
    <div ref={carouselRef} className=" h-[640px]">
      <div
        className="flex transition-transform duration-300 ease-in-out gap-4 "
        style={{ transform: `translateX(-${currentIndex * (100 / maxVisibleItems)}%)` }}
      >
        {shorts.map((short) => (
          <Link
            key={short.id}
            href={short.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 relative group h-[640px]"
          >
            <div className="bg-[#ff0066] border-4 border-[#ff0066] rounded-2xl overflow-hidden relative aspect-[9/16]">
              <Image
                src={short.imageUrl || "/placeholder.svg"}
                alt={short.title}
                width={300}
                height={400}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute top-2 left-2 bg-[#ff0066] text-white font-bold rounded-full p-2 text-lg">
                {short.number}
              </div>
              <div className="absolute bottom-0 left-0 p-4 text-white">
                <h3 className="text-2xl font-bold">{short.title}</h3>
              </div>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="bg-white/20 rounded-full p-3">
                  <Play size={30} className="text-white fill-white" />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

