"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { useMobile } from "@/hooks/use-mobile"
import { useDragControls } from "framer-motion"

const shorts = [
  { id: 1, title: "Magic mushroom", imageUrl: "/shorts/01.png", instagramUrl: "https://instagram.com/p/short1" },
  { id: 2, title: "Räudige Rast", imageUrl: "/shorts/02.png", instagramUrl: "https://instagram.com/p/short2" },
  { id: 3, title: "Mundraub", imageUrl: "/shorts/03.png", instagramUrl: "https://instagram.com/p/short3" },
  { id: 4, title: "Um einen See rum", imageUrl: "/shorts/04.png", instagramUrl: "https://instagram.com/p/short4" }
]

export default function ShortsCarousel() {
  return (
    <div className=" w-full">
      <motion.div
        className="flex gap-2 md:gap-4"
        drag="x"
        dragConstraints={{ left: -((shorts.length - 1) * 300), right: 0 }}
        dragElastic={0.1}
      >
        {shorts.map((short) => (
          <Link key={short.id} href={short.instagramUrl} target="_blank" rel="noopener noreferrer">
            <motion.div className="w-[200px] h-[340px] md:w-[260px] md:h-[460px] relative">
              
              <Image src={short.imageUrl} alt={short.title} layout="fill" className="object-cover rounded-lg" />
            </motion.div>
          </Link>
          
        ))}
      </motion.div>
    </div>
  )
}