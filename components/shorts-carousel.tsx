import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { useDragControls } from "framer-motion"

const shorts = [
  { id: 1, title: "Magic mushroom", imageUrl: "/shorts/01.png", instagramUrl: "https://instagram.com/p/short1" },
  { id: 2, title: "Räudige Rast", imageUrl: "/shorts/02.png", instagramUrl: "https://instagram.com/p/short2" },
  { id: 3, title: "Mundraub", imageUrl: "/shorts/03.png", instagramUrl: "https://instagram.com/p/short3" },
  { id: 4, title: "Um einen See rum", imageUrl: "/shorts/04.png", instagramUrl: "https://instagram.com/p/short4" }
]

export default function ShortsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const maxVisibleItems = 1

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev < shorts.length - 1 ? prev + 1 : 0))
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : shorts.length - 1))
  }

  return (
    <div className="w-full relative">
      <button onClick={prevSlide} className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg z-10">&#8592;</button>
      <motion.div
        className="flex gap-2 md:gap-4 overflow-hidden"
        drag="x"
        dragConstraints={{ left: -((shorts.length - 1) * 300), right: 0 }}
        dragElastic={0.1}
        animate={{ x: -currentIndex * 300 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {shorts.map((short) => (
          <Link key={short.id} href={short.instagramUrl} target="_blank" rel="noopener noreferrer">
            <motion.div className="w-[200px] h-[340px] md:w-[260px] md:h-[460px] relative">
              <Image src={short.imageUrl} alt={short.title} layout="fill" className="object-cover rounded-lg" />
            </motion.div>
          </Link>
        ))}
      </motion.div>
      <button onClick={nextSlide} className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg z-10">&#8594;</button>
    </div>
  )
}